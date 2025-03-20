'use client';

import { Header } from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Main content */}
      <main className="flex-1 py-6 md:py-8">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 