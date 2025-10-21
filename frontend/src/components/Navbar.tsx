'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Hide navbar on dashboard pages
  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <header className="relative z-20">
      <nav className="px-6 py-4 bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-foreground text-xl md:text-2xl font-bold">SaaSify</span>
          </Link>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-foreground/80 hover:text-foreground transition-colors">Features</Link>
            <Link href="/pricing" className="text-foreground/80 hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/auth/login" className="text-foreground/80 hover:text-foreground transition-colors">Sign In</Link>
            <Link href="/auth/signup" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">Get Started</Link>
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Open menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 bg-white/10 text-foreground"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background/90 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-foreground text-xl font-bold">SaaSify</span>
              </div>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 bg-white/10 text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/features" onClick={() => setOpen(false)} className="text-foreground/90 hover:text-foreground transition-colors">Features</Link>
              <Link href="/pricing" onClick={() => setOpen(false)} className="text-foreground/90 hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/auth/login" onClick={() => setOpen(false)} className="text-foreground/90 hover:text-foreground transition-colors">Sign In</Link>
              <Link href="/auth/signup" onClick={() => setOpen(false)} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-medium text-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg">Get Started</Link>
              <div className="pt-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


