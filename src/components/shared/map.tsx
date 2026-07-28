'use client';

import { useSyncExternalStore } from 'react';
import { SCHOOL_INFO } from '@/lib/constants';

// Default coordinates from school info
const DEFAULT_CENTER: [number, number] = [SCHOOL_INFO.coordinates.lat, SCHOOL_INFO.coordinates.lng];
const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export interface MapProps {
  center?: [number, number];
  zoom?: number;
  markerPosition?: [number, number]; // Deprecated in Google Maps iframe
  markerTitle?: string;
  className?: string;
}

export function Map({
  center = DEFAULT_CENTER,
  zoom = 15,
  markerTitle = SCHOOL_INFO.name,
  className = '',
}: MapProps) {
  const isClient = useSyncExternalStore(subscribeToHydration, getClientSnapshot, getServerSnapshot);

  const [lat, lng] = center;
  // Construct google maps embed URL using coordinates
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&t=m&output=embed`;

  if (!isClient) {
    return (
      <div
        className={`${className} relative z-0 flex h-full min-h-[300px] w-full animate-pulse items-center justify-center rounded-2xl bg-muted`}
        role="application"
        aria-label={`Map showing location of ${markerTitle}`}
      >
        <span className="text-sm text-muted-foreground">Loading Map...</span>
      </div>
    );
  }

  return (
    <div
      className={`${className} relative z-0 h-full min-h-[300px] w-full overflow-hidden rounded-2xl border border-border`}
      role="application"
      aria-label={`Map showing location of ${markerTitle}`}
    >
      <iframe
        src={embedUrl}
        title={`Google Map showing location of ${markerTitle}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        className="h-full min-h-[300px] w-full transition-all duration-300 dark:contrast-[100%] dark:grayscale-[30%] dark:hue-rotate-[180deg] dark:invert-[90%]"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

// Static fallback map image component
export function StaticMapFallback({
  lat,
  lng,
  zoom = 15,
  className = '',
}: {
  lat: number;
  lng: number;
  zoom?: number;
  width?: number;
  height?: number;
  className?: string;
}) {
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&t=m&output=embed`;

  return (
    <div
      className={`${className} relative z-0 h-full min-h-[300px] w-full overflow-hidden rounded-2xl border border-border`}
    >
      <iframe
        src={embedUrl}
        title="Google Map showing school location"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        className="h-full min-h-[300px] w-full transition-all duration-300 dark:contrast-[100%] dark:grayscale-[30%] dark:hue-rotate-[180deg] dark:invert-[90%]"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
