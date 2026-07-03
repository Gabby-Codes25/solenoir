"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
          {siteConfig.shortName}
          <span className="text-clay">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {siteConfig.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:text-clay"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:text-clay"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-clay hover:text-clay"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </Link>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-clay hover:text-clay md:hidden"
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-line bg-paper md:hidden">
          <div className="container-content flex flex-col py-4">
            {siteConfig.categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line py-3 font-mono text-sm uppercase tracking-wider text-ink transition-colors hover:text-clay"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="py-3 font-mono text-sm uppercase tracking-wider text-ink transition-colors hover:text-clay"
            >
              Blog
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}