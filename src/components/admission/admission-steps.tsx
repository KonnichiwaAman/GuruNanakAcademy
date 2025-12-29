'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  step: number;
  title: string;
  description: string;
}

interface AdmissionStepsProps {
  steps: Step[];
}

export function AdmissionSteps({ steps }: AdmissionStepsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

    // Steps Animation
    if (stepsRef.current) {
      const stepElements = Array.from(stepsRef.current.children);
      stepElements.forEach((step, index) => {
        gsap.from(step, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
          },
        });
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-padding bg-background" aria-labelledby="steps-heading">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span
            className="header-element block text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            Step by Step
          </span>
          <h2
            id="steps-heading"
            className="header-element mt-2 text-heading-xl font-bold text-foreground md:text-display"
          >
            Admission Process
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Connecting Line */}
            <div
              className="absolute left-6 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:block md:-translate-x-1/2"
              aria-hidden="true"
            />

            {/* Steps */}
            <div ref={stepsRef} className="space-y-8 md:space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.step}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    index % 2 === 0
                      ? 'md:flex-row'
                      : 'md:flex-row-reverse md:text-right'
                  }`}
                >
                  {/* Step Number (Mobile) */}
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground md:hidden"
                    aria-hidden="true"
                  >
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className="flex-1 md:w-5/12">
                    <div
                      className={`rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:scale-105 ${
                        index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                      }`}
                    >
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Step Number (Desktop - Center) */}
                  <div
                    className="absolute left-1/2 top-6 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-lg md:flex"
                    aria-hidden="true"
                  >
                    {step.step}
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
