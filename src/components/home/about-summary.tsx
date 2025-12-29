'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SCHOOL_INFO } from '@/lib/constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutSummary() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Image Parallax
    gsap.to(imageRef.current, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Stats Parallax (Counter movement)
    gsap.to(statsRef.current, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Reveal Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(imageRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
    .from(statsRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'back.out(1.7)',
    }, '-=0.5')
    .from(contentRef.current?.children || [], {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.8');

    // Floating Decorative Element
    gsap.to('.floating-circle', {
      y: -15,
      rotate: 360,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-muted/30" 
      aria-labelledby="about-heading"
    >
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-1/2 w-1/3 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-1/2 w-1/3 bg-gradient-to-tl from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image Side */}
          <div className="relative">
            <div
              ref={imageRef}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
            >
              {/* Image glow effect */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
              
              <Image
                src="/images/about.png"
                alt="Guru Nanak Academy campus building"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Premium overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Floating Stats Card */}
            <div
              ref={statsRef}
              className="absolute -bottom-8 -right-4 rounded-2xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-xl transition-all hover:scale-105 hover:-translate-y-1 hover:shadow-primary/10 md:-right-8 md:p-10"
            >
              <p
                className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
                style={{ backgroundSize: '200% auto', animation: 'shine 4s linear infinite' }}
              >
                50+
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                Years of Excellence
              </p>
              
              {/* Decorative accent */}
              <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-primary/80" />
            </div>
            
            {/* Decorative floating elements */}
            <div
              className="floating-circle absolute -left-4 top-1/4 h-20 w-20 rounded-full border border-primary/20 bg-primary/5 pointer-events-none"
            />
          </div>

          {/* Content Side */}
          <div ref={contentRef}>
            <span className="inline-block text-sm font-medium uppercase tracking-wider text-primary">
              About Us
            </span>
            
            <h2
              id="about-heading"
              className="mt-3 text-heading-xl font-bold text-foreground md:text-display"
            >
              Nurturing Excellence{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Since 1972
              </span>
            </h2>

            <div className="mt-8 space-y-5 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                {SCHOOL_INFO.name} is one of the finest co-educational boarding
                and day-boarding Schools in India with a strong intellectual
                heart-beat. The Academy is set up on a sprawling campus of{' '}
                <span className="font-semibold text-foreground">{SCHOOL_INFO.campusSize}</span> in the heart of Dehradun.
              </p>
              <p className="leading-relaxed">
                Founded by Guru Nanak Academy Society in{' '}
                <span className="font-semibold text-foreground">{SCHOOL_INFO.founded}</span> on
                the occasion of the 500th birth anniversary of Shri Guru Nanak Dev
                Ji, who stood for truthful living and equality of all religions,
                caste and creed.
              </p>
              <p className="leading-relaxed">
                The Academy caters to the academic, emotional, social,
                psychological and co-curricular needs of students from Nursery to
                Class XII, affiliated to{' '}
                <span className="font-semibold text-foreground">{SCHOOL_INFO.affiliation}</span>.
              </p>
            </div>

            <div className="mt-10">
              <Button asChild size="lg" className="group shadow-lg shadow-primary/20 transition-all hover:translate-x-1">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
