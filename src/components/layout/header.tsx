'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SCHOOL_INFO } from '@/lib/constants';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  // Handle scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useGSAP(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    } else {
        // We can't easily animate exit here without AnimatePresence equivalent or keeping it mounted.
        // For simplicity with conditionally rendered standard React, we just let it unmount or rely on CSS.
        // But since we are rendering it conditionally `{isMobileMenuOpen && ...}`, we can't animate out easily with just GSAP inside useEffect without extra state.
        // A common pattern is to keep it mounted and toggle class/styles, OR use a library.
        // Here, we will just use a simple transition for opening.
        // To fix exit animation properly without framer-motion's AnimatePresence, we'd need to delay unmount.
        // For now, instantaneous close is acceptable or we can use CSS transition on a persistent element.
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 shadow-soft backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <nav
        className="container-custom"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"
            aria-label={`${SCHOOL_INFO.name} - Home`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg font-bold leading-tight">
                {SCHOOL_INFO.shortName}
              </span>
              <span className="block text-xs text-muted-foreground">
                Est. {SCHOOL_INFO.founded}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                )}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side - Theme toggle & Mobile menu button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="overflow-hidden border-t border-border bg-background lg:hidden"
        >
          <div className="container-custom py-4">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-4 py-3 text-base font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/70 hover:bg-accent hover:text-foreground'
                  )}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* CTA Buttons in Mobile */}
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                <Button asChild>
                  <Link href="/admission/form" onClick={() => setIsMobileMenuOpen(false)}>Apply for Admission</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link
                    href="https://payment.example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pay School Fee
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
