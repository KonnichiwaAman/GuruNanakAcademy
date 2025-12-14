import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SCHOOL_INFO } from '@/lib/constants';
import { getAllPosts } from '@/lib/mdx';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Read the latest news, updates, and insights from ${SCHOOL_INFO.name}. Stay informed about school events, achievements, and educational topics.`,
  openGraph: {
    title: `Blog | ${SCHOOL_INFO.name}`,
    description: 'Latest news, updates, and insights from our school community.',
    url: '/blog',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              News & Updates
            </span>
            <h1 className="mt-3 text-display font-bold text-foreground md:text-display-lg">
              Our Blog
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Stay connected with the latest happenings, achievements, and insights
              from our school community.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-custom">
          {posts.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={post.image || '/images/blog/default.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {post.category && (
                        <Badge
                          variant="secondary"
                          className="absolute left-4 top-4 backdrop-blur-sm"
                        >
                          {post.category}
                        </Badge>
                      )}
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        {new Date(post.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      {post.author && (
                        <span className="flex items-center gap-1.5">
                          <User className="h-4 w-4" aria-hidden="true" />
                          {post.author}
                        </span>
                      )}
                    </div>
                    <Link href={`/blog/${post.slug}`} className="block flex-1">
                      <h2 className="mb-4 text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="mb-6 line-clamp-3 text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>
                    </Link>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
