"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

const maxWidthMap = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

/**
 * DashboardLayout - Main wrapper for dashboard content
 * Provides responsive padding and max-width constraints
 *
 * @example
 * <DashboardLayout maxWidth="xl">
 *   <CardGridLayout title="Overview">
 *     <RichCard {...} />
 *   </CardGridLayout>
 * </DashboardLayout>
 */
export function DashboardLayout({
  children,
  className,
  maxWidth = "xl",
}: DashboardLayoutProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8",
        maxWidthMap[maxWidth],
        className
      )}
    >
      {children}
    </main>
  );
}

interface DashboardSectionProps {
  children: React.ReactNode;
  className?: string;
  separator?: boolean;
}

/**
 * DashboardSection - Vertical section separator with consistent spacing
 *
 * @example
 * <DashboardLayout>
 *   <DashboardSection>
 *     <CardGridLayout title="Section 1" />
 *   </DashboardSection>
 *   <DashboardSection separator>
 *     <CardGridLayout title="Section 2" />
 *   </DashboardSection>
 * </DashboardLayout>
 */
export function DashboardSection({
  children,
  className,
  separator = false,
}: DashboardSectionProps) {
  return (
    <div
      className={cn("py-6 sm:py-8 lg:py-10", separator && "border-t border-slate-200 dark:border-slate-800", className)}
    >
      {children}
    </div>
  );
}

interface DashboardGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
  gap?: "sm" | "md" | "lg";
}

const gapMap = {
  sm: "gap-4 sm:gap-4 lg:gap-4",
  md: "gap-4 sm:gap-5 lg:gap-6",
  lg: "gap-6 sm:gap-7 lg:gap-8",
};

const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * DashboardGrid - Simplified grid without the full layout wrapper
 * Use when you already have your own section/title structure
 *
 * @example
 * <DashboardGrid cols={3} gap="md">
 *   <RichCard {...} />
 * </DashboardGrid>
 */
export function DashboardGrid({
  children,
  cols = 3,
  className,
  gap = "md",
}: DashboardGridProps) {
  return (
    <div className={cn("grid", colsMap[cols], gapMap[gap], className)}>
      {children}
    </div>
  );
}

interface StickyHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * StickyHeader - Sticky header that remains visible on scroll
 * Useful for dashboard headers or filters
 *
 * @example
 * <StickyHeader>
 *   <div className="flex justify-between items-center">
 *     <h1>Dashboard</h1>
 *     <FilterButton />
 *   </div>
 * </StickyHeader>
 */
export function StickyHeader({ children, className }: StickyHeaderProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 py-4 sm:py-6",
        className
      )}
    >
      {children}
    </div>
  );
}
