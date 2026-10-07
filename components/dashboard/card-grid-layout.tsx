import React from "react";
import { cn } from "@/lib/utils";
import { AdaptiveGrid, ResponsiveGridItem } from "./adaptive-grid";

interface CardGridLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  variant?: "auto" | "balanced" | "featured";
  className?: string;
  contentClassName?: string;
}

/**
 * CardGridLayout - Full layout container with header and adaptive grid
 * Provides consistent spacing and organization for dashboard sections
 *
 * @example
 * <CardGridLayout title="Overview" description="Key metrics">
 *   <RichCard {...} />
 *   <RichCard {...} />
 * </CardGridLayout>
 */
export function CardGridLayout({
  title,
  description,
  children,
  actions,
  variant = "auto",
  className,
  contentClassName,
}: CardGridLayoutProps) {
  return (
    <section className={cn("space-y-6 py-6", className)}>
      {/* Header with title and actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between px-0">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Adaptive grid content */}
      <AdaptiveGrid
        variant={variant}
        density="comfortable"
        className={contentClassName}
      >
        {children}
      </AdaptiveGrid>
    </section>
  );
}

interface StatsGridLayoutProps {
  stats: {
    title: string;
    value: string | number;
    description?: string;
    trend?: {
      value: number;
      direction: "up" | "down" | "neutral";
    };
    icon?: React.ReactNode;
  }[];
  className?: string;
}

/**
 * StatsGridLayout - Specialized layout for displaying statistics in a responsive grid
 * Optimized for 4-column desktop, 2-column tablet, 1-column mobile
 *
 * @example
 * <StatsGridLayout stats={[
 *   { title: "Revenue", value: "$12,450", trend: { value: 12, direction: "up" } },
 *   { title: "Users", value: "1,234", trend: { value: 5, direction: "up" } },
 * ]} />
 */
export function StatsGridLayout({ stats, className }: StatsGridLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 sm:p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.title}
              </p>
              <p className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">
                {stat.value}
              </p>
              {stat.description && (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                  {stat.description}
                </p>
              )}
            </div>
            {stat.icon && (
              <div className="text-slate-400 dark:text-slate-600">
                {stat.icon}
              </div>
            )}
          </div>

          {stat.trend && (
            <div className="mt-3 flex items-center gap-1 text-xs font-medium">
              <span
                className={cn("inline-block", {
                  "text-green-600 dark:text-green-400":
                    stat.trend.direction === "up",
                  "text-red-600 dark:text-red-400": stat.trend.direction === "down",
                  "text-slate-600 dark:text-slate-400":
                    stat.trend.direction === "neutral",
                })}
              >
                {stat.trend.direction === "up" && "↑"}
                {stat.trend.direction === "down" && "↓"}
                {stat.trend.direction === "neutral" && "→"}
              </span>
              <span
                className={cn({
                  "text-green-600 dark:text-green-400":
                    stat.trend.direction === "up",
                  "text-red-600 dark:text-red-400": stat.trend.direction === "down",
                  "text-slate-600 dark:text-slate-400":
                    stat.trend.direction === "neutral",
                })}
              >
                {Math.abs(stat.trend.value)}% from last month
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
