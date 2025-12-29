'use client';

import { useRef } from 'react';
import { CAMPUS_STATS } from '@/lib/constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CampusStats() {
    const containerRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (statsRef.current) {
            const items = Array.from(statsRef.current.children);
            gsap.from(items, {
                y: 30,
                opacity: 0,
                scale: 0.8,
                stagger: 0.1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                }
            });
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="section-padding bg-muted/50">
            <div className="container-custom">
                <div ref={statsRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {CAMPUS_STATS.map((stat, index) => (
                        <div
                            key={stat.label}
                            className="text-center group transition-transform hover:-translate-y-2 duration-300"
                        >
                            <div className="mb-2 flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold text-primary md:text-5xl lg:text-6xl transition-colors group-hover:text-primary/80">
                                    {stat.value}
                                </span>
                                {stat.unit && (
                                    <span className="text-lg font-medium text-muted-foreground md:text-xl">
                                        {stat.unit}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                                {stat.label}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
