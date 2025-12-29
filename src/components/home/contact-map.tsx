'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SCHOOL_INFO } from '@/lib/constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Dynamically import Map component (client-side only)
const MapComponent = dynamic(
  () => import('@/components/shared/map').then((mod) => mod.Map),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[400px] items-center justify-center rounded-2xl bg-muted">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    ),
  }
);

export function ContactMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Animation
    gsap.from('.header-element', {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });

    // Map Reveal
    gsap.from(mapRef.current, {
      x: -30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      },
    });

    // Info Reveal
    gsap.from(infoRef.current, {
      x: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      },
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-padding bg-background" aria-labelledby="contact-heading">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span
            className="header-element block text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            Get in Touch
          </span>
          <h2
            id="contact-heading"
            className="header-element mt-2 text-heading-xl font-bold text-foreground md:text-display"
          >
            Visit Our Campus
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Map */}
          <div
            ref={mapRef}
            className="lg:col-span-3 relative z-0"
          >
            <div className="h-[400px] overflow-hidden rounded-2xl border border-border lg:h-[500px] relative z-0 transition-transform duration-500 hover:shadow-lg">
              <MapComponent
                center={[SCHOOL_INFO.coordinates.lat, SCHOOL_INFO.coordinates.lng]}
                zoom={15}
                markerPosition={[
                  SCHOOL_INFO.coordinates.lat,
                  SCHOOL_INFO.coordinates.lng,
                ]}
                markerTitle={SCHOOL_INFO.name}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div
            ref={infoRef}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-border bg-card p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="mb-6 text-xl font-semibold text-foreground">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Location */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 hover:scale-110">
                    <MapPin className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Location</h4>
                    <a
                      href={`https://maps.google.com/?q=${SCHOOL_INFO.coordinates.lat},${SCHOOL_INFO.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-muted-foreground hover:text-primary"
                    >
                      {SCHOOL_INFO.address.street}
                      <br />
                      {SCHOOL_INFO.address.city}, {SCHOOL_INFO.address.state}
                      <br />
                      {SCHOOL_INFO.address.country}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 hover:scale-110">
                    <Phone className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Mobile</h4>
                    <div className="mt-1 space-y-1">
                      {SCHOOL_INFO.phones.slice(0, 3).map((phone, i) => (
                        <a
                          key={i}
                          href={`tel:${phone.number.replace(/[^+\d]/g, '')}`}
                          className="block text-sm text-muted-foreground hover:text-primary"
                        >
                          {phone.number}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 hover:scale-110">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Email</h4>
                    <div className="mt-1 space-y-1">
                      {SCHOOL_INFO.emails.map((email, i) => (
                        <a
                          key={i}
                          href={`mailto:${email.email}`}
                          className="block text-sm text-muted-foreground hover:text-primary"
                        >
                          {email.email}
                          <span className="ml-1 text-xs">({email.label})</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 hover:scale-110">
                    <Clock className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Office Hours</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Monday - Saturday
                      <br />
                      8:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
