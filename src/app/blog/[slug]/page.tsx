import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { SCHOOL_INFO } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${SCHOOL_INFO.name}`,
      description: post.excerpt,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="pt-20">
      {/* Back Navigation */}
      <div className="border-b border-border bg-background">
        <div className="container-custom py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article>
        {/* Header */}
        <header className="bg-muted/50">
          <div className="container-custom py-12 md:py-16">
            <div className="mx-auto max-w-3xl">
              {post.category && (
                <Badge variant="secondary" className="mb-4">
                  {post.category}
                </Badge>
              )}
              <h1 className="text-heading-xl font-bold text-foreground md:text-display">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" aria-hidden="true" />
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                {post.author && (
                  <span className="flex items-center gap-2">
                    <User className="h-5 w-5" aria-hidden="true" />
                    {post.author}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="container-custom py-10 md:py-16">
            <div className="mx-auto max-w-5xl">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container-custom py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-p:leading-relaxed prose-img:rounded-xl prose-img:shadow-lg">
              <MDXRemote source={post.content} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-8">
                <span className="text-sm text-muted-foreground">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="mt-8 flex items-center justify-between border-t border-border pt-8">
              <p className="text-muted-foreground">Share this post</p>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <h2 className="mb-8 text-heading-lg font-bold text-foreground">
              Related Posts
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative aspect-video sm:aspect-square sm:w-48 flex-shrink-0 overflow-hidden">
                    <Image
                      src={relatedPost.image || '/images/blog/default.jpg'}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, 200px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      {new Date(relatedPost.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
