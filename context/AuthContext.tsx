"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getClientAuth, getClientDb } from "@/firebase/config";

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  loading: boolean;
  roleLoading: boolean;
  signup: (
    email: string,
    password: string,
    name: string,
    role: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      setRoleLoading(false);
    }, 8000);

    const auth = getClientAuth();
    const db = getClientDb();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setRoleLoading(true);
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          setUserRole(docSnap.exists() ? (docSnap.data().role as string) : null);
        } catch (error) {
          console.error("Failed to load user role:", error);
        } finally {
          setRoleLoading(false);
        }
      } else {
        setUserRole(null);
        setRoleLoading(false);
      }
      setLoading(false);
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: string
  ) => {
    const auth = getClientAuth();
    const db = getClientDb();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const currentUser = auth.currentUser ?? userCredential.user;

    if (!currentUser) {
      throw new Error("Failed to authenticate new user during signup.");
    }

    await currentUser.getIdToken(true);

    await setDoc(doc(db, "users", currentUser.uid), {
      uid: currentUser.uid,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    });
    setUserRole(role);
  };

  const login = async (email: string, password: string) => {
    const auth = getClientAuth();
    const db = getClientDb();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const docRef = doc(db, "users", userCredential.user.uid);
    const docSnap = await getDoc(docRef);
    const role = docSnap.exists() ? (docSnap.data().role as string) : null;
    if (role) {
      setUserRole(role);
    }
    return role;
  };

  const logout = async () => {
    await signOut(getClientAuth());
  };

  return (
    <AuthContext.Provider
      value={{ user, userRole, loading, roleLoading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
