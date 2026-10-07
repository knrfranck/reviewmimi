"use client";

import React from "react";
import RoleGuardComponent from "@/components/dashboard/role-guard";
import * as RoleGuardModule from "@/components/dashboard/role-guard";
import { DashboardLayout, DashboardSection } from "@/components/dashboard/dashboard-layout";
import { CardGridLayout, StatsGridLayout } from "@/components/dashboard/card-grid-layout";
import { RichCard } from "@/components/dashboard/rich-card";
import { ContentCard, ContentListItem, TimelineItem } from "@/components/dashboard/content-card";
import { ResponsiveGridItem, AdaptiveGrid } from "@/components/dashboard/adaptive-grid";
import { Button } from "@/components/ui/button";

// Safely resolve components
const RoleGuard = RoleGuardComponent || (RoleGuardModule as any).RoleGuard || (RoleGuardModule as any).StrictAdminGuard;

export default function BusinessDashboardPageNew() {
  if (!RoleGuard) {
    return (
      <div className="p-6 bg-amber-50 text-amber-900 rounded-md m-4 border border-amber-200 font-mono text-sm">
        <h1 className="font-bold mb-2">🔧 Build Diagnostics</h1>
        <p>RoleGuard Component: ❌ Undefined</p>
      </div>
    );
  }

  const businessStats = [
    {
      title: "Average Rating",
      value: "4.6",
      description: "Across all locations",
      trend: { value: 5, direction: "up" as const },
    },
    {
      title: "Total Reviews",
      value: "342",
      description: "This month",
      trend: { value: 12, direction: "up" as const },
    },
    {
      title: "Response Rate",
      value: "94%",
      description: "To reviews",
      trend: { value: 3, direction: "up" as const },
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      description: "Review response",
      trend: { value: 1, direction: "down" as const },
    },
  ];

  const recentReviews = [
    {
      icon: "⭐⭐⭐⭐⭐",
      title: "Excellent service",
      subtitle: "By John Doe - 2 hours ago",
    },
    {
      icon: "⭐⭐⭐⭐",
      title: "Good food, great atmosphere",
      subtitle: "By Jane Smith - 5 hours ago",
    },
    {
      icon: "⭐⭐⭐",
      title: "Average experience",
      subtitle: "By Bob Wilson - 1 day ago",
    },
  ];

  const reviewTimeline = [
    {
      date: "2024-01-15",
      title: "Rating increased to 4.7",
      status: "completed" as const,
    },
    {
      date: "2024-01-16",
      title: "Responded to all pending reviews",
      status: "completed" as const,
    },
    {
      date: "2024-01-17",
      title: "Review campaign launching",
      status: "pending" as const,
    },
  ];

  return (
    <RoleGuard allowedRole="business">
      <DashboardLayout maxWidth="xl">
        {/* Header Section */}
        <DashboardSection>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Business Dashboard
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Manage reviews, team feedback, and performance insights
            </p>
          </div>
        </DashboardSection>

        {/* Key Performance Indicators */}
        <DashboardSection separator>
          <CardGridLayout
            title="Performance Overview"
            description="Your business metrics for this month"
          >
            <StatsGridLayout stats={businessStats} />
          </CardGridLayout>
        </DashboardSection>

        {/* Main Metrics */}
        <DashboardSection separator>
          <CardGridLayout
            title="Key Insights"
            description="Detailed analysis of your performance"
            variant="auto"
          >
            <RichCard
              title="Average Rating"
              description="Across all locations this month"
              content={
                <div className="space-y-2">
                  <div className="text-4xl font-bold">4.6</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★ ★ ★ ★ ☆</span>
                  </div>
                </div>
              }
              trend={{ value: 5, direction: "up" }}
              variant="highlight"
              badge="Based on 342 reviews"
            />

            <RichCard
              title="Total Reviews"
              description="This month's volume"
              content={
                <div className="space-y-3">
                  <div className="text-4xl font-bold">342</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        5 stars
                      </span>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        1-4 stars
                      </span>
                      <span className="font-semibold">186</span>
                    </div>
                  </div>
                </div>
              }
              trend={{ value: 12, direction: "up" }}
            />

            <RichCard
              title="Response Performance"
              description="Review engagement rate"
              content={
                <div className="space-y-3">
                  <div className="text-4xl font-bold">94%</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 dark:text-slate-400">
                          Responded
                        </span>
                        <span className="font-semibold">321/342</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-[94%] bg-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              }
              variant="highlight"
            />
          </CardGridLayout>
        </DashboardSection>

        {/* Reviews & Activity */}
        <DashboardSection separator>
          <CardGridLayout
            title="Reviews & Activity"
            description="Recent customer feedback and timeline"
            variant="balanced"
          >
            <ResponsiveGridItem span="half">
              <ContentCard
                title="Recent Reviews"
                description="Latest customer feedback"
                type="list"
              >
                {recentReviews.map((review, index) => (
                  <ContentListItem
                    key={index}
                    icon={review.icon}
                    title={review.title}
                    subtitle={review.subtitle}
                  />
                ))}
              </ContentCard>
            </ResponsiveGridItem>

            <ResponsiveGridItem span="half">
              <ContentCard
                title="Review Milestones"
                description="Recent achievements and goals"
                type="timeline"
              >
                {reviewTimeline.map((item, index) => (
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

        {/* Sentiment Analysis */}
        <DashboardSection separator>
          <CardGridLayout
            title="Sentiment Analysis"
            description="Understanding customer opinions"
            variant="auto"
          >
            <RichCard
              title="Positive Feedback"
              description="Highlighted strengths"
              content={
                <div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Fast and friendly service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Great food quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Clean and welcoming atmosphere</span>
                    </li>
                  </ul>
                </div>
              }
              variant="minimal"
            />

            <RichCard
              title="Areas for Improvement"
              description="Common feedback themes"
              content={
                <div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">!</span>
                      <span>Reduce wait times during peak hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">!</span>
                      <span>Expand dessert menu options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">!</span>
                      <span>Improve parking availability</span>
                    </li>
                  </ul>
                </div>
              }
              variant="minimal"
            />

            <RichCard
              title="Recommendations"
              description="Actions to boost ratings"
              content={
                <div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">→</span>
                      <span>Hire additional staff for peak times</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">→</span>
                      <span>Launch a special promotion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">→</span>
                      <span>Request reviews from satisfied customers</span>
                    </li>
                  </ul>
                </div>
              }
              variant="minimal"
            />
          </CardGridLayout>
        </DashboardSection>

        {/* Call to Action */}
        <DashboardSection separator>
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-50">
              Boost Your Rating
            </h3>
            <p className="mt-2 text-sm text-blue-800 dark:text-blue-200">
              Get more reviews and respond faster. Learn strategies to improve your business performance.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button>View Best Practices</Button>
              <Button variant="outline">Request Demo</Button>
            </div>
          </div>
        </DashboardSection>
      </DashboardLayout>
    </RoleGuard>
  );
}
