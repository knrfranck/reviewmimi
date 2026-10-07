import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardVariant = "default" | "highlight" | "minimal" | "interactive";
type CardSize = "sm" | "md" | "lg";

interface RichCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  onClick?: () => void;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  badge?: React.ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
}

const variantStyles = {
  default:
    "bg-white dark:bg-slate-950 hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-800",
  highlight:
    "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800",
  minimal: "bg-slate-50 dark:bg-slate-900 border-0 shadow-none hover:bg-slate-100 dark:hover:bg-slate-800",
  interactive:
    "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all",
};

const sizeStyles = {
  sm: "px-4 py-3",
  md: "px-6 py-4",
  lg: "px-8 py-6",
};

/**
 * RichCard - Enhanced card component with multiple variants and rich content support
 *
 * @example
 * <RichCard
 *   title="Revenue"
 *   description="Last 30 days"
 *   content={<div className="text-4xl font-bold">$12,450</div>}
 *   trend={{ value: 12, direction: "up" }}
 *   variant="highlight"
 * />
 */
export function RichCard({
  title,
  description,
  content,
  footer,
  icon,
  variant = "default",
  size = "md",
  onClick,
  className,
  headerClassName,
  contentClassName,
  badge,
  trend,
}: RichCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(variantStyles[variant], className, {
        "cursor-pointer": onClick,
      })}
    >
      {(title || description || icon || badge) && (
        <CardHeader className={cn("flex flex-row items-start justify-between space-y-0", headerClassName)}>
          <div className="flex-1">
            {title && <CardTitle className="text-base font-semibold">{title}</CardTitle>}
            {description && <CardDescription className="text-sm">{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            {badge && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {badge}
              </span>
            )}
            {icon && <div className="text-slate-400 dark:text-slate-600">{icon}</div>}
          </div>
        </CardHeader>
      )}

      <CardContent className={cn("space-y-3", contentClassName)}>
        <div>{content}</div>

        {trend && (
          <div className="flex items-center gap-1 text-xs font-medium">
            <span
              className={cn("inline-block h-4 w-4", {
                "text-green-600 dark:text-green-400": trend.direction === "up",
                "text-red-600 dark:text-red-400": trend.direction === "down",
                "text-slate-600 dark:text-slate-400":
                  trend.direction === "neutral",
              })}
            >
              {trend.direction === "up" && "↑"}
              {trend.direction === "down" && "↓"}
              {trend.direction === "neutral" && "→"}
            </span>
            <span
              className={cn({
                "text-green-600 dark:text-green-400": trend.direction === "up",
                "text-red-600 dark:text-red-400": trend.direction === "down",
                "text-slate-600 dark:text-slate-400":
                  trend.direction === "neutral",
              })}
            >
              {Math.abs(trend.value)}%
            </span>
          </div>
        )}

        {footer && <div className="border-t border-slate-200 dark:border-slate-800 pt-3 text-xs text-slate-600 dark:text-slate-400">{footer}</div>}
      </CardContent>
    </Card>
  );
}
