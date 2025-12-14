'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SAMPLE_EVENTS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = ['All', 'Annual', 'Monthly', 'Festival', 'Sports', 'Academic'];

export function EventsList() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents =
    selectedCategory === 'All'
      ? SAMPLE_EVENTS
      : SAMPLE_EVENTS.filter((event) => event.category === selectedCategory);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Badge
                  variant="secondary"
                  className="absolute left-4 top-4"
                >
                  {event.category}
                </Badge>
              </div>
              <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {event.date}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                  {event.excerpt}
                </p>
                <Link
                  href={`/events/${event.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No events found in this category.
          </p>
          <Button
            variant="outline"
            onClick={() => setSelectedCategory('All')}
            className="mt-4"
          >
            View All Events
          </Button>
        </div>
      )}
    </div>
  );
}
