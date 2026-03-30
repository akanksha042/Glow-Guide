import { NextResponse } from "next/server";

interface GNewsArticle {
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface NormalizedArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  url: string;
  image: string | null;
  source: string;
  publishedAt: string;
  tag: "Skincare" | "Skin Health" | "Self Love";
}

const queries = [
  { term: "skincare", tag: "Skincare" as const },
  { term: "skin health", tag: "Skin Health" as const },
  { term: "self care wellness", tag: "Self Love" as const },
];

const sourceAllowlist = [
  "Vogue",
  "Harper's Bazaar",
  "Byrdie",
  "Allure",
  "Healthline",
  "Verywell Health",
  "Cleveland Clinic",
  "Medical News Today",
  "Dermstore",
  "MindBodyGreen",
  "The New York Times",
  "The Guardian",
  "Forbes",
  "Well+Good",
  "Who What Wear",
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function buildExcerpt(article: GNewsArticle): string {
  const raw = article.description || article.content || "A thoughtful read for your glow journey.";
  return raw.replace(/\s?\[\+\d+\s?chars\]/g, "").trim().slice(0, 180);
}

function mapArticle(article: GNewsArticle, tag: NormalizedArticle["tag"]): NormalizedArticle {
  const source = article.source?.name ?? "Glow Guide";
  const baseSlug = slugify(article.title);
  return {
    id: `${article.url}-${tag}`,
    slug: `${baseSlug}-${Math.abs(article.url.length % 10000)}`,
    title: article.title,
    excerpt: buildExcerpt(article),
    url: article.url,
    image: article.image,
    source,
    publishedAt: article.publishedAt,
    tag,
  };
}

function isAllowedSource(sourceName: string): boolean {
  const normalized = sourceName.toLowerCase();
  return sourceAllowlist.some((allowed) => normalized.includes(allowed.toLowerCase()));
}

export async function GET() {
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ success: false, error: "GNEWS_API_KEY is missing." }, { status: 500 });
  }

  try {
    const responses = await Promise.all(
      queries.map(async ({ term, tag }) => {
        const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(term)}&lang=en&max=8&apikey=${apiKey}`;
        const res = await fetch(url, {
          next: { revalidate: 1800 },
        });
        if (!res.ok) return [] as NormalizedArticle[];
        const data = (await res.json()) as { articles?: GNewsArticle[] };
        return (data.articles ?? []).map((article) => mapArticle(article, tag));
      }),
    );

    const merged = responses.flat();
    const filtered = merged.filter((article) => isAllowedSource(article.source));
    const chosen = filtered.length >= 6 ? filtered : merged;
    const deduped = Array.from(new Map(chosen.map((article) => [article.url, article])).values());
    const sorted = deduped.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return NextResponse.json({ success: true, articles: sorted.slice(0, 18) });
  } catch {
    return NextResponse.json(
      { success: false, error: "Could not fetch blog articles right now." },
      { status: 500 },
    );
  }
}

