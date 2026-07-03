import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";
import ProductCard from "@/components/ProductCard";
import PostCard from "@/components/PostCard";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `${siteConfig.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: [post.coverImage],
    },
  };
}

const mdxComponents = {
  ProductCard,
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const category = siteConfig.categories.find((c) => c.slug === post.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: post.author },
  };

  return (
    <article className="container-content py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        {category && (
          <Link
            href={`/category/${category.slug}`}
            className="eyebrow hover:underline"
          >
            {category.name}
          </Link>
        )}
        <h1 className="mt-3 break-words font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-stone">
          <span>{post.author}</span>
          <span>·</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>

      <div className="relative mx-auto mt-8 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-card bg-line">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
        />
      </div>

      <div className="prose prose-neutral mx-auto mt-10 max-w-3xl prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-a:text-clay prose-a:no-underline hover:prose-a:underline">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-card border border-line bg-card p-5 font-mono text-[11px] uppercase tracking-wider text-stone">
        This article contains affiliate links.{" "}
        <Link href="/affiliate-disclosure" className="text-clay hover:underline">
          Learn more
        </Link>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-16 max-w-5xl">
          <p className="eyebrow">Keep reading</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
            Related articles
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
