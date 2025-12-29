'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { FACILITIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FacilitiesPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Animation
    gsap.from(headerRef.current?.children || [], {
      y: 30,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Grid Animation
    gsap.from(gridRef.current?.children || [], {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-background"
      aria-labelledby="facilities-heading"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <div ref={headerRef} className="mb-8 md:mb-16 text-center">
          <span className="inline-block text-sm font-medium uppercase tracking-wider text-primary">
            World-Class Amenities
          </span>
          <h2
            id="facilities-heading"
            className="mt-3 text-heading-xl font-bold text-foreground md:text-display"
          >
            Our Facilities
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Providing a nurturing environment with modern facilities to support
            holistic development of every student.
          </p>
        </div>

        {/* Facilities Grid */}
        <div
          ref={gridRef}
          className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {FACILITIES.map((facility) => {
            const Icon = facility.icon;
            return (
              <div
                key={facility.id}
                className="transition-transform duration-300 hover:-translate-y-2"
              >
                <Link
                  href={facility.href}
                  className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-2xl md:rounded-3xl border border-border/50 bg-card p-5 md:p-8',
                    'transition-all duration-500',
                    'hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  )}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                  {/* Animated corner accent */}
                  <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-primary/10 transition-transform duration-700 group-hover:scale-[3] pointer-events-none" />

                  {/* Icon */}
                  <div className="relative z-10 mb-4 md:mb-6 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl md:rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-6 w-6 md:h-8 md:w-8" aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 mb-2 md:mb-4 text-lg md:text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {facility.title}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 mb-3 md:mb-5 text-sm md:text-base text-muted-foreground">
                    {facility.description}
                  </p>

                  {/* Highlights */}
                  <ul className="relative z-10 mb-4 md:mb-6 flex-1 space-y-2 md:space-y-3">
                    {facility.highlights.slice(0, 3).map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Link indicator */}
                  <div className="relative z-10 flex items-center text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
                    <span>View More</span>
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
