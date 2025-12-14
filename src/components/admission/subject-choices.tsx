'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const classIXSubjects = {
  science: {
    title: 'Science Stream',
    compulsory: ['English', 'Hindi', 'Social Studies', 'Science', 'Mathematics'],
    sixth: ['Computer Applications', 'Physical Education', 'Art'],
  },
  commerce: {
    title: 'Commerce Stream (Without Maths)',
    note: 'For candidates conditionally promoted',
    compulsory: ['English', 'Hindi', 'Social Studies', 'Commercial Studies', 'Economics'],
    sixth: ['Computer Applications', 'Physical Education', 'Art'],
  },
  commerceMaths: {
    title: 'Commerce Stream (With Maths)',
    note: 'For candidates with Maths above 40% marks',
    compulsory: ['English', 'Hindi', 'Social Studies', 'Commercial Studies', 'Mathematics'],
    sixth: ['Economics Applications (mandatory as per Council rule)'],
  },
};

const classXISubjects = [
  {
    stream: 'Science (PCM)',
    subjects: ['English', 'Physics', 'Chemistry', 'Mathematics'],
    fifth: ['Computer Science', 'Hindi', 'Physical Education', 'Psychology'],
  },
  {
    stream: 'Science (PCB)',
    subjects: ['English', 'Physics', 'Chemistry', 'Biology'],
    fifth: ['Computer Science', 'Hindi', 'Physical Education', 'Psychology'],
  },
  {
    stream: 'Commerce',
    subjects: ['English', 'Commerce', 'Accounts', 'Economics'],
    fifth: ['Computer Science', 'Hindi', 'Physical Education', 'Psychology', 'Mathematics'],
  },
];

export function SubjectChoices() {
  return (
    <section className="section-padding bg-muted/50" aria-labelledby="subjects-heading">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            Academic Streams
          </motion.span>
          <motion.h2
            id="subjects-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-heading-xl font-bold text-foreground md:text-display"
          >
            Subject Choices
          </motion.h2>
        </div>

        {/* Class IX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="mb-6 flex items-center gap-2 text-heading-lg font-semibold text-foreground">
            <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
            Class IX Subject Options
          </h3>

          <div className="grid gap-6 lg:grid-cols-3">
            {Object.entries(classIXSubjects).map(([key, stream]) => (
              <div
                key={key}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h4 className="mb-1 text-lg font-semibold text-foreground">
                  {stream.title}
                </h4>
                {'note' in stream && stream.note && (
                  <p className="mb-4 text-xs text-muted-foreground">
                    {stream.note}
                  </p>
                )}

                <div className="mb-4">
                  <p className="mb-2 text-sm font-medium text-foreground">
                    Compulsory Subjects:
                  </p>
                  <ul className="space-y-1">
                    {stream.compulsory.map((subject, i) => (
                      <li
                        key={subject}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {i + 1}
                        </span>
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-foreground">
                    6th Subject (Choose one):
                  </p>
                  <ul className="space-y-1">
                    {stream.sixth.map((subject) => (
                      <li
                        key={subject}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Class XI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-6 flex items-center gap-2 text-heading-lg font-semibold text-foreground">
            <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
            Class XI Subject Options
          </h3>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Stream
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Core Subjects
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      5th Subject Options
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {classXISubjects.map((stream) => (
                    <tr key={stream.stream} className="hover:bg-muted/30">
                      <td className="px-6 py-4">
                        <span className="font-medium text-foreground">
                          {stream.stream}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <ul className="space-y-1">
                          {stream.subjects.map((subject) => (
                            <li
                              key={subject}
                              className="text-sm text-muted-foreground"
                            >
                              {subject}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {stream.fifth.map((subject) => (
                            <span
                              key={subject}
                              className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            <strong>Note:</strong> English is compulsory for all streams in Class
            XI.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
