'use client';

import { motion } from 'framer-motion';
import { CAMPUS_STATS } from '@/lib/constants';

export function CampusStats() {
    return (
        <section className="section-padding bg-muted/50">
            <div className="container-custom">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {CAMPUS_STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="mb-2 flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
                                    {stat.value}
                                </span>
                                {stat.unit && (
                                    <span className="text-lg font-medium text-muted-foreground md:text-xl">
                                        {stat.unit}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                                {stat.label}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
