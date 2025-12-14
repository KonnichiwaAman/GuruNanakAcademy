'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To impart liberal and balanced education according to the current needs of society, inspiring students to respect and follow the rich cultural heritage of India while preparing them for global challenges.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To be a leading institution that nurtures intellectually curious, socially responsible, and morally upright citizens who contribute positively to society and uphold the values of truthful living.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description:
      'Character building, discipline, spirit-de-corps, holistic development, empathy, fair play, and honesty. We believe in divinity, service to society, and cultivating a grateful heart.',
  },
];

export function MissionVision() {
  return (
    <section className="section-padding bg-background" aria-labelledby="mission-heading">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            What Drives Us
          </motion.span>
          <motion.h2
            id="mission-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-heading-xl font-bold text-foreground md:text-display"
          >
            Mission, Vision & Values
          </motion.h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="rounded-2xl border border-border bg-card p-8 text-center"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Core Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="mb-8 text-center text-heading-lg font-semibold text-foreground">
            What We Strive to Imbibe
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
            {[
              'Character Building',
              'Discipline',
              'Spirit de Corps',
              'Holistic Development',
              'Empathy',
              'Fair Play',
              'Honesty',
              'Service',
            ].map((value, index) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl border border-border bg-muted/50 p-4 text-center"
              >
                <span className="text-sm font-medium text-foreground">{value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
