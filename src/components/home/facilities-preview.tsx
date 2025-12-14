'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { FACILITIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

// Premium easing
const premiumEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
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

export function FacilitiesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-background"
      aria-labelledby="facilities-heading"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

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
            World-Class Amenities
          </motion.span>
          <motion.h2
            id="facilities-heading"
            variants={headerVariants}
            className="mt-3 text-heading-xl font-bold text-foreground md:text-display"
          >
            Our Facilities
          </motion.h2>
          <motion.div
            variants={headerVariants}
            className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          <motion.p
            variants={headerVariants}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Providing a nurturing environment with modern facilities to support
            holistic development of every student.
          </motion.p>
        </motion.div>

        {/* Facilities Grid with premium hover effects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {FACILITIES.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={facility.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
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
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-primary/10 transition-transform duration-700 group-hover:scale-[3]"
                  />

                  {/* Icon with premium animation */}
                  <motion.div
                    className="relative z-10 mb-4 md:mb-6 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl md:rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-6 w-6 md:h-8 md:w-8" aria-hidden="true" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="relative z-10 mb-2 md:mb-4 text-lg md:text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {facility.title}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 mb-3 md:mb-5 text-sm md:text-base text-muted-foreground">
                    {facility.description}
                  </p>

                  {/* Highlights with staggered animation */}
                  <ul className="relative z-10 mb-4 md:mb-6 flex-1 space-y-2 md:space-y-3">
                    {facility.highlights.slice(0, 3).map((highlight, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                        </span>
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Premium link indicator */}
                  <motion.div
                    className="relative z-10 flex items-center text-sm font-medium text-primary"
                    whileHover={{ x: 5 }}
                  >
                    <span>View More</span>
                    <motion.span
                      className="ml-1"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
