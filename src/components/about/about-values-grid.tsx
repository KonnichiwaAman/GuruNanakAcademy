'use client';

import { motion } from 'framer-motion';
import { Heart, Award, Sparkles, HandHeart, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AboutValuesGrid() {
    return (
        <section className="py-12 md:py-20 lg:py-28 bg-muted/30">
            <div className="container-custom">
                {/* Section Header */}
                <div className="mb-8 md:mb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium uppercase tracking-wider text-muted-foreground"
                    >
                        What We Stand For
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl"
                    >
                        Our Foundation
                    </motion.h2>
                </div>

                {/* Bento Grid */}
                <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2">
                    {/* Featured Card - Core Values (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-6 md:p-10 md:row-span-2 text-primary-foreground"
                    >
                        <div className="relative z-10 flex h-full flex-col">
                            <div className="mb-auto">
                                <div className="mb-4 md:mb-8 inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl md:rounded-2xl bg-white/20">
                                    <Heart className="h-6 w-6 md:h-8 md:w-8" />
                                </div>
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-5">Core Values</h3>
                                <p className="text-primary-foreground/90 leading-relaxed text-base md:text-lg lg:text-xl">
                                    Divinity, service to society, and a grateful heart are the key quality traits nurtured in every student of Guru Nanak Academy.
                                </p>
                            </div>

                            <ul className="mt-6 md:mt-10 space-y-2 md:space-y-4">
                                {['Truthful Living', 'Equality', 'Humility', 'Compassion'].map((item) => (
                                    <li key={item} className="flex items-center gap-2 md:gap-4 text-sm md:text-base font-medium text-primary-foreground/85">
                                        <Sparkles className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10" />
                        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5" />
                    </motion.div>

                    {/* Standard Cards */}
                    {[
                        {
                            title: 'Community Service',
                            icon: HandHeart,
                            description: 'Students participate in Gurudwara visits for Shabad chanting and neighborhood social work, fostering sensitivity to their environment and human needs.',
                            bg: 'bg-emerald-100 dark:bg-emerald-900/30',
                            text: 'text-emerald-600 dark:text-emerald-400',
                            delay: 0.1
                        },
                        {
                            title: 'CISCE Affiliated',
                            icon: Award,
                            description: 'Affiliated to the Council for the Indian School Certificate Examinations (CISCE), New Delhi — a renowned board of education in India.',
                            bg: 'bg-blue-100 dark:bg-blue-900/30',
                            text: 'text-blue-600 dark:text-blue-400',
                            delay: 0.2
                        }
                    ].map((card) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: card.delay }}
                            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:shadow-lg"
                        >
                            <div className={cn("mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl", card.bg, card.text)}>
                                <card.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{card.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}

                    {/* Heritage Card - Wide */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-800/30 p-8 md:col-span-2"
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
                                <GraduationCap className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3 text-amber-900 dark:text-amber-100">Heritage & Vision</h3>
                                <p className="text-amber-800/80 dark:text-amber-200/70 leading-relaxed text-lg">
                                    We aim to impart liberal and balanced education according to current societal needs, inspiring students to respect and follow India's rich cultural heritage.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
