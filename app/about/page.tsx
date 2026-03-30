"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { sectionReveal, staggerContainer, staggerItem } from "@/lib/motion";

const forYouLines = [
  "This is for the soft girls.",
  "The strong girls.",
  "The chaotic girls.",
  "The healing girls.",
  'The "I have my life together" girls... and the "I absolutely do not" girls.',
];

const promiseLines = [
  "understanding your skin",
  "choosing what feels right for you",
  "falling a little more in love with yourself along the way",
];

export default function AboutPage() {
  // This page turns the long narrative into a cinematic, card-based editorial experience.
  return (
    <div className="min-h-screen bg-cream-100 text-mocha-300">
      <Navbar />

      <main className="paper-grain relative overflow-hidden">
        <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <motion.div
            variants={sectionReveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.16em] text-gold-400">
              About us (or... about you, really)
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-cormorant-garamond)] text-5xl text-mocha-400 md:text-6xl">
              Welcome, my love.
            </h1>
            <p className="mt-6 font-[family-name:var(--font-dm-sans)] text-lg leading-9 text-mocha-300">
              You did not just land on a website... you wandered into a tiny corner of
              the internet that was made just for you.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-12 grid gap-6 lg:grid-cols-3"
          >
            <motion.article
              variants={staggerItem}
              className="rounded-3xl border border-cream-300 bg-gradient-to-b from-cream-200 to-rose-100/70 p-6 md:p-8"
            >
              <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl text-mocha-400">
                Why this exists
              </h2>
              <p className="mt-4 font-[family-name:var(--font-dm-sans)] leading-8 text-mocha-300">
                Somewhere between busy schedules and endless tabs, we forgot that
                self-care is supposed to feel soft, joyful, and a little magical.
              </p>
              <p className="mt-3 font-[family-name:var(--font-dm-sans)] leading-8 text-mocha-300">
                Skincare became complicated. Overwhelming. A thousand products, a
                million opinions... and somehow still confusing.
              </p>
              <p className="mt-3 font-[family-name:var(--font-cormorant-garamond)] text-2xl italic text-rose-500">
                What if it felt like a conversation instead?
              </p>
            </motion.article>

            <motion.article
              variants={staggerItem}
              className="rounded-3xl border border-cream-300 bg-gradient-to-b from-cream-200 to-sage-100/70 p-6 md:p-8"
            >
              <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl text-mocha-400">
                Who made this?
              </h2>
              <p className="mt-4 font-[family-name:var(--font-dm-sans)] leading-8 text-mocha-300">
                Hi, it is me... just a whimsical girl with big feelings and even bigger
                dreams.
              </p>
              <ul className="mt-4 space-y-2 font-[family-name:var(--font-dm-sans)] leading-8 text-mocha-300">
                <li>saves skincare reels at 2am</li>
                <li>believes lip balm fixes 70% of life problems</li>
                <li>thinks every girl deserves main-character energy</li>
              </ul>
              <p className="mt-4 font-[family-name:var(--font-dm-sans)] leading-8 text-mocha-300">
                I did not build this as an expert. I built this as one of you.
              </p>
            </motion.article>

            <motion.article
              variants={staggerItem}
              className="rounded-3xl border border-cream-300 bg-gradient-to-b from-cream-200 to-gold-100/70 p-6 md:p-8"
            >
              <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-3xl text-mocha-400">
                A tiny promise
              </h2>
              <p className="mt-4 font-[family-name:var(--font-dm-sans)] leading-8 text-mocha-300">
                Here, we do not chase perfection. We do not believe in fixing flaws.
              </p>
              <ul className="mt-4 space-y-2 font-[family-name:var(--font-dm-sans)] leading-8 text-mocha-300">
                {promiseLines.map((line) => (
                  <li key={line}>- {line}</li>
                ))}
              </ul>
              <p className="mt-4 font-[family-name:var(--font-cormorant-garamond)] text-2xl italic text-rose-500">
                You were always that girl.
              </p>
            </motion.article>
          </motion.div>

          <motion.section
            variants={sectionReveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-12 rounded-3xl border border-cream-300 bg-cream-200 p-6 md:p-10"
          >
            <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-4xl text-mocha-400">
              For you, always
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {forYouLines.map((line) => (
                <div
                  key={line}
                  className="rounded-2xl border border-cream-300 bg-cream-100 px-4 py-3 font-[family-name:var(--font-dm-sans)] text-sm text-mocha-300"
                >
                  {line}
                </div>
              ))}
            </div>
            <p className="mt-6 font-[family-name:var(--font-cormorant-garamond)] text-2xl italic text-mocha-400">
              If you have ever looked in the mirror and thought, &quot;I just want to feel
              a little more like myself again.&quot; This is for you.
            </p>
          </motion.section>

          <motion.section
            variants={sectionReveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-10 text-center"
          >
            <p className="mx-auto max-w-2xl font-[family-name:var(--font-dm-sans)] text-lg leading-9 text-mocha-300">
              So take your time, darling... answer a few questions, explore a little,
              and let us find what makes your skin and you glow.
            </p>
            <motion.div whileTap={{ scale: 0.97 }} className="mt-8 inline-flex">
              <Link
                href="/quiz"
                className="rounded-full border-2 border-rose-300 bg-rose-300 px-8 py-4 font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-wider text-mocha-400 transition-all duration-300 hover:border-rose-500 hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                Start My Glow Journey →
              </Link>
            </motion.div>
          </motion.section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

