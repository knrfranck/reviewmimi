"use client";

import React from "react";
import { AdaptiveGrid, ResponsiveGridItem } from "./adaptive-grid";
import { RichCard } from "./rich-card";
import { CardGridLayout, StatsGridLayout } from "./card-grid-layout";
import { ContentCard, ContentListItem, TimelineItem } from "./content-card";
import { DashboardLayout, DashboardSection } from "./dashboard-layout";
import { Button } from "@/components/ui/button";

/**
 * Dashboard Showcase - Example implementation of adaptive card-based layout
 * Demonstrates all responsive components and patterns
 */
export function DashboardShowcase() {
  // Sample data
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      description: "Last 30 days",
      trend: { value: 12, direction: "up" as const },
    },
    {
      title: "Conversions",
      value: "2,451",
      description: "From 12k visits",
      trend: { value: 8, direction: "up" as const },
    },
    {
      title: "Active Users",
      value: "1,234",
      description: "Currently online",
      trend: { value: 3, direction: "down" as const },
    },
    {
      title: "Engagement Rate",
      value: "68%",
      description: "Page interactions",
      trend: { value: 5, direction: "up" as const },
    },
  ];

  const recentActivity = [
    {
      icon: "📝",
      title: "New review posted",
      subtitle: "By John Doe on Restaurant XYZ",
    },
    {
      icon: "⭐",
      title: "Rating update",
      subtitle: "Business profile rating increased to 4.8",
    },
    {
      icon: "👥",
      title: "New follower",
      subtitle: "Sarah Johnson started following you",
    },
  ];

  const timeline = [
    {
      date: "2024-01-15",
      title: "Review campaign launched",
      status: "completed" as const,
    },
    {
      date: "2024-01-16",
      title: "Customer feedback collected",
      status: "completed" as const,
    },
    {
      date: "2024-01-17",
      title: "Analytics report generated",
      status: "pending" as const,
    },
  ];

  return (
    <DashboardLayout maxWidth="xl">
      {/* Statistics Section */}
      <DashboardSection>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Overview
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Key performance metrics for this month
            </p>
          </div>
          <StatsGridLayout stats={stats} />
        </div>
      </DashboardSection>

      {/* Rich Cards Section */}
      <DashboardSection separator>
        <CardGridLayout
          title="Performance"
          description="Detailed insights into your business performance"
          variant="auto"
        >
          <RichCard
            title="Average Rating"
            description="Across all locations"
            content={<div className="text-4xl font-bold">4.6</div>}
            variant="highlight"
            trend={{ value: 5, direction: "up" }}
          />

          <RichCard
            title="Total Reviews"
            description="This month"
            content={
              <div className="space-y-1">
                <div className="text-4xl font-bold">342</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  +28 from last week
                </div>
              </div>
            }
            trend={{ value: 12, direction: "up" }}
          />

          <RichCard
            title="Customer Satisfaction"
            description="Based on responses"
            content={
              <div className="space-y-2">
                <div className="text-4xl font-bold">92%</div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-green-600" />
                </div>
              </div>
            }
            variant="highlight"
          />
        </CardGridLayout>
      </DashboardSection>

      {/* Content Cards Section */}
      <DashboardSection separator>
        <CardGridLayout
          title="Activity & Insights"
          description="Recent updates and timeline"
          variant="balanced"
        >
          <ResponsiveGridItem span="half">
            <ContentCard
              title="Recent Activity"
              description="Latest updates from your account"
              type="list"
            >
              {recentActivity.map((item, index) => (
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
              title="Campaign Timeline"
              description="Recent milestones and events"
              type="timeline"
            >
              {timeline.map((item, index) => (
                <TimelineItem
                  key={index}
                  date={item.date}
                  title={item.title}
                  status={item.status}
                />
              ))}
            </ContentCard>
          </ResponsiveGridItem>
        </CardGridLayout>
      </DashboardSection>

      {/* Responsive Features Demo */}
      <DashboardSection separator>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Responsive Features
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              All cards adapt automatically to screen size
            </p>
          </div>

          <AdaptiveGrid variant="featured" density="comfortable">
            <ResponsiveGridItem span="full">
              <RichCard
                title="Full Width Card"
                description="This card spans the full width on all screen sizes"
                content={
                  <p className="text-slate-600 dark:text-slate-400">
                    Perfect for important announcements or featured content that needs
                    maximum visibility across all devices.
                  </p>
                }
                footer="Last updated 2 hours ago"
              />
            </ResponsiveGridItem>

            <RichCard
              title="Interactive Card"
              description="Click me!"
              content={<div className="text-2xl font-bold">Hover Effect Active</div>}
              variant="interactive"
              onClick={() => alert("Card clicked!")}
            />

            <RichCard
              title="Minimal Style"
              description="Clean and simple"
              content={<p>Content with minimal styling</p>}
              variant="minimal"
            />

            <RichCard
              title="Default Style"
              description="Standard appearance"
              content={<p>Regular card styling</p>}
              variant="default"
            />
          </AdaptiveGrid>
        </div>
      </DashboardSection>

      {/* CTA Section */}
      <DashboardSection separator>
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-50">
            Ready to get started?
          </h3>
          <p className="mt-2 text-sm text-blue-800 dark:text-blue-200">
            Build amazing dashboards with responsive, adaptive card-based layouts.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-3">
            <Button>Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </DashboardSection>
    </DashboardLayout>
  );
}
