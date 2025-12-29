'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SAMPLE_EVENTS } from '@/lib/constants';
import { formatDate, cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function EventsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const featuredEvents = SAMPLE_EVENTS.filter((e) => e.featured).slice(0, 3);

  useGSAP(() => {
    // Header Animation
    gsap.from(headerRef.current?.children || [], {
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Decorative Line
    gsap.fromTo('.header-line',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    // Cards Grid Animation
    gsap.from(gridRef.current?.children || [], {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.2)',
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
      className="section-padding relative overflow-hidden bg-muted/30" 
      aria-labelledby="events-heading"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div ref={headerRef}>
            <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary transition-transform hover:scale-105">
              <Sparkles className="h-4 w-4" />
              School Life
            </span>
            <h2
              id="events-heading"
              className="mt-3 text-heading-xl font-bold text-foreground md:text-display"
            >
              Latest Events
            </h2>
            <div
              className="header-line mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/50 origin-left"
            />
          </div>

          <div className="opacity-0 animate-in fade-in slide-in-from-right-8 duration-700 delay-300 fill-mode-forwards">
            <div className="transition-transform hover:scale-105 active:scale-95">
              <Button asChild variant="outline" className="group">
                <Link href="/events">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div
          ref={gridRef}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredEvents.map((event) => (
            <article
              key={event.id} 
              className="transition-transform duration-300 hover:-translate-y-2"
            >
              <Link
                href={`/events/${event.slug}`}
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/50 bg-card',
                  'transition-all duration-500',
                  'hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                )}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 group-hover:scale-110">
                    <Image
                      src={event.image || '/images/events/placeholder.jpg'}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  
                  {/* Premium gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                  
                  {/* Category Badge */}
                  <div className="absolute left-4 top-4 transition-transform duration-300 group-hover:scale-105">
                    <Badge variant="secondary" className="backdrop-blur-sm">
                      {event.category}
                    </Badge>
                  </div>
                  
                  {/* Hover reveal date */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={event.date} className="text-sm font-medium">
                      {formatDate(event.date)}
                    </time>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Date for mobile */}
                  <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground lg:hidden">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={event.date}>
                      {formatDate(event.date)}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-lg font-semibold text-foreground line-clamp-2 transition-colors duration-300 group-hover:text-primary">
                    {event.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {event.excerpt}
                  </p>

                  {/* Read More link */}
                  <div className="mt-5 flex items-center text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
                    <span>Read More</span>
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
