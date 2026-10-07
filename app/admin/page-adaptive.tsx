"use client";

import React from "react";
import RoleGuardComponent from "@/components/dashboard/role-guard";
import * as RoleGuardModule from "@/components/dashboard/role-guard";
import * as ShellModule from "@/components/dashboard/dashboard-shell";
import { DashboardLayout, DashboardSection } from "@/components/dashboard/dashboard-layout";
import { CardGridLayout, StatsGridLayout } from "@/components/dashboard/card-grid-layout";
import { RichCard } from "@/components/dashboard/rich-card";
import { ContentCard, ContentListItem, TimelineItem } from "@/components/dashboard/content-card";
import { ResponsiveGridItem } from "@/components/dashboard/adaptive-grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Safely resolve components
const RoleGuard = RoleGuardComponent || (RoleGuardModule as any).RoleGuard || (RoleGuardModule as any).StrictAdminGuard;
const DashboardShell = (ShellModule as any).DashboardShell || (ShellModule as any).default;

export default function AdminDashboardPageNew() {
  if (!RoleGuard) {
    return (
      <div className="p-6 bg-amber-50 text-amber-900 rounded-md m-4 border border-amber-200 font-mono text-sm">
        <h1 className="font-bold mb-2">🔧 Build Diagnostics</h1>
        <p>RoleGuard Component: ❌ Undefined</p>
      </div>
    );
  }

  const adminStats = [
    {
      title: "Total Businesses",
      value: "1,234",
      description: "Active on platform",
      trend: { value: 8, direction: "up" as const },
    },
    {
      title: "Total Reviews",
      value: "12,456",
      description: "This month",
      trend: { value: 15, direction: "up" as const },
    },
    {
      title: "Average Rating",
      value: "4.5",
      description: "Overall platform",
      trend: { value: 2, direction: "up" as const },
    },
    {
      title: "User Engagement",
      value: "78%",
      description: "Active users",
      trend: { value: 5, direction: "down" as const },
    },
  ];

  const recentActivities = [
    {
      icon: "🏢",
      title: "New Business Registration",
      subtitle: "TechCafe registered as business",
    },
    {
      icon: "⭐",
      title: "High Rating Alert",
      subtitle: "Restaurant XYZ reached 5.0 stars",
    },
    {
      icon: "🚨",
      title: "Review Flagged",
      subtitle: "Inappropriate review on Business ABC",
    },
  ];

  const recentEvents = [
    {
      date: "2024-01-15",
      title: "System maintenance completed",
      status: "completed" as const,
    },
    {
      date: "2024-01-16",
      title: "Database optimization",
      status: "completed" as const,
    },
    {
      date: "2024-01-17",
      title: "Security audit scheduled",
      status: "pending" as const,
    },
  ];

  return (
    <RoleGuard allowedRole="admin">
      <DashboardLayout maxWidth="xl">
        {/* Header Section */}
        <DashboardSection>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Manage platform, businesses, and user reviews
            </p>
          </div>
        </DashboardSection>

        {/* Key Metrics */}
        <DashboardSection separator>
          <CardGridLayout
            title="Platform Metrics"
            description="Real-time performance overview"
          >
            <StatsGridLayout stats={adminStats} />
          </CardGridLayout>
        </DashboardSection>

        {/* Performance Cards */}
        <DashboardSection separator>
          <CardGridLayout
            title="System Status"
            description="Platform health and performance"
            variant="auto"
          >
            <RichCard
              title="Active Businesses"
              description="Currently on platform"
              content={
                <div className="space-y-2">
                  <div className="text-4xl font-bold">1,234</div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-blue-600" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    85% of capacity
                  </p>
                </div>
              }
              trend={{ value: 8, direction: "up" }}
              variant="highlight"
            />

            <RichCard
              title="Reviews This Month"
              description="Quality control status"
              content={
                <div className="space-y-2">
                  <div className="text-4xl font-bold">12.4K</div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        Verified
                      </p>
                      <p className="font-semibold">11.8K</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        Pending
                      </p>
                      <p className="font-semibold">600</p>
                    </div>
                  </div>
                </div>
              }
              trend={{ value: 15, direction: "up" }}
            />

            <RichCard
              title="System Health"
              description="Performance metrics"
              content={
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 dark:text-slate-400">
                        Uptime
                      </span>
                      <span className="font-semibold">99.9%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[99%] bg-green-600" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 dark:text-slate-400">
                        Response Time
                      </span>
                      <span className="font-semibold">120ms</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[75%] bg-green-600" />
                    </div>
                  </div>
                </div>
              }
              variant="highlight"
            />
          </CardGridLayout>
        </DashboardSection>

        {/* Activity & Logs */}
        <DashboardSection separator>
          <CardGridLayout
            title="Activity & Logs"
            description="Recent platform activity"
            variant="balanced"
          >
            <ResponsiveGridItem span="half">
              <ContentCard
                title="Recent Activities"
                description="Latest platform events"
                type="list"
              >
                {recentActivities.map((item, index) => (
                  <ContentListItem
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    subtitle={item.subtitle}
                  />
                ))}
              </ContentCard>
            </ResponsiveGridItem>

            <ResponsiveGridItem span="half">
              <ContentCard
                title="System Events"
                description="Scheduled and completed tasks"
                type="timeline"
              >
                {recentEvents.map((event, index) => (
                  <TimelineItem
                    key={index}
                    date={event.date}
                    title={event.title}
                    status={event.status}
                  />
                ))}
              </ContentCard>
            </ResponsiveGridItem>
          </CardGridLayout>
        </DashboardSection>

        {/* Quick Actions */}
        <DashboardSection separator>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                Quick Actions
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Common administrative tasks
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">👥 Manage Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View and manage all users
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">🏢 Businesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Manage business accounts
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">⭐ Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Moderate platform reviews
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">📊 Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    View analytics reports
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </DashboardSection>
      </DashboardLayout>
    </RoleGuard>
  );
}
