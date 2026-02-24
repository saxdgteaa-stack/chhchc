'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Church, 
  Menu, 
  Home, 
  Calendar, 
  Heart, 
  Info, 
  Phone,
  LogIn 
} from 'lucide-react';
import { mockChurchInfo } from '@/lib/mock/data';

const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: Info },
  { href: '#events', label: 'Events', icon: Calendar },
  { href: '#give', label: 'Give', icon: Heart },
  { href: '#contact', label: 'Contact', icon: Phone },
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="#home" className="flex items-center gap-2">
          <Church className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight">{mockChurchInfo.name}</span>
            <span className="text-xs text-muted-foreground hidden sm:block">{mockChurchInfo.tagline}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/?view=login">
            <Button size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              <hr className="my-4" />
              <Link href="/?view=login">
                <Button className="w-full">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
