import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { SCHOOL_INFO } from '@/lib/constants';
import { ContactForm } from '@/components/contact/contact-form';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Map = dynamic(() => import('@/components/shared/map').then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-muted">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${SCHOOL_INFO.name}. Find our address, phone numbers, email, and use our contact form for inquiries.`,
  openGraph: {
    title: `Contact Us | ${SCHOOL_INFO.name}`,
    description: 'Reach out to us for admissions, general inquiries, or any other questions.',
    url: '/contact',
  },
};

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone Numbers',
    details: SCHOOL_INFO.phones.slice(0, 3).map(p => p.number),
    href: `tel:${SCHOOL_INFO.phones[0].number}`,
  },
  {
    icon: Mail,
    title: 'Email Address',
    details: SCHOOL_INFO.emails.map(e => e.email),
    href: `mailto:${SCHOOL_INFO.emails[0].email}`,
  },
  {
    icon: MapPin,
    title: 'Address',
    details: [SCHOOL_INFO.address.full],
    href: '#map',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: ['Monday - Saturday', '8:00 AM - 4:00 PM'],
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Get in Touch
            </span>
            <h1 className="mt-3 text-display font-bold text-foreground md:text-display-lg">
              Contact Us
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We'd love to hear from you. Whether you have questions about
              admissions, curriculum, or anything else, our team is ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const Content = (
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 font-semibold text-foreground">
                    {info.title}
                  </h3>
                  <div className="flex flex-1 flex-col justify-center space-y-1">
                    {info.details.map((detail, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );

              if (info.href) {
                return (
                  <a key={info.title} href={info.href} className="block h-full">
                    {Content}
                  </a>
                );
              }

              return <div key={info.title} className="h-full">{Content}</div>;
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-2 text-heading-lg font-bold text-foreground">
                Send us a Message
              </h2>
              <p className="mb-8 text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <ContactForm />
              </div>
            </div>

            {/* Map */}
            <div id="map" className="scroll-mt-24">
              <h2 className="mb-2 text-heading-lg font-bold text-foreground">
                Find Us
              </h2>
              <p className="mb-8 text-muted-foreground">
                Visit our campus and experience our world-class facilities firsthand.
              </p>
              <div className="h-[400px] overflow-hidden rounded-2xl border border-border lg:h-full lg:min-h-[500px]">
                <Map />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-heading-lg font-bold text-foreground">
              Visit Our Campus
            </h2>
            <p className="mb-6 text-muted-foreground">
              We welcome prospective families to visit our campus and see our
              facilities in person. Please contact us to schedule a campus tour.
            </p>
            <div className="rounded-xl bg-muted p-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Campus Tours Available:</strong>
                <br />
                Monday to Saturday, 9:00 AM - 3:00 PM
                <br />
                (By prior appointment only)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
