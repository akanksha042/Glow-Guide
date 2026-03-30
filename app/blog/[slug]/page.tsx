import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatBlogDate, getBlogArticles } from "@/lib/blog";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const articles = await getBlogArticles();
  const article = articles.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  const related = articles
    .filter((item) => item.slug !== article.slug && item.tag === article.tag)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-cream-100 text-mocha-300">
      <Navbar />

      <main className="paper-grain relative overflow-hidden">
        <section className="mx-auto max-w-4xl px-6 py-14 md:py-20">
          <div className="rounded-3xl border border-cream-300 bg-gradient-to-b from-cream-200 to-rose-100/50 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gold-100 px-3 py-1 font-[family-name:var(--font-dm-sans)] text-xs text-gold-400">
                {article.tag}
              </span>
              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-mocha-200">
                {formatBlogDate(article.publishedAt)}
              </span>
              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-mocha-200">
                Source: {article.source}
              </span>
            </div>

            <h1 className="mt-4 font-[family-name:var(--font-cormorant-garamond)] text-4xl text-mocha-400 md:text-5xl">
              {article.title}
            </h1>

            {article.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.image}
                alt={article.title}
                className="mt-6 h-72 w-full rounded-2xl object-cover md:h-96"
              />
            ) : null}

            <p className="mt-6 font-[family-name:var(--font-dm-sans)] text-lg leading-9 text-mocha-300">
              {article.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-rose-300 bg-rose-300 px-6 py-3 font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-widest text-mocha-400 transition-all duration-300 hover:border-rose-500 hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                Read Full Story →
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-rose-300 px-5 py-2 font-[family-name:var(--font-dm-sans)] text-sm text-mocha-300 transition-all duration-300 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>

          {related.length > 0 ? (
            <div className="mt-10">
              <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl text-mocha-400">
                More in this vibe
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="rounded-2xl border border-cream-300 bg-cream-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-rose-100/60 focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    <p className="font-[family-name:var(--font-dm-sans)] text-xs text-mocha-200">
                      {item.tag}
                    </p>
                    <p className="mt-2 font-[family-name:var(--font-cormorant-garamond)] text-2xl text-mocha-400">
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  );
}

