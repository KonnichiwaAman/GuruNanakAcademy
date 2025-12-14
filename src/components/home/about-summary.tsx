'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SCHOOL_INFO } from '@/lib/constants';
import { useRef } from 'react';

// Premium easing
const premiumEase = [0.16, 1, 0.3, 1];

export function AboutSummary() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const statsY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section 
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-muted/30" 
      aria-labelledby="about-heading"
    >
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-1/2 w-1/3 bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="absolute bottom-0 right-0 h-1/2 w-1/3 bg-gradient-to-tl from-primary/5 to-transparent" />
      
      <div className="container-custom relative">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image with premium parallax and effects */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: premiumEase }}
            className="relative"
          >
            <motion.div 
              className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl"
              style={{ y: imageY }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              {/* Image glow effect */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
              
              <Image
                src="/images/about.png"
                alt="Guru Nanak Academy campus building"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Premium overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </motion.div>
            
            {/* Floating Stats Card with premium glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: premiumEase }}
              style={{ y: statsY }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
              className="absolute -bottom-8 -right-4 rounded-2xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-xl md:-right-8 md:p-10"
            >
              <motion.p 
                className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
                animate={{ 
                  backgroundPosition: ['0% center', '100% center', '0% center'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              >
                50+
              </motion.p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                Years of Excellence
              </p>
              
              {/* Decorative accent */}
              <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-primary/80" />
            </motion.div>
            
            {/* Decorative floating elements */}
            <motion.div
              className="absolute -left-4 top-1/4 h-20 w-20 rounded-full border border-primary/20 bg-primary/5"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* Content with staggered reveal */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: premiumEase }}
          >
            <motion.span 
              className="inline-block text-sm font-medium uppercase tracking-wider text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              About Us
            </motion.span>
            
            <motion.h2
              id="about-heading"
              className="mt-3 text-heading-xl font-bold text-foreground md:text-display"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Nurturing Excellence{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Since 1972
              </span>
            </motion.h2>

            <motion.div 
              className="mt-8 space-y-5 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-lg leading-relaxed">
                {SCHOOL_INFO.name} is one of the finest co-educational boarding
                and day-boarding Schools in India with a strong intellectual
                heart-beat. The Academy is set up on a sprawling campus of{' '}
                <span className="font-semibold text-foreground">{SCHOOL_INFO.campusSize}</span> in the heart of Dehradun.
              </p>
              <p className="leading-relaxed">
                Founded by Guru Nanak Academy Society in{' '}
                <span className="font-semibold text-foreground">{SCHOOL_INFO.founded}</span> on
                the occasion of the 500th birth anniversary of Shri Guru Nanak Dev
                Ji, who stood for truthful living and equality of all religions,
                caste and creed.
              </p>
              <p className="leading-relaxed">
                The Academy caters to the academic, emotional, social,
                psychological and co-curricular needs of students from Nursery to
                Class XII, affiliated to{' '}
                <span className="font-semibold text-foreground">{SCHOOL_INFO.affiliation}</span>.
              </p>
            </motion.div>

            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild size="lg" className="group shadow-lg shadow-primary/20">
                  <Link href="/about">
                    Learn More About Us
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
