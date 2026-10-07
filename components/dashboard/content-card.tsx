import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ContentType =
  | "text"
  | "list"
  | "media"
  | "chart"
  | "timeline"
  | "form";

interface ContentCardProps {
  title: string;
  description?: string;
  type: ContentType;
  children: React.ReactNode;
  actions?: React.ReactNode;
  loading?: boolean;
  error?: string;
  className?: string;
}

const contentTypeStyles = {
  text: "prose prose-sm dark:prose-invert",
  list: "space-y-2",
  media: "aspect-video",
  chart: "aspect-[4/3]",
  timeline: "space-y-4",
  form: "space-y-4",
};

/**
 * ContentCard - Versatile card for displaying different types of rich content
 *
 * @example
 * <ContentCard
 *   title="Recent Activity"
 *   type="list"
 *   children={<ActivityList items={data} />}
 * />
 */
export function ContentCard({
  title,
  description,
  type,
  children,
  actions,
  loading = false,
  error,
  className,
}: ContentCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription className="mt-1 text-sm">
              {description}
            </CardDescription>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 dark:border-slate-800 border-t-blue-600 dark:border-t-blue-400"></div>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 dark:bg-red-950 p-4">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              {error}
            </p>
          </div>
        ) : (
          <div className={cn(contentTypeStyles[type])}>
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ListItemProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onClick?: () => void;
}

/**
 * ContentListItem - Reusable list item component for use within ContentCard
 *
 * @example
 * <ContentCard type="list">
 *   <ContentListItem title="Item 1" subtitle="Subtitle" />
 *   <ContentListItem title="Item 2" subtitle="Subtitle" />
 * </ContentCard>
 */
export function ContentListItem({
  icon,
  title,
  subtitle,
  actions,
  onClick,
}: ListItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 sm:p-4 transition-colors",
        {
          "hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer": onClick,
        }
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {icon && <div className="flex-shrink-0 text-slate-400">{icon}</div>}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">
            {title}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex-shrink-0 ml-2">{actions}</div>}
    </div>
  );
}

interface TimelineItemProps {
  date: string;
  title: string;
  description?: string;
  status?: "completed" | "pending" | "failed";
  icon?: React.ReactNode;
}

/**
 * TimelineItem - Timeline event component for use within ContentCard
 *
 * @example
 * <ContentCard type="timeline">
 *   <TimelineItem date="2024-01-15" title="Event 1" status="completed" />
 *   <TimelineItem date="2024-01-16" title="Event 2" status="pending" />
 * </ContentCard>
 */
export function TimelineItem({
  date,
  title,
  description,
  status = "completed",
  icon,
}: TimelineItemProps) {
  const statusColors = {
    completed: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200",
    pending: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200",
    failed: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200",
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full text-lg",
            statusColors[status]
          )}
        >
          {icon || "•"}
        </div>
      </div>
      <div className="flex-1 pb-4 pt-2">
        <div className="flex items-baseline gap-2 flex-wrap">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">{date}</p>
        </div>
        {description && (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
