import * as React from "react";

import { cn } from "@/lib/utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4 text-sm",
          variant === "destructive"
            ? "border-red-500 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50"
            : "border-slate-200 bg-white text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
          className
        )}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("mt-2 text-sm text-slate-700 dark:text-slate-300", className)}
      {...props}
    />
  )
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription };
