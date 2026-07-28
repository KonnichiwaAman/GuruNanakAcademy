'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Map, MapProps } from './map';

export function DeferredMap(props: MapProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px', // Preload map when user is within 300px of scrolling it into view
  });

  return (
    <div ref={ref} className="relative h-full min-h-[300px] w-full overflow-hidden rounded-xl">
      {inView ? (
        <Map {...props} />
      ) : (
        <div className="flex h-full min-h-[300px] w-full animate-pulse items-center justify-center rounded-2xl border border-border bg-muted/40">
          <span className="text-sm text-muted-foreground">Loading interactive map...</span>
        </div>
      )}
    </div>
  );
}
