"use client";

import Link from "next/link";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CustomerDashboardPage() {
  return (
    <RoleGuard allowedRole="customer">
      <DashboardShell
        title="Customer Dashboard"
        description="Browse businesses, leave reviews, and track your feedback."
        badge="Customer"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Reviews written"
            value="12"
            description="Total reviews you have submitted"
          />
          <StatCard
            title="Saved places"
            value="5"
            description="Businesses you follow or bookmarked"
          />
          <StatCard
            title="Pending replies"
            value="2"
            description="Business responses to your reviews"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Explore categories</CardTitle>
              <CardDescription>
                Find businesses to review by industry
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/categories/food_dining"
                className="rounded-lg border border-slate-200 p-4 text-center hover:bg-slate-50"
              >
                <span className="text-2xl block">🍔</span>
                <span className="mt-1 block text-sm font-medium">Restaurants</span>
              </Link>
              <Link
                href="/categories/travel_tours"
                className="rounded-lg border border-slate-200 p-4 text-center hover:bg-slate-50"
              >
                <span className="text-2xl block">🏨</span>
                <span className="mt-1 block text-sm font-medium">Hotels</span>
              </Link>
              <Link
                href="/categories/shopping_retail"
                className="rounded-lg border border-slate-200 p-4 text-center hover:bg-slate-50"
              >
                <span className="text-2xl block">🛍️</span>
                <span className="mt-1 block text-sm font-medium">Retail</span>
              </Link>
              <Link
                href="/categories/nightlife"
                className="rounded-lg border border-slate-200 p-4 text-center hover:bg-slate-50"
              >
                <span className="text-2xl block">🌙</span>
                <span className="mt-1 block text-sm font-medium">Nightlife</span>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your recent reviews</CardTitle>
              <CardDescription>Feedback you have shared recently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600">
              <p>Downtown Bistro — ★★★★★ · Posted last week</p>
              <p>City Center Hotel — ★★★★☆ · Posted 2 weeks ago</p>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </RoleGuard>
  );
}
