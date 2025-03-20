import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

// Initialize the Inter font with specified subsets
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Stocks Forecast AI',
  description: 'AI-powered stock price forecasting platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("antialiased", inter.variable)}>
      <body className="min-h-screen bg-background">
        <div className="relative flex min-h-screen flex-col">
          {/* Main content */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="border-t py-6 bg-background">
            <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8">
              <div className="text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} StocksForecast AI. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 