'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LABS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

// Premium easing
const premiumEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

export function LabCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-background"
      aria-labelledby="labs-heading"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

      <div className="container-custom relative">
        {/* Section Header with premium animations */}
        <motion.div
          className="mb-8 md:mb-16 text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <motion.span
            variants={headerVariants}
            className="inline-block text-sm font-medium uppercase tracking-wider text-primary"
          >
            State-of-the-Art Facilities
          </motion.span>
          <motion.h2
            id="labs-heading"
            variants={headerVariants}
            className="mt-3 text-heading-xl font-bold text-foreground md:text-display"
          >
            Our Laboratories
          </motion.h2>
          <motion.div
            variants={headerVariants}
            className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          <motion.p
            variants={headerVariants}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Equipped with modern facilities and the latest technology to provide
            students with hands-on learning experiences.
          </motion.p>
        </motion.div>

        {/* Lab Cards Grid with premium hover effects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {LABS.map((lab) => {
            const Icon = lab.icon;
            return (
              <motion.div key={lab.id} variants={itemVariants}>
                <Link
                  href={`/facilities#${lab.id}`}
                  className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-xl md:rounded-2xl border border-border/50 bg-card p-4 md:p-6',
                    'transition-all duration-500',
                    'hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  )}
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* Animated border glow */}
                  <motion.div
                    className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
                    style={{ zIndex: -1 }}
                  />

                  {/* Icon with premium animation */}
                  <motion.div
                    className="relative mb-3 md:mb-5 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-lg md:rounded-xl bg-primary/10 text-primary"
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <Icon className="relative z-10 h-5 w-5 md:h-7 md:w-7 transition-colors duration-300 group-hover:text-primary-foreground" aria-hidden="true" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="mb-2 md:mb-3 text-base md:text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {lab.shortTitle}
                  </h3>

                  {/* Description */}
                  <p className="mb-3 md:mb-5 flex-1 text-xs md:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {lab.description}
                  </p>

                  {/* Link indicator */}
                  <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    <span>Learn more</span>
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
