'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu, Bell, X } from 'lucide-react';
import { getSession } from '@/app/lib/supabase';

export function Header() {
  const pathname = usePathname();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const isLandingPage = pathname === '/';

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      try {
        const { data, error } = await getSession();
        if (data && data.session && data.session.user) {
          setUser(data.session.user);
        }
      } catch (error) {
        console.error('Error fetching user session:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadUser();
  }, []);

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      current: pathname === '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
        </svg>
      ),
    },
    { 
      name: 'Settings', 
      href: '/dashboard/settings', 
      current: pathname?.startsWith('/dashboard/settings'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white">
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-zinc-900">
                StocksForecast <span className="bg-zinc-900 text-white text-xs px-2 py-1 rounded-full">AI</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900",
                    item.current && "text-zinc-900"
                  )}
                >
                  <span className="flex items-center space-x-2">
                    <span className={cn(item.current ? "text-zinc-900" : "text-zinc-500")}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              // Logged in user interface
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost" 
                  size="icon"
                  className="relative text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
                <Avatar className="h-8 w-8 bg-zinc-100 text-zinc-900">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback>{user.email ? user.email.substring(0, 2).toUpperCase() : 'JD'}</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              // Logged out interface
              <div className="hidden md:flex items-center space-x-3">
                <Button asChild variant="ghost" className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100">
                  <Link href="/auth/login">Sign in</Link>
                </Button>
                <Button asChild className="bg-zinc-900 hover:bg-zinc-800 text-white">
                  <Link href="/auth/signup">Sign up</Link>
                </Button>
              </div>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden border-zinc-200 hover:bg-zinc-100 text-zinc-700">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l border-zinc-200">
                <SheetHeader className="mb-4">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                {user ? (
                  // Logged in mobile menu
                  <>
                    <nav className="grid gap-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "flex items-center space-x-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 py-2",
                            item.current && "text-zinc-900"
                          )}
                        >
                          <span className={cn(item.current ? "text-zinc-900" : "text-zinc-500")}>
                            {item.icon}
                          </span>
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-6 border-t border-zinc-200 pt-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8 bg-zinc-100 text-zinc-900">
                          <AvatarFallback>{user.email ? user.email.substring(0, 2).toUpperCase() : 'JD'}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium text-zinc-900">{user.user_metadata?.full_name || user.email}</p>
                          <p className="text-zinc-500">{user.email}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4 w-full border-zinc-200 text-zinc-900 hover:bg-zinc-100">
                        Sign out
                      </Button>
                    </div>
                  </>
                ) : (
                  // Logged out mobile menu
                  <>
                    <nav className="grid gap-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "flex items-center space-x-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 py-2",
                            item.current && "text-zinc-900"
                          )}
                        >
                          <span className={cn(item.current ? "text-zinc-900" : "text-zinc-500")}>
                            {item.icon}
                          </span>
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </nav>
                    <div className="grid gap-4 pt-4 mt-6 border-t border-zinc-200">
                      <Button asChild variant="outline" className="w-full border-zinc-200 text-zinc-900 hover:bg-zinc-100">
                        <Link href="/auth/login">Sign in</Link>
                      </Button>
                      <Button asChild className="w-full bg-zinc-900 hover:bg-zinc-800 text-white">
                        <Link href="/auth/signup">Sign up</Link>
                      </Button>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
} 