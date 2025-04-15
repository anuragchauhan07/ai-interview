import AuthSessionHeader from "@/components/auth/AuthSessionHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthSessionHeader />
      {children}
    </>
  );
}
