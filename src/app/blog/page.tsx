import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Sneaker reviews, buying guides, and outfit inspiration.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="container-content py-14">
      <p className="eyebrow">Journal</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">
        All Articles
      </h1>
      <p className="mt-3 max-w-lg text-stone">
        Reviews, guides, and outfit ideas.
      </p>

      {posts.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-card border border-dashed border-line p-12 text-center">
          <p className="font-display text-lg text-ink">No articles yet.</p>
        </div>
      )}
    </div>
  );
}
