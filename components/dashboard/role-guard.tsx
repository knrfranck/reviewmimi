"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type RoleGuardProps = {
  children: React.ReactNode;
  allowedRole?: string;     // Support singular from page.tsx
  allowedRoles?: string[];  // Support plural array just in case
};

export default function RoleGuard({ children, allowedRole, allowedRoles }: RoleGuardProps) {
  const router = useRouter();
  const { user, userRole, loading, roleLoading } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  // Normalize allowed roles into a single array
  const targetRoles = allowedRoles 
    ? allowedRoles 
    : allowedRole 
      ? [allowedRole] 
      : ["admin"];

  useEffect(() => {
    if (loading || roleLoading) {
      return;
    }

    if (!user) {
      router.push("/login");
      setHasAccess(false);
      return;
    }

    if (!userRole || !targetRoles.includes(userRole)) {
      router.push("/unauthorized");
      setHasAccess(false);
      return;
    }

    setHasAccess(true);
  }, [router, targetRoles, user, userRole, loading, roleLoading]);

  if (loading || roleLoading || hasAccess === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-sm font-medium text-slate-500 animate-pulse">
          Verifying security clearance...
        </div>
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  return null;
}

export { RoleGuard };
export { RoleGuard as StrictAdminGuard };