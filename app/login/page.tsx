'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, userRole } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
      setIsSubmitting(false);
    }
  };

  // 2. Watch for the userRole to be populated from Firestore, then redirect accordingly
  React.useEffect(() => {
    if (userRole) {
      if (userRole === 'business') router.push('/business');
      else if (userRole === 'admin') router.push('/admin');
      else router.push('/customer');
    }
  }, [userRole, router]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 px-4 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-[-10%] top-[-10%] w-[60vw] h-[60vw] opacity-30 blur-2xl">
          <circle cx="300" cy="300" r="300" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(300 300) scale(300)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a5b4fc" />
              <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        <svg width="100%" height="100%" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-[-10%] bottom-[-10%] w-[60vw] h-[60vw] opacity-20 blur-2xl">
          <circle cx="300" cy="300" r="300" fill="url(#paint1_radial)" />
          <defs>
            <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientTransform="translate(300 300) scale(300)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f472b6" />
              <stop offset="1" stopColor="#a21caf" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <Card className="w-full max-w-md z-10 shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-400 to-blue-500 shadow-lg">
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="16" fill="#6366f1"/><path d="M10 16h12M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
          </div>
          <CardTitle className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Sign in</CardTitle>
          <CardDescription className="text-center text-slate-600 dark:text-slate-300">
            Welcome back! Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6">
            {/* Display Authentication Errors */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                autoComplete="email"
                className="bg-white/80 dark:bg-slate-800/80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                autoComplete="current-password"
                className="bg-white/80 dark:bg-slate-800/80"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:from-blue-700 hover:to-indigo-700" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
            <div className="text-sm text-center text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-blue-600 hover:underline dark:text-blue-400 font-semibold">Sign up</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}