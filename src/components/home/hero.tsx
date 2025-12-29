'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, CreditCard, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SCHOOL_INFO } from '@/lib/constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState('0');

  useGSAP(() => {
    const numericValue = parseInt(value.replace(/\D/g, ''));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const obj = { val: 0 };
    gsap.to(obj, {
      val: numericValue,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        setDisplayValue(Math.floor(obj.val).toString());
      },
    });
  }, { scope: ref, dependencies: [value] });

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Initial Animation
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.hero-badge', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .from('.hero-heading', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    .from('.hero-desc', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    .from('.hero-btns', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    .from('.hero-stats', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    }, '-=0.4');

    // Floating Particles Animation
    const particles = particlesRef.current?.children;
    if (particles) {
      Array.from(particles).forEach((particle) => {
        gsap.to(particle, {
          y: -30,
          opacity: 0,
          scale: 1.5,
          duration: 4 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 3,
        });
      });
    }

    // Badge Pulse
    gsap.to('.badge-dot', {
      opacity: 0.4,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.badge-icon', {
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    })

  }, { scope: containerRef });

  // Mouse Parallax Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bgImageRef.current) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPos = (clientX / innerWidth - 0.5) * 20; // -10px to 10px
    const yPos = (clientY / innerHeight - 0.5) * 20;

    gsap.to(bgImageRef.current, {
      x: xPos,
      y: yPos,
      duration: 1,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-background via-background to-muted pt-20"
      aria-label="Hero section"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-primary/10 to-transparent blur-3xl animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Background Image (subtle) */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-10 dark:opacity-5"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 flex min-h-[calc(90vh-5rem)] flex-col justify-center py-16 md:py-24">
        <div ref={heroRef} className="max-w-4xl">
          {/* Badge */}
          <div className="hero-badge mb-6 inline-block">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm font-medium backdrop-blur-sm shadow-sm transition-transform hover:scale-105"
            >
              <span className="badge-icon inline-block">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              </span>
              <span className="badge-dot mr-2 h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
              Admissions Open for 2025-26
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-heading mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            <span
              className="inline-block bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
              style={{ backgroundSize: '200% auto', animation: 'shine 5s linear infinite' }}
            >
              {SCHOOL_INFO.name}
            </span>
          </h1>

          {/* Tagline */}
          <p className="hero-desc mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {SCHOOL_INFO.tagline}. Nurturing minds and building character since{' '}
            {SCHOOL_INFO.founded} on our {SCHOOL_INFO.campusSize} campus in
            Dehradun.
          </p>

          {/* CTA Buttons */}
          <div className="hero-btns mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="transition-transform hover:-translate-y-1 hover:scale-105 active:scale-95 duration-200">
              <Button asChild size="xl" className="group relative overflow-hidden">
                <Link href="/admission/form">
                  <span className="relative z-10 flex items-center">
                    Apply for Admission
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </Link>
              </Button>
            </div>
            <div className="transition-transform hover:-translate-y-1 hover:scale-105 active:scale-95 duration-200">
              <Button asChild variant="outline" size="xl" className="group">
                <Link
                  href="https://payment.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CreditCard className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                  Pay School Fee
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 flex flex-wrap gap-8">
            {[
              { value: '13', suffix: ' Acres', label: 'Campus Area' },
              { value: '1972', suffix: '', label: 'Established' },
              { value: 'N-XII', suffix: '', label: 'Classes' },
              { value: 'CISCE', suffix: '', label: 'Affiliated' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="hero-stats group cursor-default transition-transform hover:-translate-y-1"
              >
                <p className="text-3xl font-bold text-foreground transition-colors group-hover:text-primary md:text-4xl">
                  {stat.value.match(/^\d+$/) ? (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  ) : (
                    stat.value + stat.suffix
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Static bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          className="h-16 w-full fill-background md:h-24"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </section>
  );
}
