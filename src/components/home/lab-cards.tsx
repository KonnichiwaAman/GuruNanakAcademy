'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { LABS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function LabCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pin and Scroll Horizontal
    // Only on larger screens
    if (window.innerWidth >= 1024) {
      const scrollWidth = containerRef.current!.scrollWidth - containerRef.current!.clientWidth;

      gsap.to(containerRef.current, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          end: `+=${scrollWidth}`,
          anticipatePin: 1,
        },
      });
    } else {
        // Simple reveal on mobile
        gsap.from(containerRef.current?.children || [], {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: triggerRef.current,
                start: 'top 80%',
            }
        });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
      aria-labelledby="labs-heading"
    >
      <div ref={triggerRef} className="section-padding flex min-h-screen flex-col justify-center">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />

        <div className="container-custom mb-12 md:mb-20">
          <div className="text-center">
            <span className="inline-block text-sm font-medium uppercase tracking-wider text-primary">
              State-of-the-Art Facilities
            </span>
            <h2
              id="labs-heading"
              className="mt-3 text-heading-xl font-bold text-foreground md:text-display"
            >
              Our Laboratories
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Equipped with modern facilities and the latest technology to provide
              students with hands-on learning experiences.
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Container (Desktop) / Grid (Mobile) */}
        <div className="container-custom lg:max-w-none lg:px-0">
            <div
                ref={containerRef}
                className="flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:gap-10 lg:pl-[max(2rem,calc((100vw-80rem)/2))]"
            >
            {LABS.map((lab, index) => {
                const Icon = lab.icon;
                return (
                <div
                    key={lab.id}
                    className="min-w-0 sm:min-w-0 lg:min-w-[400px] lg:flex-shrink-0 xl:min-w-[500px]"
                >
                    <Link
                    href={`/facilities#${lab.id}`}
                    className={cn(
                        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card p-6 md:p-8',
                        'transition-all duration-500',
                        'hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    )}
                    >
                    {/* Hover gradient overlay */}
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                    />

                    {/* Animated border glow */}
                    <div
                        className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                        style={{ zIndex: -1 }}
                    />

                    {/* Icon */}
                    <div
                        className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    >
                        <div
                        className="absolute inset-0 rounded-xl bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                        <Icon className="relative z-10 h-7 w-7 transition-colors duration-300 group-hover:text-primary-foreground" aria-hidden="true" />
                    </div>

                    {/* Title */}
                    <h3 className="mb-4 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary md:text-2xl">
                        {lab.shortTitle}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 flex-1 text-base leading-relaxed text-muted-foreground line-clamp-4">
                        {lab.fullDescription || lab.description}
                    </p>

                    {/* Features List (Added for extra content in horizontal view) */}
                    <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                        {lab.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Link indicator */}
                    <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                        <span>Explore Lab</span>
                        <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </div>
                    </Link>
                </div>
                );
            })}
            {/* Spacer for horizontal scroll end */}
            <div className="hidden lg:block lg:w-24 lg:flex-shrink-0" />
            </div>
        </div>
      </div>
    </section>
  );
}
