'use client';

import { useRef } from 'react';
import { Target, Eye, Heart } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To impart liberal and balanced education according to the current needs of society, inspiring students to respect and follow the rich cultural heritage of India while preparing them for global challenges.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To be a leading institution that nurtures intellectually curious, socially responsible, and morally upright citizens who contribute positively to society and uphold the values of truthful living.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description:
      'Character building, discipline, spirit-de-corps, holistic development, empathy, fair play, and honesty. We believe in divinity, service to society, and cultivating a grateful heart.',
  },
];

export function MissionVision() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header
    gsap.from(headerRef.current?.children || [], {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });

    // Cards
    if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 85%',
            }
        });
    }

    // Values Grid
    if (valuesRef.current) {
        gsap.from(valuesRef.current.querySelectorAll('.value-item'), {
            scale: 0.8,
            opacity: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: 'back.out(1.5)',
            scrollTrigger: {
                trigger: valuesRef.current,
                start: 'top 85%',
            }
        });
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-padding bg-background" aria-labelledby="mission-heading">
      <div className="container-custom">
        <div ref={headerRef} className="mb-12 text-center">
          <span
            className="block text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            What Drives Us
          </span>
          <h2
            id="mission-heading"
            className="mt-2 text-heading-xl font-bold text-foreground md:text-display"
          >
            Mission, Vision & Values
          </h2>
        </div>

        <div ref={cardsRef} className="grid gap-8 md:grid-cols-3">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-8 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform duration-500 hover:scale-110 hover:rotate-3">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Core Values Grid */}
        <div ref={valuesRef} className="mt-16">
          <h3 className="mb-8 text-center text-heading-lg font-semibold text-foreground">
            What We Strive to Imbibe
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
            {[
              'Character Building',
              'Discipline',
              'Spirit de Corps',
              'Holistic Development',
              'Empathy',
              'Fair Play',
              'Honesty',
              'Service',
            ].map((value, index) => (
              <div
                key={value}
                className="value-item rounded-xl border border-border bg-muted/50 p-4 text-center transition-all hover:bg-primary/5 hover:border-primary/20"
              >
                <span className="text-sm font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
