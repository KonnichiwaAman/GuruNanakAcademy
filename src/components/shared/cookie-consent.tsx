'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRef } from 'react';
import { X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      // Delay showing the banner
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useGSAP(() => {
    if (isVisible && bannerRef.current) {
        gsap.fromTo(bannerRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.2)' }
        );
    }
  }, [isVisible]);

  const handleClose = () => {
    if (bannerRef.current) {
        gsap.to(bannerRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => setIsVisible(false)
        });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    handleClose();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    handleClose();
  };

  if (!isVisible && !bannerRef.current) return null;

  return (
    <div
        ref={bannerRef}
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:bottom-4 md:left-4 md:right-auto md:max-w-md ${!isVisible ? 'invisible' : ''}`}
        role="dialog"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-description"
    >
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft-xl">
        {/* Close button */}
        <button
            onClick={handleDecline}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            aria-label="Close cookie notice"
        >
            <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="mb-4 flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Cookie className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
            <h3
                id="cookie-title"
                className="text-base font-semibold text-foreground"
            >
                Cookie Notice
            </h3>
            <p
                id="cookie-description"
                className="mt-1 text-sm text-muted-foreground"
            >
                We use cookies to enhance your experience. By continuing to
                visit this site you agree to our use of cookies.{' '}
                <Link
                href="/privacy"
                className="text-primary underline-offset-4 hover:underline"
                >
                Learn more
                </Link>
            </p>
            </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
            <Button onClick={handleAccept} className="flex-1">
            Accept
            </Button>
            <Button variant="outline" onClick={handleDecline} className="flex-1">
            Decline
            </Button>
        </div>
        </div>
    </div>
  );
}
