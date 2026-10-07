import { AuthProvider } from "@/context/AuthContext";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AuthLayout;
