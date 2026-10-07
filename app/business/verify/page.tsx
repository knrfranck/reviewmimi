"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
// Import the server action
import { uploadVerificationDocuments } from "./actions"

export default function VerifyPage() {
  const router = useRouter()
  const { user, loading, roleLoading } = useAuth()
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const [idFile, setIdFile] = useState<File | null>(null)
  const [workFile, setWorkFile] = useState<File | null>(null)
  const [permitFile, setPermitFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const progressValue = (step / totalSteps) * 100

  useEffect(() => {
    if (!loading && !roleLoading && !user) {
      router.push("/login")
    }
  }, [loading, roleLoading, user, router])

  const handleSubmit = async () => {
    if (!idFile || !workFile || !permitFile) {
      alert("Please upload all required documents before submitting.")
      return
    }

    if (!user) {
      alert("You must be logged in to submit verification documents.")
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("idDocument", idFile)
    formData.append("workProof", workFile)
    formData.append("businessPermit", permitFile)
    formData.append("userId", user.uid)

    // Call the Server Action directly
    const result = await uploadVerificationDocuments(formData)

    setIsSubmitting(false)

    if (result.success) {
      router.push("/business")
      return
    }

    alert(`Submission failed: ${result.error}`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Business Verification</CardTitle>
          <CardDescription>Step {step} of {totalSteps}</CardDescription>
          <Progress value={progressValue} className="w-full mt-2" />
        </CardHeader>
        
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Upload National ID / Passport</h3>
              <p className="text-sm text-slate-500">Please provide a clear scan or photo of your official identification document.</p>
              <div className="grid w-full items-center gap-1.5 pt-2">
                <Label htmlFor="id-upload">Identification File</Label>
                <Input 
                  id="id-upload" 
                  type="file" 
                  accept="image/*,application/pdf" 
                  onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                />
                {idFile && <p className="text-xs text-green-600">Selected: {idFile.name}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Upload Proof of Work</h3>
              <p className="text-sm text-slate-500">Provide past invoices, contracts, or portfolio proof that showcases your business activity.</p>
              <div className="grid w-full items-center gap-1.5 pt-2">
                <Label htmlFor="work-upload">Proof of Work File</Label>
                <Input 
                  id="work-upload" 
                  type="file" 
                  accept="image/*,application/pdf" 
                  onChange={(e) => setWorkFile(e.target.files?.[0] || null)}
                />
                {workFile && <p className="text-xs text-green-600">Selected: {workFile.name}</p>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Upload Business Permit</h3>
              <p className="text-sm text-slate-500">Submit your valid local county business permit or registration license.</p>
              <div className="grid w-full items-center gap-1.5 pt-2">
                <Label htmlFor="permit-upload">Business Permit File</Label>
                <Input 
                  id="permit-upload" 
                  type="file" 
                  accept="image/*,application/pdf" 
                  onChange={(e) => setPermitFile(e.target.files?.[0] || null)}
                />
                {permitFile && <p className="text-xs text-green-600">Selected: {permitFile.name}</p>}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={step === 1 || isSubmitting}
          >
            Previous
          </Button>
          
          {step < totalSteps ? (
            <Button 
              onClick={nextStep}
              disabled={
                (step === 1 && !idFile) || 
                (step === 2 && !workFile)
              }
            >
              Next Step
            </Button>
          ) : (
            <Button 
              className="bg-green-600 hover:bg-green-700" 
              onClick={handleSubmit}
              disabled={!permitFile || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Verification"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}