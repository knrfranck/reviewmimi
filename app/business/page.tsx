"use client";

import React from "react";
import RoleGuardComponent from "@/components/dashboard/role-guard";
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

// Safely resolve components whether they are exported as default or named
const RoleGuard = RoleGuardComponent || (RoleGuardModule as any).RoleGuard || (RoleGuardModule as any).StrictAdminGuard;
const DashboardShell = (ShellModule as any).DashboardShell || (ShellModule as any).default;
const StatCard = (StatModule as any).StatCard || (StatModule as any).default;

export default function BusinessDashboardPage() {
  // Diagnostic fallback check to guarantee no unhandled white-screen runtime loops
  if (!RoleGuard || !DashboardShell || !StatCard) {
    return (
      <div className="p-6 bg-amber-50 text-amber-900 rounded-md m-4 border border-amber-200 font-mono text-sm">
        <h1 className="font-bold mb-2">🔧 Import Mismatch Detected</h1>
        <p>The system rendered safely, but identified missing exports:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>RoleGuard Component: {!!(RoleGuard as any) ? "✅ Ready" : "❌ Undefined"}</li>
          <li>DashboardShell Component: {!!(DashboardShell as any) ? "✅ Ready" : "❌ Undefined"}</li>
          <li>StatCard Component: {!!(StatCard as any) ? "✅ Ready" : "❌ Undefined"}</li>
        </ul>
      </div>
    );
  }

  return (
    <RoleGuard allowedRole="business">
      <DashboardShell
        title="Business Dashboard"
        description="Manage reviews, team feedback, and performance insights."
        badge="Business Owner"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Average rating"
            value="4.6"
            description="Across all locations this month"
          />
          <StatCard
            title="New reviews"
            value="24"
            description="Received in the last 7 days"
          />
          <StatCard
            title="Response rate"
            value="92%"
            description="Replies to customer feedback"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent reviews</CardTitle>
              <CardDescription>
                Latest customer feedback for your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="font-medium text-slate-900">
                  Great service and friendly staff
                </p>
                <p className="mt-1 text-sm text-slate-500">★★★★★ · 2 days ago</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="font-medium text-slate-900">
                  Quick turnaround on our order
                </p>
                <p className="mt-1 text-sm text-slate-500">★★★★☆ · 5 days ago</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>Common tasks for business owners</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm text-slate-600">
              <p>Invite team member</p>
              <p>Update business profile</p>
              <p>Download analytics report</p>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </RoleGuard>
  );
}