import { SideNav } from "./side-nav";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto pt-2 min-h-screen h-full">
      <div className="flex gap-8 h-full">
        <SideNav />
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}