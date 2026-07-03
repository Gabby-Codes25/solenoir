import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import BrandMoodboard from "@/components/brandMoodboard";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 9);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-paper">
        <div className="container-content grid gap-8 py-12 md:grid-cols-2 md:items-center md:py-14">
          <div className="relative z-10">
            <p className="eyebrow">Footwear &amp; style, for everyone</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Find your next
              <br />
              pair with{" "}
              <span className="text-clay">confidence.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/blog" className="btn-primary">
                Read the guides
              </Link>
              <Link href="/category/footwear" className="btn-secondary">
                Shop footwear
              </Link>
            </div>
          </div>

          <div
            className="relative aspect-square w-full overflow-hidden rounded-card bg-line md:aspect-[3/4]"
            style={{ clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0 94%)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop"
              alt="Editorial sneaker photography"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

    <BrandMoodboard
      colors={[
        { label: "Forest green", hex: "#2D4A3A" },
        { label: "Antique gold", hex: "#B8933F" },
        { label: "Warm ivory", hex: "#F4EFE6" },
        { label: "Midnight navy", hex: "#1B2A4A" },
      ]}
      feelWords={["Authentic", "Sophisticated", "Confident", "Lasting"]}
    />

      <section className="border-b border-line">
        <div className="container-content grid grid-cols-2 divide-x divide-line border-x border-line sm:grid-cols-4">
          {siteConfig.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col justify-between p-5 transition-colors hover:bg-ink hover:text-paper sm:p-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-clay group-hover:text-clay">
                Category
              </span>
              <span className="mt-6 font-display text-lg font-bold sm:text-xl">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-content py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Latest</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
              Fresh off the shelf
            </h2>
          </div>
          <Link href="/blog" className="hidden font-mono text-xs uppercase tracking-wider text-clay hover:underline sm:block">
            View all →
          </Link>
          </div>

        {posts.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-card border border-dashed border-line p-12 text-center">
            <p className="font-display text-lg text-ink">No articles published yet.</p>
            <p className="mt-2 text-sm text-stone">
              Add MDX files to <code className="font-mono">src/content/blog</code> to see them here.
            </p>
          </div>
        )}
      </section>
    </>
  );
}