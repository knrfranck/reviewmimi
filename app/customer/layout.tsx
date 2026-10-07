import { AuthLayout } from "@/components/auth-layout";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
