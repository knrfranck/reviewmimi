import React from "react";
import { cn } from "@/lib/utils";

type GridDensity = "compact" | "comfortable" | "spacious";
type GridVariant = "auto" | "balanced" | "featured";

interface AdaptiveGridProps {
  children: React.ReactNode;
  density?: GridDensity;
  variant?: GridVariant;
  className?: string;
}

const densityMap = {
  compact: "gap-3 sm:gap-4 lg:gap-4",
  comfortable: "gap-4 sm:gap-5 lg:gap-6",
  spacious: "gap-6 sm:gap-7 lg:gap-8",
};

const variantMap = {
  // Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols
  auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  // Mobile: 1 col, Tablet: 2 cols, Desktop: 2 cols with varied sizes
  balanced:
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 auto-rows-max",
  // Mobile: 1 col, Tablet: 1 col, Desktop: Featured large left + grid right
  featured:
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-max gap-4",
};

/**
 * AdaptiveGrid - Responsive grid container for dashboard cards
 * Automatically adjusts columns and spacing based on screen size
 *
 * @example
 * <AdaptiveGrid variant="auto" density="comfortable">
 *   <Card>Content</Card>
 *   <Card>Content</Card>
 * </AdaptiveGrid>
 */
export function AdaptiveGrid({
  children,
  density = "comfortable",
  variant = "auto",
  className,
}: AdaptiveGridProps) {
  return (
    <div
      className={cn(
        "grid w-full",
        variantMap[variant],
        densityMap[density],
        className
      )}
    >
      {children}
    </div>
  );
}

interface ResponsiveGridItemProps {
  children: React.ReactNode;
  span?: "full" | "half" | "default";
  className?: string;
}

/**
 * ResponsiveGridItem - Individual grid item with responsive spanning
 *
 * @example
 * <ResponsiveGridItem span="full">
 *   <Card>Full width on mobile, auto on desktop</Card>
 * </ResponsiveGridItem>
 */
export function ResponsiveGridItem({
  children,
  span = "default",
  className,
}: ResponsiveGridItemProps) {
  const spanMap = {
    full: "col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4",
    half: "col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2",
    default: "col-span-1",
  };

  return (
    <div className={cn(spanMap[span], className)}>
      {children}
    </div>
  );
}
