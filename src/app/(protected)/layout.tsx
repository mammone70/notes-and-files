import { SideNav } from "./side-nav";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="border rounded-xl mx-auto min-h-screen h-full">
      <div className="flex h-full">
        <SideNav />
        <div className="w-full p-4">{children}</div>
      </div>
    </main>
  );
}