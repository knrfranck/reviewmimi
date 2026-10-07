export type UserRole = "business" | "admin" | "customer";

export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  business: "/business",
  admin: "/admin",
  customer: "/customer",
};

export function getDashboardPath(role: string | null | undefined): string {
  if (role === "business" || role === "admin" || role === "customer") {
    return ROLE_DASHBOARDS[role];
  }
  return "/";
}

export function isUserRole(role: string | null | undefined): role is UserRole {
  return role === "business" || role === "admin" || role === "customer";
}
