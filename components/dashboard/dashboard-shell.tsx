"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type DashboardShellProps = {
  title: string;
  description: string;
  badge: string;
  children: React.ReactNode;
};

export function DashboardShell({
  title,
  description,
  badge,
  children,
}: DashboardShellProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
              ReviewMimi
            </Link>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{title}</h1>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {badge}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-slate-500">{description}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-600 sm:inline">
              {user?.email}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

export default DashboardShell;
