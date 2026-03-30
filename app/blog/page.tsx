import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogFeed from "@/components/blog/BlogFeed";
import { getBlogArticles } from "@/lib/blog";

export default async function BlogPage() {
  const articles = await getBlogArticles();

  return (
    <div className="min-h-screen bg-cream-100 text-mocha-300">
      <Navbar />

      <main className="paper-grain relative overflow-hidden">
        <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.16em] text-gold-400">
              Glow Journal
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-cormorant-garamond)] text-5xl text-mocha-400 md:text-6xl">
              Stories for skin and self-love
            </h1>
            <p className="mt-5 font-[family-name:var(--font-dm-sans)] text-lg leading-9 text-mocha-300">
              Curated reads on skincare, skin health, and gentle self-care, wrapped in the
              same warm aesthetic as your glow routine.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-cream-300 bg-gradient-to-b from-cream-200 to-rose-100/70 p-8 text-center">
              <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-4xl text-mocha-400">
                Your glow stories are loading...
              </h2>
              <p className="mt-4 font-[family-name:var(--font-dm-sans)] leading-8 text-mocha-300">
                We could not fetch fresh articles right now. Try again in a moment.
              </p>
            </div>
          ) : (
            <BlogFeed articles={articles} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

