'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

// Premium easing
const premiumEase = [0.16, 1, 0.3, 1];

export function CampusIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });


  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-muted py-24 md:py-32"
      aria-labelledby="campus-heading"
    >

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, ease: premiumEase }}
          >
            <motion.span
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-4 w-4" />
              Campus Information
              <Sparkles className="h-4 w-4" />
            </motion.span>
          </motion.div>

          <motion.h2
            id="campus-heading"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
            className="mt-4 text-heading-xl font-bold text-foreground md:text-display lg:text-display-lg"
          >
            A Campus Built for{' '}
            <motion.span
              className="relative inline-block bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Excellence
              <motion.span
                className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-primary/30"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
            className="mt-8 space-y-5 text-lg text-muted-foreground"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: premiumEase }}
            className="mt-10"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                size="lg"
                className="group shadow-soft-lg"
              >
                <Link href="/admission/form">
                  Apply Now
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Premium wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          className="h-12 w-full fill-background md:h-20"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,30 C480,80 960,0 1440,40 L1440,80 L0,80 Z"
            animate={{
              d: [
                'M0,30 C480,80 960,0 1440,40 L1440,80 L0,80 Z',
                'M0,50 C480,10 960,70 1440,30 L1440,80 L0,80 Z',
                'M0,30 C480,80 960,0 1440,40 L1440,80 L0,80 Z',
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </section>
  );
}
