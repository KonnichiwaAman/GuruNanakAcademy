'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SAMPLE_EVENTS } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
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

export function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const featuredEvents = SAMPLE_EVENTS.filter((e) => e.featured).slice(0, 3);

  return (
    <section 
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-muted/30" 
      aria-labelledby="events-heading"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container-custom relative">
        {/* Section Header with premium animations */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: premiumEase }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-4 w-4" />
              School Life
            </motion.span>
            <h2
              id="events-heading"
              className="mt-3 text-heading-xl font-bold text-foreground md:text-display"
            >
              Latest Events
            </h2>
            <motion.div
              className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/50"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ originX: 0 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
          >
            <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild variant="outline" className="group">
                <Link href="/events">
                  View All Events
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Events Grid with premium effects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredEvents.map((event, index) => (
            <motion.article 
              key={event.id} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
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
                {/* Image with premium hover effect */}
                <div className="relative aspect-video overflow-hidden">
                  <motion.div
                    className="h-full w-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={event.image || '/images/events/placeholder.jpg'}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                  
                  {/* Premium gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Category Badge with animation */}
                  <motion.div
                    className="absolute left-4 top-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge
                      variant="secondary"
                      className="backdrop-blur-sm"
                    >
                      {event.category}
                    </Badge>
                  </motion.div>
                  
                  {/* Hover reveal date */}
                  <motion.div
                    className="absolute bottom-4 left-4 flex items-center gap-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <Calendar className="h-4 w-4" />
                    <time dateTime={event.date} className="text-sm font-medium">
                      {formatDate(event.date)}
                    </time>
                  </motion.div>
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

                  {/* Premium Read More link */}
                  <motion.div 
                    className="mt-5 flex items-center text-sm font-medium text-primary"
                    whileHover={{ x: 5 }}
                  >
                    <span>Read More</span>
                    <motion.span
                      className="ml-1"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </motion.span>
                  </motion.div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
