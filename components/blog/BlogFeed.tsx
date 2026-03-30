"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogArticle } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

const chips = ["All", "Skincare", "Skin Health", "Self Love"] as const;
type Chip = (typeof chips)[number];

export default function BlogFeed({ articles }: { articles: BlogArticle[] }) {
  // The selected chip controls visible article cards.
  const [activeChip, setActiveChip] = useState<Chip>("All");

  const filteredArticles = useMemo(() => {
    if (activeChip === "All") return articles;
    return articles.filter((article) => article.tag === activeChip);
  }, [activeChip, articles]);

  return (
    <>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {chips.map((chip) => {
          const isActive = activeChip === chip;
          return (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              className={`rounded-full border px-3 py-1 font-[family-name:var(--font-dm-sans)] text-xs tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300 ${
                isActive
                  ? "border-rose-300 bg-rose-100 text-mocha-400"
                  : "border-cream-300 bg-cream-200 text-mocha-300 hover:bg-rose-100/70"
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {filteredArticles.length === 0 ? (
        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-cream-300 bg-gradient-to-b from-cream-200 to-rose-100/70 p-8 text-center">
          <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-4xl text-mocha-400">
            No stories in this vibe yet
          </h2>
          <p className="mt-4 font-[family-name:var(--font-dm-sans)] leading-8 text-mocha-300">
            Try another category to continue your glow reading.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="rounded-3xl border border-cream-300 bg-gradient-to-b from-cream-200 to-rose-100/50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-gold-100 px-3 py-1 font-[family-name:var(--font-dm-sans)] text-xs text-gold-400">
                  {article.tag}
                </span>
                <span className="font-[family-name:var(--font-dm-sans)] text-xs text-mocha-200">
                  {formatBlogDate(article.publishedAt)}
                </span>
              </div>

              {article.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.image}
                  alt={article.title}
                  className="mt-4 h-40 w-full rounded-2xl object-cover"
                />
              ) : null}

              <h2 className="mt-4 font-[family-name:var(--font-cormorant-garamond)] text-3xl leading-tight text-mocha-400">
                {article.title}
              </h2>
              <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-sm leading-7 text-mocha-300">
                {article.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <p className="font-[family-name:var(--font-dm-sans)] text-xs text-mocha-200">
                  {article.source}
                </p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="rounded-full border border-rose-300 px-3 py-1 font-[family-name:var(--font-dm-sans)] text-xs text-mocha-300 transition-all duration-300 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  Open →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

