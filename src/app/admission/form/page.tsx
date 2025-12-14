import { Metadata } from 'next';
import { AdmissionForm } from '@/components/admission/admission-form';
import { SCHOOL_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Admission Form',
  description: `Apply for admission at ${SCHOOL_INFO.name}. Fill out the online admission form for classes Nursery to XII.`,
  openGraph: {
    title: `Admission Form | ${SCHOOL_INFO.name}`,
    description: 'Apply for admission online. Fill out the form to start your journey with us.',
    url: '/admission/form',
  },
};

export default function AdmissionFormPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-12 md:py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Online Application
            </span>
            <h1 className="mt-3 text-display font-bold text-foreground">
              Admission Form
            </h1>
            <p className="mt-4 text-muted-foreground">
              Please fill out the form below with accurate information. All
              fields marked with asterisk (*) are required.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl">
            <AdmissionForm />
          </div>
        </div>
      </section>
    </div>
  );
}
