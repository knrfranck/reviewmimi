/**
 * Dashboard Layout Types
 * Centralized type definitions for all adaptive dashboard components
 */

// ============================================================================
// Grid Types
// ============================================================================

/**
 * Density determines the gap between grid items
 */
export type GridDensity = "compact" | "comfortable" | "spacious";

/**
 * Variant determines the responsive column layout
 */
export type GridVariant = "auto" | "balanced" | "featured";

/**
 * Span determines how many grid columns an item occupies
 */
export type ResponsiveSpan = "full" | "half" | "default";

// ============================================================================
// Card Types
// ============================================================================

/**
 * Card visual style variant
 */
export type CardVariant = "default" | "highlight" | "minimal" | "interactive";

/**
 * Card size affects padding
 */
export type CardSize = "sm" | "md" | "lg";

/**
 * Trend indicator direction
 */
export type TrendDirection = "up" | "down" | "neutral";

/**
 * Trend information for cards
 */
export interface Trend {
  value: number; // Percentage value (0-100)
  direction: TrendDirection;
}

/**
 * Props for RichCard component
 */
export interface RichCardProps {
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
  trend?: Trend;
}

// ============================================================================
// Content Card Types
// ============================================================================

/**
 * Type of content displayed in ContentCard
 */
export type ContentType = "text" | "list" | "media" | "chart" | "timeline" | "form";

/**
 * Props for ContentCard component
 */
export interface ContentCardProps {
  title: string;
  description?: string;
  type: ContentType;
  children: React.ReactNode;
  actions?: React.ReactNode;
  loading?: boolean;
  error?: string;
  className?: string;
}

/**
 * Props for ContentListItem component
 */
export interface ContentListItemProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onClick?: () => void;
}

/**
 * Status type for timeline items
 */
export type TimelineItemStatus = "completed" | "pending" | "failed";

/**
 * Props for TimelineItem component
 */
export interface TimelineItemProps {
  date: string;
  title: string;
  description?: string;
  status?: TimelineItemStatus;
  icon?: React.ReactNode;
}

// ============================================================================
// Layout Types
// ============================================================================

/**
 * Max width constraint for DashboardLayout
 */
export type MaxWidth = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Props for DashboardLayout component
 */
export interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: MaxWidth;
}

/**
 * Props for DashboardSection component
 */
export interface DashboardSectionProps {
  children: React.ReactNode;
  className?: string;
  separator?: boolean;
}

/**
 * Column count for DashboardGrid
 */
export type GridCols = 1 | 2 | 3 | 4;

/**
 * Gap size for DashboardGrid
 */
export type GridGap = "sm" | "md" | "lg";

/**
 * Props for DashboardGrid component
 */
export interface DashboardGridProps {
  children: React.ReactNode;
  cols?: GridCols;
  className?: string;
  gap?: GridGap;
}

/**
 * Props for StickyHeader component
 */
export interface StickyHeaderProps {
  children: React.ReactNode;
  className?: string;
}

// ============================================================================
// Card Grid Layout Types
// ============================================================================

/**
 * Props for CardGridLayout component
 */
export interface CardGridLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  variant?: GridVariant;
  className?: string;
  contentClassName?: string;
}

/**
 * Stat item for StatsGridLayout
 */
export interface StatItem {
  title: string;
  value: string | number;
  description?: string;
  trend?: Trend;
  icon?: React.ReactNode;
}

/**
 * Props for StatsGridLayout component
 */
export interface StatsGridLayoutProps {
  stats: StatItem[];
  className?: string;
}

// ============================================================================
// Adaptive Grid Types
// ============================================================================

/**
 * Props for AdaptiveGrid component
 */
export interface AdaptiveGridProps {
  children: React.ReactNode;
  density?: GridDensity;
  variant?: GridVariant;
  className?: string;
}

/**
 * Props for ResponsiveGridItem component
 */
export interface ResponsiveGridItemProps {
  children: React.ReactNode;
  span?: ResponsiveSpan;
  className?: string;
}

// ============================================================================
// Dashboard Data Types
// ============================================================================

/**
 * Generic dashboard metric
 */
export interface DashboardMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  previousValue?: string | number;
  comparison?: "up" | "down" | "neutral";
}

/**
 * Dashboard section configuration
 */
export interface DashboardSection {
  id: string;
  title: string;
  description?: string;
  type: "stats" | "cards" | "content" | "custom";
  items: DashboardMetric[] | RichCardProps[] | ContentCardProps[];
}

/**
 * Complete dashboard configuration
 */
export interface DashboardConfig {
  title: string;
  description?: string;
  sections: DashboardSection[];
  layout?: {
    maxWidth?: MaxWidth;
    density?: GridDensity;
  };
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Common component props
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Responsive breakpoint definition
 */
export interface BreakPoint {
  name: string;
  minWidth: number;
  columns: number;
}

/**
 * Design token
 */
export interface DesignToken {
  name: string;
  value: string | number;
  description?: string;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, Record<string, string>>;
  breakpoints: Record<string, number>;
}

// ============================================================================
// Action Types
// ============================================================================

/**
 * Card action/button configuration
 */
export interface CardAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: React.ReactNode;
  disabled?: boolean;
}

/**
 * Dialog or modal action
 */
export interface DialogAction {
  id: string;
  label: string;
  onClick: (data?: any) => void | Promise<void>;
  variant?: "primary" | "secondary" | "destructive";
  loading?: boolean;
}

// ============================================================================
// Error & State Types
// ============================================================================

/**
 * Loading state
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * Error information
 */
export interface ErrorInfo {
  code: string;
  message: string;
  details?: Record<string, any>;
}

/**
 * Async state
 */
export interface AsyncState<T> {
  status: LoadingState;
  data?: T;
  error?: ErrorInfo;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * API response wrapper
 */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorInfo;
  timestamp: string;
}

// ============================================================================
// Export all types as namespace for convenience
// ============================================================================

// Dashboard namespace removed to avoid circular type aliases in the generated module.
// Consumers can use the top-level exported types directly instead.
