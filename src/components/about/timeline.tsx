'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';

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

// Individual timeline item component with its own scroll-based animation
function TimelineItem({ item, index }: { item: typeof timelineData[0]; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={itemRef}
      className={`relative flex items-start gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
    >
      {/* Animated Dot */}
      <motion.div
        className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          type: 'spring',
          stiffness: 200,
        }}
      >
        <div className="relative">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <motion.div
            className="absolute inset-0 rounded-full bg-primary"
            animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className={`ml-10 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'
          }`}
        initial={{
          opacity: 0,
          x: isEven ? -50 : 50,
          y: 20,
        }}
        animate={isInView ? {
          opacity: 1,
          x: 0,
          y: 0,
        } : {}}
        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        <motion.div
          className={`rounded-2xl border border-border bg-card p-6 shadow-soft ${isEven ? 'md:ml-auto' : ''
            } md:max-w-md`}
          whileHover={{
            y: -5,
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.15)',
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.span
            className="inline-block rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground"
            whileHover={{ scale: 1.05 }}
          >
            {item.year}
          </motion.span>
          <h3 className="mt-3 text-lg font-semibold text-foreground">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {item.description}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth progress for the timeline line
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to line height
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="section-padding bg-muted/50" aria-labelledby="timeline-heading">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            Our Journey
          </motion.span>
          <motion.h2
            id="timeline-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-heading-xl font-bold text-foreground md:text-display"
          >
            Timeline of Excellence
          </motion.h2>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Background Line (static) */}
          <div
            className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          {/* Animated Progress Line */}
          <motion.div
            className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-primary via-primary to-primary/50 md:left-1/2 md:-translate-x-1/2"
            style={{ height: lineHeight }}
            aria-hidden="true"
          />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
