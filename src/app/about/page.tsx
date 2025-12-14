import { Metadata } from 'next';
import Image from 'next/image';
import { Timeline } from '@/components/about/timeline';
import { LeadershipSection } from '@/components/about/leadership-section';
import { AboutContent } from '@/components/about/about-content';
import { AboutValuesGrid } from '@/components/about/about-values-grid';
import { MissionVision } from '@/components/about/mission-vision';
import { CampusStats } from '@/components/about/campus-stats';
import { SCHOOL_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${SCHOOL_INFO.name}, one of the finest co-educational boarding and day-boarding Schools in Dehradun, founded in ${SCHOOL_INFO.founded}. Discover our mission, values, and leadership.`,
  openGraph: {
    title: `About Us | ${SCHOOL_INFO.name}`,
    description: `Learn about our ${SCHOOL_INFO.campusSize} campus, mission, and leadership team.`,
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              About Us
            </span>
            <h1 className="mt-3 text-display font-bold text-foreground md:text-display-lg">
              Our Story
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Founded on the principles of truthful living and equality,{' '}
              {SCHOOL_INFO.name} has been shaping young minds for over five
              decades.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/about/campus-main.jpg"
                    alt="Guru Nanak Academy campus"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full">
              <AboutContent />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid (Shifted Down) */}
      <AboutValuesGrid />

      {/* Campus Stats */}
      <CampusStats />

      {/* Timeline */}
      <Timeline />

      {/* Mission & Vision */}
      <MissionVision />

      {/* Leadership */}
      <LeadershipSection />
    </div>
  );
}
