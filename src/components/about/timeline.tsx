'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: '1972',
    title: 'Foundation',
    description:
      'Guru Nanak Academy was founded by Guru Nanak Academy Society on the 500th birth anniversary of Shri Guru Nanak Dev Ji.',
  },
  {
    year: '1980s',
    title: 'Growth & Development',
    description:
      'The school expanded its facilities and curriculum, establishing itself as a premier educational institution in Dehradun.',
  },
  {
    year: '1990s',
    title: 'CISCE Affiliation',
    description:
      'Achieved affiliation with the Council for the Indian School Certificate Examinations (CISCE), New Delhi.',
  },
  {
    year: '2000s',
    title: 'Infrastructure Expansion',
    description:
      'Major infrastructure development including new laboratories, library expansion, and sports facilities.',
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description:
      'Adapted to modern educational needs with digital classrooms and online learning capabilities.',
  },
  {
    year: '2023',
    title: 'Boarding Facility Launch',
    description:
      'Introduced boarding school facility for boys from class V onwards and expanded day-boarding services.',
  },
  {
    year: 'Present',
    title: 'Continuing Excellence',
    description:
      'Continuing to provide holistic education with new subject options including Psychology, Physical Education, and Fine Arts.',
  },
];

export function Timeline() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Animation
    gsap.from('.header-element', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
        }
    });

    // Timeline Progress Line
    gsap.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
        }
    });

    // Timeline Items Animation
    if (itemsRef.current) {
        const items = Array.from(itemsRef.current.children);
        items.forEach((item, index) => {
            const isEven = index % 2 === 0;
            const content = item.querySelector('.timeline-content');
            const dot = item.querySelector('.timeline-dot');

            // Dot scale in
            gsap.from(dot, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                }
            });

            // Content slide in
            gsap.from(content, {
                x: isEven ? -50 : 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                }
            });
        });
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-padding bg-muted/50" aria-labelledby="timeline-heading">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span
            className="header-element block text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            Our Journey
          </span>
          <h2
            id="timeline-heading"
            className="header-element mt-2 text-heading-xl font-bold text-foreground md:text-display"
          >
            Timeline of Excellence
          </h2>
        </div>

        <div className="relative">
          {/* Background Line (static) */}
          <div
            className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          {/* Animated Progress Line */}
          <div
            ref={lineRef}
            className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-primary via-primary to-primary/50 md:left-1/2 md:-translate-x-1/2 h-0"
            aria-hidden="true"
          />

          {/* Timeline Items */}
          <div ref={itemsRef} className="space-y-8 md:space-y-12">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Animated Dot */}
                  <div
                    className="timeline-dot absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2"
                  >
                    <div className="relative">
                      <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--background))]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`timeline-content ml-10 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
                  >
                    <div
                      className={`rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-lg hover:-translate-y-1 ${isEven ? 'md:ml-auto' : ''
                        } md:max-w-md`}
                    >
                      <span
                        className="inline-block rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground"
                      >
                        {item.year}
                      </span>
                      <h3 className="mt-3 text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
