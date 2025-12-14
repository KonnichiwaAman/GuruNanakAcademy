import { Metadata } from 'next';
import Link from 'next/link';
import { FileDown, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdmissionSteps } from '@/components/admission/admission-steps';
import { SubjectChoices } from '@/components/admission/subject-choices';
import { SCHOOL_INFO, ADMISSION_STEPS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Admission Procedure',
  description: `Learn about the admission procedure at ${SCHOOL_INFO.name}. Admissions open for classes Nursery to XII. Find out about eligibility, entrance tests, and required documents.`,
  openGraph: {
    title: `Admission Procedure | ${SCHOOL_INFO.name}`,
    description: 'Complete guide to admission process, eligibility criteria, and subject choices.',
    url: '/admission',
  },
};

export default function AdmissionPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Join Our Family
            </span>
            <h1 className="mt-3 text-display font-bold text-foreground md:text-display-lg">
              Admission Procedure
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Admissions to the School are open to all during the months of
              April/May/June depending on vacancies on a first come basis.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/admission/form">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="/documents/fees-chart-2025-26.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileDown className="mr-2 h-5 w-5" aria-hidden="true" />
                  Download Fee Chart
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Steps */}
      <AdmissionSteps steps={ADMISSION_STEPS} />

      {/* Age Requirements */}
      <section className="section-padding bg-muted/50" aria-labelledby="age-heading">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2
              id="age-heading"
              className="mb-8 text-center text-heading-xl font-bold text-foreground"
            >
              Age Requirements
            </h2>

            <div className="rounded-2xl border border-border bg-card p-8">
              <p className="mb-6 text-muted-foreground">
                The school adheres to the 5-year class formula for fixing the
                age at the time of admission for Nursery plus 3 years.
              </p>

              <div className="space-y-4">
                {[
                  { class: 'Play Group', age: '3+ years as of 31st March' },
                  { class: 'Kindergarten', age: '4+ years' },
                  { class: 'Class 1', age: '5+ years' },
                  { class: 'Class 2 onwards', age: 'Age calculation continues accordingly' },
                ].map((item) => (
                  <div
                    key={item.class}
                    className="flex items-start gap-3 rounded-lg bg-muted/50 p-4"
                  >
                    <CheckCircle
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-foreground">
                        {item.class}:
                      </span>{' '}
                      <span className="text-muted-foreground">{item.age}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> Admission to Standard IX & XI will be as
                  per the procedures of CISCE, New Delhi, and the School
                  authorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="section-padding bg-background" aria-labelledby="documents-heading">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2
              id="documents-heading"
              className="mb-8 text-center text-heading-xl font-bold text-foreground"
            >
              Required Documents
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  For Nursery Admission
                </h3>
                <ul className="space-y-3">
                  {[
                    'Birth Certificate (Original)',
                    'Three recent passport photographs',
                    'Completed Admission Form',
                  ].map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  For Other Classes
                </h3>
                <ul className="space-y-3">
                  {[
                    'Original Report Card (Previous Class)',
                    'Bonafide Certificate',
                    'Transfer Certificate (Original)',
                    'Three recent passport photographs',
                    'Completed Admission Form',
                  ].map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Important:</strong> Admissions are made strictly on
                merit. Any form of canvassing will automatically result in the
                rejection of candidature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Choices */}
      <SubjectChoices />

      {/* Academic Year Info */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container-custom text-center">
          <h2 className="text-heading-lg font-bold text-primary-foreground md:text-heading-xl">
            Academic Year: April to March
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            A detailed fee schedule can be obtained from the school
            Administrative/Account Office.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/admission/form">Apply for Admission</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
