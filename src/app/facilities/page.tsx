import { Metadata } from 'next';
import Image from 'next/image';
import { LABS, SCHOOL_INFO } from '@/lib/constants';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Facilities',
  description: `Explore world-class facilities at ${SCHOOL_INFO.name}. Modern laboratories, library, sports facilities, and more on our ${SCHOOL_INFO.campusSize} campus.`,
  openGraph: {
    title: `Facilities | ${SCHOOL_INFO.name}`,
    description: 'State-of-the-art facilities including Physics, Chemistry, Biology, and Computer labs.',
    url: '/facilities',
  },
};

export default function FacilitiesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              World-Class Infrastructure
            </span>
            <h1 className="mt-3 text-display font-bold text-foreground md:text-display-lg">
              Our Facilities
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Our school boasts of state-of-the-art infrastructure with modern
              facilities that meet the highest standards of education and
              comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Labs Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-heading-xl font-bold text-foreground md:text-display">
            Our Laboratories
          </h2>

          <div className="space-y-16">
            {LABS.map((lab, index) => {
              const Icon = lab.icon;
              const isReversed = index % 2 === 1;

              return (
                <div
                  key={lab.id}
                  id={lab.id}
                  className="scroll-mt-24"
                >
                  <div
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                      isReversed ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className={isReversed ? 'lg:order-2' : ''}>
                      <div className="relative aspect-video overflow-hidden rounded-2xl">
                        <Image
                          src={lab.image}
                          alt={lab.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={isReversed ? 'lg:order-1' : ''}>
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <h3 className="mb-4 text-heading-lg font-bold text-foreground">
                        {lab.title}
                      </h3>
                      <p className="mb-6 text-muted-foreground">
                        {lab.fullDescription}
                      </p>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-3 font-semibold text-foreground">
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {lab.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <Check
                                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                                  aria-hidden="true"
                                />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-3 font-semibold text-foreground">
                            Equipment
                          </h4>
                          <ul className="space-y-2">
                            {lab.equipment.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="section-padding bg-muted/50 scroll-mt-24">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-2xl lg:aspect-[4/3]">
              <Image
                src="/images/facilities/library.jpg"
                alt="School library"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Knowledge Hub
              </span>
              <h2 className="mt-2 text-heading-xl font-bold text-foreground md:text-display">
                Library
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our library is a sanctuary of knowledge, equipped with a diverse
                collection of books, e-books, periodicals, and multimedia content.
                It provides comfortable reading areas and collaborative workspaces
                for students.
              </p>
              <p className="mt-4 text-muted-foreground">
                The library is designed to encourage a love for reading and
                research, with resources covering all academic subjects as well as
                general knowledge, fiction, and reference materials.
              </p>

              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  'Diverse collection of books',
                  'E-books and digital resources',
                  'Academic journals',
                  'Comfortable reading areas',
                  'Collaborative workspaces',
                  'Computer terminals',
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check
                      className="h-4 w-4 flex-shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sports & Other Facilities */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-heading-xl font-bold text-foreground md:text-display">
            Sports & Recreation
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Football Ground',
                description: 'Full-size football field for matches and practice.',
                image: '/images/facilities/football.jpg',
              },
              {
                title: 'Basketball Court',
                description: 'Standard court with professional markings.',
                image: '/images/facilities/basketball.jpg',
              },
              {
                title: 'Indoor Cricket',
                description: 'Indoor cricket facility with practice nets.',
                image: '/images/facilities/cricket.jpg',
              },
              {
                title: 'Table Tennis',
                description: 'Multiple tables for practice and tournaments.',
                image: '/images/facilities/table-tennis.jpg',
              },
              {
                title: 'Badminton',
                description: 'Indoor and outdoor badminton courts.',
                image: '/images/facilities/badminton.jpg',
              },
              {
                title: 'Gymnasium',
                description: 'Well-equipped gym for physical fitness.',
                image: '/images/facilities/gymnasium.jpg',
              },
            ].map((facility) => (
              <div
                key={facility.title}
                className="group overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {facility.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Classrooms */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Modern Learning
              </span>
              <h2 className="mt-2 text-heading-xl font-bold text-foreground md:text-display">
                Smart Classrooms
              </h2>
              <p className="mt-4 text-muted-foreground">
                Each classroom is well-equipped with the latest educational tools
                and resources, ensuring an engaging and interactive learning
                environment. Our smart classrooms feature digital boards,
                projectors, and audio-visual aids.
              </p>
              <p className="mt-4 text-muted-foreground">
                The design is not only visually appealing but also environment
                friendly, incorporating green spaces and sustainable practices
                throughout the campus.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  'Digital interactive boards',
                  'High-speed internet connectivity',
                  'Audio-visual equipment',
                  'Comfortable seating arrangements',
                  'Natural lighting and ventilation',
                  'Air-conditioned classrooms',
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check
                      className="h-4 w-4 flex-shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src="/images/facilities/classroom.jpg"
                alt="Smart classroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
