"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { sectionReveal, staggerContainer, staggerItem } from "@/lib/motion";

const sections = [
  {
    title: "WATERRRRRR",
    emoji: "💧",
    intro:
      "Yes. I am shouting. Because why are you buying expensive serums but forgetting to drink actual water?",
    body: "Go drink water right now. I will wait. Dehydrated darling... your skin is tired.",
    bullets: [
      "plumper skin",
      "natural glow",
      "fewer breakouts",
      "basic survival energy",
    ],
  },
  {
    title: "BEAUTY SLEEP",
    emoji: "😴",
    intro:
      'That "just one more reel" at 2:47am is ruining your glow, love.',
    body: "Your skin repairs itself while you sleep. Give her the chance.",
    bullets: ["reduces dark circles", "helps skin repair", "makes you look alive"],
  },
  {
    title: "MOVEMENT",
    emoji: "🧘‍♀️",
    intro:
      "No, walking to the fridge does not count. Move your body. Dance. Stretch.",
    body: "Even a tiny bit improves circulation, and circulation is nature's glow serum.",
    bullets: [
      "better oxygen flow",
      "less stress",
      "that post-workout glow you know and love",
    ],
  },
  {
    title: "ACTUAL FOOD",
    emoji: "🍓",
    intro:
      "Babes... you cannot out-skincare a bad diet. Iced coffee and vibes is not a meal.",
    body: "Eat something green. Eat something real. Eat like you love yourself.",
    bullets: ["fruits", "veggies", "nuts", "less sugar and caffeine overload"],
  },
  {
    title: "SUNLIGHT",
    emoji: "🌞",
    intro:
      "A little sunlight gives you vitamin D, better mood, and better skin rhythm.",
    body: "Touch grass energy is real. And yes, sunscreen too. Do not fight me.",
    bullets: ["improves mood", "supports skin health", "helps reset your day"],
  },
  {
    title: "STRESS LESS",
    emoji: "😌",
    intro:
      "Your skin feels your stress. Every spiral, every overthinking session.",
    body: "You deserve calm. Your skin does too.",
    bullets: ["journaling", "deep breaths", "doing nothing for a little while"],
  },
  {
    title: "SELF-LOVE",
    emoji: "💕",
    intro:
      "No cream can fix how you talk to yourself. Kind words are skincare too.",
    body: "Be softer with yourself, darling. You deserve that.",
    bullets: ["speak kindly to yourself", "celebrate small wins", "choose care over criticism"],
  },
];

const floatingCallouts = [
  "Be honest... when did you last change your pillowcase? 👀",
  "This is your reminder to stop touching your face, love 😭",
  "Hydration check... water or just iced coffee again? 💀",
  "Your skin remembers everything, darling 😌",
  "Did you sleep properly... or just emotionally scroll? 🌙",
  "Go outside for 5 minutes. Yes, I am serious 🌿",
  "Your future glowing self is watching you right now 👀✨",
  "You deserve effort... even from yourself 💖",
  "Not you skipping skincare and expecting miracles 😭",
  "Take a deep breath... unclench your jaw, sunshine 🌸",
];

export default function SecretsPage() {
  // These states control a sequential, timed callout experience.
  const [hasTriggeredCallouts, setHasTriggeredCallouts] = useState(false);
  const [activeCalloutIndex, setActiveCalloutIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const timersRef = useRef<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 180 && !hasTriggeredCallouts) {
      setHasTriggeredCallouts(true);
    }
  });

  useEffect(() => {
    if (!hasTriggeredCallouts) return;

    const showFirst = window.setTimeout(() => setActiveCalloutIndex(0), 300);
    timersRef.current = [showFirst];
    intervalRef.current = window.setInterval(() => {
      setActiveCalloutIndex((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % floatingCallouts.length;
      });
    }, 5000);

    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hasTriggeredCallouts]);

  return (
    <div className="min-h-screen bg-cream-100 text-mocha-300">
      <Navbar />

      <div className="sticky top-20 z-40 border-b border-cream-300 bg-cream-100/90 px-6 py-2 text-center backdrop-blur-sm">
        <p className="font-[family-name:var(--font-dm-sans)] text-xs tracking-wide text-mocha-200">
          No products were used in this advice... just common sense and a little love.
        </p>
      </div>

      <main className="paper-grain relative overflow-hidden">
        <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <motion.div
            variants={sectionReveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.16em] text-gold-400">
              Secrets
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-cormorant-garamond)] text-5xl text-mocha-400 md:text-6xl">
              Ingredients... or things you keep ignoring, darling.
            </h1>
            <p className="mt-6 font-[family-name:var(--font-dm-sans)] text-lg leading-9 text-mocha-300">
              Welcome to the most honest skincare page on the internet. No fancy serums,
              no complicated acids. Just what your skin has been asking for all along.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid gap-6 md:grid-cols-2"
          >
            {sections.map((section) => (
              <motion.article
                key={section.title}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-3xl border border-cream-300 bg-gradient-to-b from-cream-200 to-rose-100/60 p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_10px_30px_-18px_rgba(212,160,144,0.7)] md:p-8"
              >
                <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.16em] text-gold-400">
                  {section.emoji} Secret
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-cormorant-garamond)] text-4xl text-mocha-400">
                  {section.title}
                </h2>
                <p className="mt-4 font-[family-name:var(--font-dm-sans)] leading-8 text-mocha-300">
                  {section.intro}
                </p>
                <p className="mt-3 font-[family-name:var(--font-dm-sans)] leading-8 text-mocha-300">
                  {section.body}
                </p>
                <div className="mt-5 rounded-2xl border border-cream-300 bg-cream-100 p-4">
                  <p className="font-[family-name:var(--font-cormorant-garamond)] text-2xl italic text-rose-500">
                    Why it matters
                  </p>
                  <ul className="mt-3 space-y-2 font-[family-name:var(--font-dm-sans)] text-sm leading-7 text-mocha-300">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>- {bullet}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.section
            variants={sectionReveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-12 rounded-3xl border border-cream-300 bg-gradient-to-br from-cream-200 via-rose-100/70 to-sage-100 p-6 md:p-10"
          >
            <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-4xl text-mocha-400">
              Final warning (lovingly)
            </h2>
            <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-lg leading-9 text-mocha-300">
              You can buy all the products in the world... but if you ignore these, your
              skin will personally come complain to me.
            </p>
            <p className="mt-4 font-[family-name:var(--font-dm-sans)] text-lg leading-9 text-mocha-300">
              Drink your water, sleep on time, move a little, eat something real... and
              stop being so mean to yourself.
            </p>
            <p className="mt-4 font-[family-name:var(--font-cormorant-garamond)] text-3xl italic text-rose-500">
              Now go glow properly, sunshine.
            </p>
          </motion.section>
        </section>

        <div className="pointer-events-none fixed bottom-6 right-6 z-40 max-w-[280px]">
          <AnimatePresence mode="wait">
            {activeCalloutIndex !== null ? (
              <motion.div
                key={`callout-${activeCalloutIndex}`}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-2xl border border-rose-200 bg-rose-100/90 px-4 py-3 shadow-md backdrop-blur-sm"
              >
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-mocha-300">
                  {floatingCallouts[activeCalloutIndex]}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

