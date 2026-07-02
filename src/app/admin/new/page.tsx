"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState(siteConfig.categories[0].slug);
  const [coverImage, setCoverImage] = useState("");
  const [author, setAuthor] = useState("");
  const [keywords, setKeywords] = useState("");
  const [body, setBody] = useState("");

  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);
    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage("");

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, excerpt, category, coverImage, author, keywords, body }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage(`Saved. The site will rebuild shortly at /blog/${data.slug}`);
      setTitle("");
      setSlug("");
      setExcerpt("");
      setCoverImage("");
      setAuthor("");
      setKeywords("");
      setBody("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
    router.push("/admin/new");
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="border-b border-line bg-card">
        <div className="container-content flex h-16 items-center justify-between">
          <p className="font-display text-lg font-bold text-ink">Write an article</p>
          <div className="flex items-center gap-5">
            <a href="/admin/manage" className="font-mono text-xs uppercase tracking-wider text-clay hover:underline">
              Manage articles
            </a>
            <button onClick={handleLogout} className="font-mono text-xs uppercase tracking-wider text-stone hover:text-clay">
              Log out
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container-content max-w-2xl py-10">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="sku-tag mb-1 block">Title</label>
            <input
              id="title"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Best Running Shoes for Beginners in 2026"
              className="w-full rounded-card border border-line bg-card px-4 py-3 text-sm text-ink focus:border-clay focus:outline-none"
            />
            {slug && <p className="mt-1 font-mono text-[11px] text-stone">URL: /blog/{slug}</p>}
          </div>

          <div>
            <label htmlFor="excerpt" className="sku-tag mb-1 block">Short summary</label>
            <textarea
              id="excerpt"
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A one to two sentence summary shown on article cards."
              className="w-full rounded-card border border-line bg-card px-4 py-3 text-sm text-ink focus:border-clay focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="sku-tag mb-1 block">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-card border border-line bg-card px-4 py-3 text-sm text-ink focus:border-clay focus:outline-none"
              >
                {siteConfig.categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="author" className="sku-tag mb-1 block">Author</label>
              <input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Editorial Team"
                className="w-full rounded-card border border-line bg-card px-4 py-3 text-sm text-ink focus:border-clay focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="coverImage" className="sku-tag mb-1 block">Cover image URL</label>
            <input
              id="coverImage"
              required
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://…"
              className="w-full rounded-card border border-line bg-card px-4 py-3 text-sm text-ink focus:border-clay focus:outline-none"
            />
            <p className="mt-1 text-xs text-stone">
              Paste a link to an image (e.g. from Unsplash, or your own uploaded photo host).
            </p>
          </div>

          <div>
            <label htmlFor="keywords" className="sku-tag mb-1 block">Keywords (comma-separated)</label>
            <input
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="running shoes, beginner sneakers, best running shoes 2026"
              className="w-full rounded-card border border-line bg-card px-4 py-3 text-sm text-ink focus:border-clay focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="body" className="sku-tag mb-1 block">Article body (Markdown)</label>
            <textarea
              id="body"
              required
              rows={16}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={"Write your article here. Use ## for headings.\n\nTo add an affiliate product, write:\n<ProductCard product={{ name: \"...\", brand: \"...\", price: \"$85\", affiliateUrl: \"https://...\", image: \"https://...\", blurb: \"...\", sku: \"SKU-0001\" }} />"}
              className="w-full rounded-card border border-line bg-card px-4 py-3 font-mono text-sm text-ink focus:border-clay focus:outline-none"
            />
          </div>

          {message && (
            <p
              className={`rounded-card px-4 py-3 text-sm ${
                status === "success" ? "bg-sage/10 text-sage" : "bg-clay/10 text-clay-dark"
              }`}
            >
              {message}
            </p>
          )}

          <button type="submit" disabled={status === "saving"} className="btn-primary w-full disabled:opacity-50">
            {status === "saving" ? "Publishing…" : "Publish article"}
          </button>
        </div>
      </form>
    </div>
  );
}
