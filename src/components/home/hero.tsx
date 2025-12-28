'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ArrowRight, CreditCard, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SCHOOL_INFO } from '@/lib/constants';
import { useEffect, useRef, useState } from 'react';

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const numericValue = parseInt(value.replace(/\D/g, ''));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += numericValue / steps;
      if (current >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current).toString());
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

// Floating particle component
function FloatingParticle({ delay, duration, x, y }: { delay: number; duration: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute h-1 w-1 rounded-full bg-primary/30"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Subtle parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / 50);
    mouseY.set((e.clientY - centerY) / 50);
  };

  // Generate floating particles (reduced for performance)
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6 + i * 0.1,
        ease: 'backOut',
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-background via-background to-muted pt-20"
      aria-label="Hero section"
    >
      {/* Animated gradient orbs - simplified for performance */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-primary/10 to-transparent blur-3xl animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0" aria-hidden="true">
        {particles.map((particle) => (
          <FloatingParticle key={particle.id} {...particle} />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden="true" />

      {/* Background Image (subtle) */}
      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ x, y }}
      >
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-10 dark:opacity-5"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </motion.div>

      {/* Content */}
      <div className="container-custom relative z-10 flex min-h-[calc(90vh-5rem)] flex-col justify-center py-16 md:py-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(var(--primary), 0.2)' }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              </motion.span>
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              Admissions Open for 2025-26
            </motion.span>
          </motion.div>

          {/* Main Heading with letter animation */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {SCHOOL_INFO.name}
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            {SCHOOL_INFO.tagline}. Nurturing minds and building character since{' '}
            {SCHOOL_INFO.founded} on our {SCHOOL_INFO.campusSize} campus in
            Dehradun.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Button asChild size="xl" className="group relative overflow-hidden">
                <Link href="/admission/form">
                  <span className="relative z-10 flex items-center">
                    Apply for Admission
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Button asChild variant="outline" size="xl" className="group">
                <Link
                  href="https://payment.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CreditCard className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                  Pay School Fee
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Quick Stats with animated counters */}
          <div className="mt-12 flex flex-wrap gap-8">
            {[
              { value: '13', suffix: ' Acres', label: 'Campus Area' },
              { value: '1972', suffix: '', label: 'Established' },
              { value: 'N-XII', suffix: '', label: 'Classes' },
              { value: 'CISCE', suffix: '', label: 'Affiliated' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={statVariants}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group cursor-default"
              >
                <p className="text-3xl font-bold text-foreground transition-colors group-hover:text-primary md:text-4xl">
                  {stat.value.match(/^\d+$/) ? (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  ) : (
                    stat.value + stat.suffix
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Static bottom wave - no animation for performance */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          className="h-16 w-full fill-background md:h-24"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
