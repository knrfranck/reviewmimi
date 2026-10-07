import { AuthLayout } from "@/components/auth-layout";

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
