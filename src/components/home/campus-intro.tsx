'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CampusIntro() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Content Reveal
    gsap.from(contentRef.current?.children || [], {
      y: 30,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Underline Animation
    gsap.fromTo('.underline-path',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.underline-path',
          start: 'top 80%',
        },
      }
    );

    // Wave Animation
    gsap.to('.wave-path', {
      attr: { d: 'M0,50 C480,10 960,70 1440,30 L1440,80 L0,80 Z' },
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-muted py-24 md:py-32"
      aria-labelledby="campus-heading"
    >

      {/* Content */}
      <div className="container-custom relative z-10">
        <div ref={contentRef} className="mx-auto max-w-3xl text-center">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary transition-transform hover:scale-105">
              <Sparkles className="h-4 w-4" />
              Campus Information
              <Sparkles className="h-4 w-4" />
            </span>
          </div>

          <h2
            id="campus-heading"
            className="mt-4 text-heading-xl font-bold text-foreground md:text-display lg:text-display-lg"
          >
            A Campus Built for{' '}
            <span className="relative inline-block bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Excellence
              <span
                className="underline-path absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-primary/30"
              />
            </span>
          </h2>

          <div className="mt-8 space-y-5 text-lg text-muted-foreground">
            <p>
              Our school boasts of a state-of-the-art infrastructure, with modern
              facilities that meet the highest standards of education and comfort.
              The design is not only visually appealing but also environment
              friendly, incorporating green spaces and sustainable practices.
            </p>
            <p>
              Each classroom and laboratory is well-equipped with the latest
              educational tools and resources, ensuring an engaging and interactive
              learning environment for students across all grades and disciplines.
            </p>
          </div>

          <div className="mt-10">
            <div className="inline-block transition-transform hover:-translate-y-1 hover:scale-105 active:scale-95">
              <Button
                asChild
                size="lg"
                className="group shadow-soft-lg"
              >
                <Link href="/admission/form">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium wave divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          className="h-12 w-full fill-background md:h-20"
          preserveAspectRatio="none"
        >
          <path
            className="wave-path"
            d="M0,30 C480,80 960,0 1440,40 L1440,80 L0,80 Z"
          />
        </svg>
      </div>
    </section>
  );
}
