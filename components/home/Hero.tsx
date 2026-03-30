"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { floatSoft, sectionReveal, sparkleFloat } from "@/lib/motion";

const ingredientWords = [
  { label: "niacinamide", classes: "left-[8%] top-[16%] -rotate-12" },
  { label: "vitamin C", classes: "right-[12%] top-[24%] rotate-12" },
  { label: "SPF 50", classes: "left-[18%] bottom-[28%] rotate-6" },
  { label: "retinol", classes: "right-[22%] bottom-[20%] -rotate-6" },
  { label: "hyaluronic acid", classes: "left-[40%] top-[44%] -rotate-3" },
];

export default function Hero() {
  // The hero gives an immediate emotional hook and clear next action.
  return (
    <section className="paper-grain relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-gradient-to-b from-cream-100 via-rose-100/40 to-cream-100 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,theme(colors.gold.100),transparent_45%),radial-gradient(circle_at_80%_80%,theme(colors.rose.100),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0">
        {ingredientWords.map((word, index) => (
          <motion.span
            key={word.label}
            variants={floatSoft}
            initial="initial"
            animate="animate"
            transition={{
              duration: 4 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute select-none font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-[0.2em] text-mocha-300 opacity-[0.03] md:text-base ${word.classes}`}
          >
            {word.label}
          </motion.span>
        ))}
        <motion.span
          variants={sparkleFloat}
          initial="initial"
          animate="animate"
          className="absolute left-[22%] top-[22%] font-[family-name:var(--font-cormorant-garamond)] text-2xl text-gold-300/70"
        >
          ✦
        </motion.span>
        <motion.span
          variants={sparkleFloat}
          initial="initial"
          animate="animate"
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[16%] top-[38%] font-[family-name:var(--font-cormorant-garamond)] text-xl text-rose-400/70"
        >
          ✦
        </motion.span>
      </div>

      <motion.div
        variants={sectionReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, amount: 0.35 }}
        className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center"
      >
        <div className="max-w-xl">
          <p className="mb-4 font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.18em] text-gold-400">
            Your skin. Your routine. Your glow.
          </p>
          <h1 className="font-[family-name:var(--font-cormorant-garamond)] text-5xl font-light leading-tight text-mocha-400 sm:text-6xl lg:text-7xl">
            Finally. Skincare that{" "}
            <span className="italic">actually</span> gets Indian skin.
          </h1>
          <p className="mt-6 font-[family-name:var(--font-dm-sans)] text-base leading-8 text-mocha-300 md:text-lg">
            Tell us about your skin, your lifestyle, and your goals. We craft a
            routine that feels like a warm conversation, deeply personal and
            beautifully made for you.
          </p>
          <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-sm leading-7 text-mocha-200">
            Gentle, thoughtful, and made to make you feel seen from the very
            first step.
          </p>
          <motion.div whileTap={{ scale: 0.97 }} className="mt-10 inline-flex">
            <Link
              href="/quiz"
              className="inline-flex rounded-full border-2 border-rose-300 bg-rose-300 px-8 py-4 font-[family-name:var(--font-dm-sans)] text-sm font-medium uppercase tracking-wider text-mocha-400 transition-all duration-300 hover:border-rose-500 hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              Find My Routine →
            </Link>
          </motion.div>
        </div>

        <motion.div
          whileHover={{
            y: -4,
            transition: { duration: 0.2 },
          }}
          className="rounded-3xl border border-cream-300 bg-gradient-to-br from-cream-200 via-rose-100/70 to-sage-100 p-8 shadow-sm transition-shadow duration-300 hover:shadow-[0_10px_30px_-20px_rgba(212,160,144,0.8)]"
        >
          <p className="inline-flex rounded-full bg-rose-200 px-3 py-1 font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.12em] text-mocha-300">
            Made for Indian skin
          </p>
          <p className="font-[family-name:var(--font-cormorant-garamond)] text-3xl text-mocha-400">
            Thoughtful recommendations, not random products.
          </p>
          <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-base leading-8 text-mocha-300">
            Designed for Indian weather, real concerns like acne and
            pigmentation, and budgets that make sense. Your glow plan should
            feel like trusted advice from someone who truly understands your
            skin.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
