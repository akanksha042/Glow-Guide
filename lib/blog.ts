export interface BlogArticle {
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

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export async function getBlogArticles(): Promise<BlogArticle[]> {
  const baseUrl = getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/api/blog`, { cache: "no-store" });
    if (!response.ok) return [];
    const data = (await response.json()) as { success: boolean; articles?: BlogArticle[] };
    if (!data.success || !data.articles) return [];
    return data.articles;
  } catch {
    return [];
  }
}

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

