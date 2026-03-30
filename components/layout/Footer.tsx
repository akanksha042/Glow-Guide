import Link from "next/link";

export default function Footer() {
  // The footer closes the page with warmth, trust signals, and clear navigation.
  return (
    <footer className="border-t border-cream-300 bg-cream-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-cormorant-garamond)] text-3xl text-mocha-400">
            Glow Guide
          </p>
          <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-sm leading-7 text-mocha-300">
            Your skin. Your routine. Your glow.
          </p>
          <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-sm leading-7 text-mocha-300">
            Made with love for Indian skin.
          </p>
        </div>

        <div>
          <p className="font-[family-name:var(--font-cormorant-garamond)] text-2xl text-mocha-400">
            Explore
          </p>
          <ul className="mt-4 space-y-2 font-[family-name:var(--font-dm-sans)] text-sm text-mocha-300">
            <li>
              <Link
                href="/about"
                className="hover:text-mocha-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-mocha-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/secrets"
                className="hover:text-mocha-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                Secrets
              </Link>
            </li>
            <li>
              <Link
                href="/routine"
                className="hover:text-mocha-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                Routine Guide
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-[family-name:var(--font-cormorant-garamond)] text-2xl text-mocha-400">
            A gentle note
          </p>
          <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-sm leading-7 text-mocha-300">
            Your skin, your rules. We are here to guide you with
            ingredient-informed, emotionally intelligent recommendations.
          </p>
          <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-sm leading-7 text-mocha-300">
            Glow Guide is not medical advice.
          </p>
        </div>
      </div>

      <div className="border-t border-cream-300">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <p className="font-[family-name:var(--font-dm-sans)] text-xs tracking-wide text-mocha-200">
            © {new Date().getFullYear()} Glow Guide. Not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
