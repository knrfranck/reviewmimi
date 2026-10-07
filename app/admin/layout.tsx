import React from "react";
// Import modules entirely to intercept both export types
import * as AuthModule from "@/components/auth-layout";
import * as GuardModule from "@/components/dashboard/role-guard";

// Safely resolve AuthLayout
const AuthLayout = 
  (AuthModule as any).AuthLayout || 
  (AuthModule as any).default;

// Safely resolve StrictAdminGuard or fallback to any role guard exported
const StrictAdminGuard = 
  (GuardModule as any).StrictAdminGuard || 
  (GuardModule as any).RoleGuard || 
  (GuardModule as any).default;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Safe validation check
  if (!AuthLayout || !StrictAdminGuard) {
    return (
      <div className="p-4 m-4 bg-red-50 text-red-800 border border-red-200 font-mono text-xs rounded">
        <strong>AdminLayout Setup Error:</strong><br />
        AuthLayout: {AuthLayout ? "✅ Found" : "❌ Undefined"}<br />
        StrictAdminGuard: {StrictAdminGuard ? "✅ Found" : "❌ Undefined"}
      </div>
    );
  }

  return (
    <AuthLayout>
      <StrictAdminGuard>{children}</StrictAdminGuard>
    </AuthLayout>
  );
}