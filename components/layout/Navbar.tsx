"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mobileLinks = [
    { href: "/about", label: "About" },
    { href: "/secrets", label: "Secrets" },
    { href: "/blog", label: "Blog" },
    { href: "/quiz", label: "Find My Routine →" },
  ];

  // Sticky, minimal navigation keeps focus on trust and the primary quiz CTA.
  return (
    <header className="sticky top-0 z-50 border-b border-cream-300 bg-cream-100/80 backdrop-blur-sm">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-cormorant-garamond)] text-3xl font-medium text-mocha-400"
        >
          Glow Guide
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/about"
            className="font-[family-name:var(--font-dm-sans)] text-sm font-medium tracking-wide text-mocha-300 transition-colors duration-200 hover:text-mocha-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            About
          </Link>
          <Link
            href="/secrets"
            className="font-[family-name:var(--font-dm-sans)] text-sm font-medium tracking-wide text-mocha-300 transition-colors duration-200 hover:text-mocha-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            Secrets
          </Link>
          <Link
            href="/blog"
            className="font-[family-name:var(--font-dm-sans)] text-sm font-medium tracking-wide text-mocha-300 transition-colors duration-200 hover:text-mocha-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            Blog
          </Link>
          <motion.div whileTap={{ scale: 0.97 }} className="inline-flex">
            <Link
              href="/quiz"
              className="rounded-full border-2 border-rose-300 bg-rose-300 px-6 py-3 font-[family-name:var(--font-dm-sans)] text-xs font-medium uppercase tracking-widest text-mocha-400 transition-all duration-300 hover:border-rose-500 hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              Find My Routine →
            </Link>
          </motion.div>
        </nav>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="inline-flex items-center justify-center rounded-full border border-rose-300 bg-rose-100 px-4 py-2 font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-wider text-mocha-400 focus:outline-none focus:ring-2 focus:ring-rose-300 md:hidden"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-label="Close menu overlay"
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-mocha-400/20 md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="fixed right-0 top-0 z-50 h-dvh w-72 border-l border-cream-300 bg-cream-100 p-6 shadow-xl md:hidden"
            >
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-cormorant-garamond)] text-3xl text-mocha-400">
                  Glow Guide
                </p>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full border border-rose-300 px-3 py-1 font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-wide text-mocha-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  Close
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-3">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-2xl px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm tracking-wide text-mocha-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300 ${
                      link.href === "/quiz"
                        ? "border-2 border-rose-300 bg-rose-300 text-mocha-400"
                        : "border border-cream-300 bg-cream-200 hover:bg-rose-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <p className="mt-8 font-[family-name:var(--font-dm-sans)] text-xs leading-6 text-mocha-200">
                Your skin. Your routine. Your glow.
              </p>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
