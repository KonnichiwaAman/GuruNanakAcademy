'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { LEADERSHIP } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LONG_MESSAGES = {
  Chairman: {
    text: [
      "It is an honour for me to be the Chairman of Guru Nanak Academy. Leading this institution is a challenge, which I relish. We have a talented, dedicated and caring teaching faculty. Each of them works very hard to ensure that the abilities of the children in our care is nurtured.",
      "Our priority is to provide a broad, well-balanced and relevant curriculum. We encourage positive attitude and good behaviour among children. We believe in the notion that every child has the right to study in a calm, safe and secure environment.",
      "We assure you that we would leave no stone unturned in building your child's future."
    ]
  },
  Principal: {
    text: [
      "At Guru Nanak Academy, we aim at character building, social service and empathy besides academic excellence thereby providing a holistic and inclusive education.",
      "Every effort is being made to promote self-motivated, disciplined and intellectually aware students who lead a healthy life style supported by a nurturing and safe environment."
    ]
  },
  'School Consultant': {
    text: [
      "Keeping in view the rapidly changing environment, we at Guru Nanak Academy wish to empower our students with life skills, scholastic knowledge and values both social and cultural.",
      "The school keeps on evolving in a dynamic manner, moulding itself according to the needs of the young. New subject options have also been added including Psychology, Physical Education and Fine Arts."
    ]
  }
};

export function LeadershipSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Animation
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

    // List Animation
    if (listRef.current) {
        const items = Array.from(listRef.current.children);
        items.forEach((item, index) => {
            gsap.from(item, {
                y: 40,
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
    <section ref={containerRef} className="section-padding bg-background" aria-labelledby="leadership-heading">
      <div className="container-custom">
        <div ref={headerRef} className="mb-12 text-center">
          <span
            className="block text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            Meet Our Leaders
          </span>
          <h2
            id="leadership-heading"
            className="mt-2 text-heading-xl font-bold text-foreground md:text-display"
          >
            School Leadership
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            Visionaries guiding our institution towards excellence in education and character building.
          </p>
        </div>

        <div ref={listRef} className="flex flex-col gap-8">
          {LEADERSHIP.map((leader, index) => {
            const longMessage = LONG_MESSAGES[leader.role as keyof typeof LONG_MESSAGES];
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={leader.name}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300"
                )}
              >
                <div className={cn(
                  "flex flex-col md:flex-row items-center",
                  isReverse ? "md:flex-row-reverse" : ""
                )}>
                  {/* Image Container */}
                  <div className="relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto md:self-stretch bg-muted overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col w-full md:w-3/5 p-8 md:p-12">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                        {leader.name}
                      </h3>
                      <p className="text-primary font-medium text-lg mt-1">{leader.role}</p>
                    </div>

                    <div className="text-muted-foreground text-lg leading-relaxed">
                      <Quote className="h-6 w-6 text-primary/20 mb-3" />
                      {longMessage ? (
                        <div className="space-y-4">
                          {longMessage.text.map((paragraph, i) => (
                            <p key={i}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p>{leader.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
