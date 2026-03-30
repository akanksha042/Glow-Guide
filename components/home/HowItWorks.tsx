"use client";

import { motion } from "framer-motion";
import { sectionReveal, staggerContainer, staggerItem } from "@/lib/motion";

const steps = [
  {
    number: "01",
    title: "Answer a few thoughtful questions",
    description:
      "Share your skin type, concerns, lifestyle, and budget in under four minutes.",
  },
  {
    number: "02",
    title: "AI analyzes your skin profile",
    description:
      "We match your responses with ingredient logic and product suitability for Indian skin needs.",
  },
  {
    number: "03",
    title: "Get your personalized routine",
    description:
      "Receive a clear morning and night plan with product picks and simple ingredient insights.",
  },
];

export default function HowItWorks() {
  // This section reduces uncertainty by making the journey feel simple and guided.
  return (
    <motion.section
      variants={sectionReveal}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount: 0.25 }}
      className="paper-grain relative bg-gradient-to-b from-cream-100 via-sage-100/40 to-cream-100 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-4xl text-mocha-400 sm:text-5xl">
            How it works
          </h2>
          <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-base leading-8 text-mocha-300">
            A soft, guided experience that turns confusion into clarity in just
            a few moments.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-3xl"
        >
          <motion.svg
            viewBox="0 0 600 80"
            aria-hidden
            className="h-10 w-full text-rose-200"
            fill="none"
          >
            <motion.path
              d="M20 40 C120 10, 220 70, 320 40 S520 10, 580 40"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.5 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <motion.path
              d="M40 52 C140 22, 240 82, 340 52 S540 22, 560 52"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.5 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeInOut" }}
            />
          </motion.svg>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.article
              key={step.number}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-3xl border border-cream-300 bg-gradient-to-b from-cream-200 to-rose-100/60 p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_10px_30px_-18px_rgba(201,169,110,0.45)] md:p-8"
            >
              <p className="inline-flex rounded-full bg-gold-100 px-3 py-1 font-[family-name:var(--font-dm-sans)] text-sm font-medium tracking-[0.18em] text-gold-300">
                {step.number}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-cormorant-garamond)] text-3xl text-mocha-400">
                {step.title}
              </h3>
              <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-base leading-8 text-mocha-300">
                {step.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
