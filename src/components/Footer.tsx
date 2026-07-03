import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-paper">
      <div className="container-content grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display text-xl font-bold tracking-tight">
            {siteConfig.shortName}
            <span className="text-clay">.</span>
          </span>
          <p className="mt-3 max-w-sm text-sm text-paper/70">
            {siteConfig.description}
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-paper/50">
            Buy, wear, and style with confidence. Discover the latest trends and timeless classics in our curated collection.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-paper/50">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`} className="text-paper/80 hover:text-clay">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-paper/50">Site</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="text-paper/80 hover:text-clay">About</Link></li>
            <li><Link href="/contact" className="text-paper/80 hover:text-clay">Contact</Link></li>
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-paper/80 hover:text-clay">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-6">
        <p className="container-content font-mono text-[11px] text-paper/40">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
