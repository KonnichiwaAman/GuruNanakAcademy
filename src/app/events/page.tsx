import { Metadata } from 'next';
import { SCHOOL_INFO } from '@/lib/constants';
import { EventsList } from '@/components/events/events-list';

export const metadata: Metadata = {
  title: 'Events',
  description: `Stay updated with the latest events, celebrations, and activities at ${SCHOOL_INFO.name}. Annual functions, sports meets, cultural programs, and more.`,
  openGraph: {
    title: `Events | ${SCHOOL_INFO.name}`,
    description: 'Explore our school events, celebrations, and activities throughout the year.',
    url: '/events',
  },
};

export default function EventsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Stay Connected
            </span>
            <h1 className="mt-3 text-display font-bold text-foreground md:text-display-lg">
              School Events
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Explore our vibrant school life through various events, celebrations,
              and activities that bring our community together throughout the year.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <EventsList />
        </div>
      </section>
    </div>
  );
}
