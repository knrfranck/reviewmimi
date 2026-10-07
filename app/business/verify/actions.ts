"use server"

import * as admin from "firebase-admin"

// Initialize Firebase Admin SDK if it hasn't been initialized already
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "reviewmimi-19216",
    storageBucket: "reviewmimi-19216.firebasestorage.app",
  })
}

const bucket = admin.storage().bucket()

export async function uploadVerificationDocuments(formData: FormData) {
  try {
    const idFile = formData.get("idDocument") as File
    const workFile = formData.get("workProof") as File
    const permitFile = formData.get("businessPermit") as File
    const userId = formData.get("userId") as string | null

    if (!idFile || !workFile || !permitFile) {
      return { success: false, error: "Missing required files." }
    }

    if (!userId) {
      return { success: false, error: "Missing authenticated user ID." }
    }

    // Helper function to convert browser File to Buffer and upload to Firebase
    const uploadToFirebase = async (file: File, folder: string) => {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Create a unique filename to prevent overwriting
      const uniqueFilename = `${folder}/${Date.now()}-${file.name}`
      const remoteFile = bucket.file(uniqueFilename)

      // Save the buffer directly to Firebase Storage
      await remoteFile.save(buffer, {
        metadata: { contentType: file.type },
        public: false, // Keep it private so only admins can view verification docs
      })

      return uniqueFilename
    }

    // Upload all 3 files concurrently
    const [idPath, workPath, permitPath] = await Promise.all([
      uploadToFirebase(idFile, "verifications/ids"),
      uploadToFirebase(workFile, "verifications/work_proofs"),
      uploadToFirebase(permitFile, "verifications/permits")
    ])

    console.log("Successfully uploaded files to Firebase:", { idPath, workPath, permitPath })

    const firestore = admin.firestore()
    const userDocRef = firestore.doc(`users/${userId}`)

    await userDocRef.set(
      {
        verification: {
          status: "pending",
          uploadedAt: new Date().toISOString(),
          documents: {
            idPath,
            workPath,
            permitPath,
          },
        },
      },
      { merge: true }
    )

    return { success: true }
  } catch (error) {
    console.error("Firebase Storage Upload Error:", error)
    return { success: false, error: "Failed to upload documents to storage." }
  }
}