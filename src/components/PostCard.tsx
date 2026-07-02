import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export default function PostCard({ post }: { post: Post }) {
  const category = siteConfig.categories.find((c) => c.slug === post.category);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-line">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-paper/95 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-clay">
            {category.name}
          </span>
        )}
      </div>
      <h3 className="mt-3 line-clamp-2 break-words font-display text-lg font-bold leading-snug text-ink group-hover:text-clay">
        {post.title}
      </h3>
      <p className="mt-1 line-clamp-2 break-words text-sm text-stone">{post.excerpt}</p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-stone/70">
        {post.readingTime}
      </p>
    </Link>
  );
}