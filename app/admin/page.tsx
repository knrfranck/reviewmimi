"use client";

import React from "react";
import * as RoleGuardModule from "@/components/dashboard/role-guard";
import * as ShellModule from "@/components/dashboard/dashboard-shell";
import * as StatModule from "@/components/dashboard/stat-card";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Intercept all combinations of default or named exports
const RoleGuard = 
  (RoleGuardModule as any).RoleGuard || 
  (RoleGuardModule as any).StrictAdminGuard || 
  (RoleGuardModule as any).default;

const DashboardShell = 
  (ShellModule as any).DashboardShell || 
  (ShellModule as any).default;

const StatCard = 
  (StatModule as any).StatCard || 
  (StatModule as any).default;

export default function AdminDashboardPage() {
  // If anything is missing, render an on-screen debugger map
  if (!RoleGuard || !DashboardShell || !StatCard) {
    return (
      <div className="p-6 bg-amber-50 text-amber-900 rounded-md m-4 border border-amber-200 font-mono text-sm">
        <h1 className="font-bold mb-2">🔧 Build Diagnostics Link</h1>
        <p>The system rendered safely, but identified missing exports:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>RoleGuard Component: {RoleGuard ? "✅ Ready" : "❌ Undefined"}</li>
          <li>DashboardShell Component: {DashboardShell ? "✅ Ready" : "❌ Undefined"}</li>
          <li>StatCard Component: {StatCard ? "✅ Ready" : "❌ Undefined"}</li>
        </ul>
        <p className="mt-3 text-xs text-amber-700 font-sans">
          Check the export statements inside the files flagged with ❌.
        </p>
      </div>
    );
  }

  return (
    <RoleGuard allowedRole="admin">
      <DashboardShell
        title="Admin Dashboard"
        description="Platform overview, user management, and system health."
        badge="Administrator"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total users"
            value="1,248"
            description="Registered accounts on the platform"
          />
          <StatCard
            title="Businesses"
            value="312"
            description="Active business profiles"
          />
          <StatCard
            title="Open reports"
            value="7"
            description="Flagged content awaiting review"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User management</CardTitle>
              <CardDescription>
                Recent signups and role assignments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600">
              <p>New business owner — signed up today</p>
              <p>Customer account flagged — requires moderation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System actions</CardTitle>
              <CardDescription>Administrative tools and settings</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm text-slate-600">
              <p>Manage all users</p>
              <p>View audit logs</p>
              <p>Platform settings</p>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </RoleGuard>
  );
}