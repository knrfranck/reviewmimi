import { AuthLayout } from "@/components/auth-layout";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
