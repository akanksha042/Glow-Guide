"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { sectionReveal } from "@/lib/motion";

type QuizValue = string;

interface QuizOption {
  value: QuizValue;
  label: string;
  subLabel?: string;
}

interface QuizQuestion {
  id: string;
  prompt: string;
  helper: string;
  options?: QuizOption[];
  isText?: boolean;
  placeholder?: string;
}

const praiseByQuestion: Record<string, string[]> = {
  name: [
    "Such a beautiful name, love 💖",
    "I adore that name already ✨",
  ],
  skinAfterWash: [
    "Got it, darling... I am taking notes 💕",
    "Your skin is telling me everything I need ✨",
  ],
  concern: [
    "We are going to take care of that, step by step 💫",
    "You deserve calm, happy skin 🫶",
  ],
  routine: [
    "I love your vibe already 😍",
    "We will build something perfect for you ✨",
  ],
  climate: [
    "Ahh that helps so much, sunshine 🌤️",
    "Your environment matters, and we will work with it 💖",
  ],
  budget: [
    "Perfect, we will stay right in your comfort zone 💎",
    "Smart queen energy, I love it 👑",
  ],
  sensitivity: [
    "Gentle care it is, darling 🌸",
    "We will treat your skin with extra love 💕",
  ],
  desire: [
    "That glow is already on its way ✨",
    "I can already picture your dream skin 😌💖",
  ],
  pamperFrequency: [
    "I love that energy, darling... your skin feels the love 💖",
    "Even a little care goes a long way, sunshine ✨",
    "We will make your routine feel effortless and beautiful 🫶",
  ],
  makeupStyle: [
    "Whether glam or bare, you are stunning either way 💕",
    "We love a versatile queen 😌✨",
    "Your glow, your rules... always 👑",
  ],
  glowTimeline: [
    "We will match your pace, my love 💫",
    "Your glow-up, your timeline... I am here for it 💖",
    "Slow or fast, we are getting you there beautifully ✨",
  ],
  ritualStyle: [
    "I see your vibe, and I adore it already 😍",
    "Your routine should feel like you 💕",
    "Effortless or indulgent... both are beautiful choices ✨",
  ],
  ingredientPreferences: [
    "Oh we are definitely noting that down, love 📝✨",
    "Your skin's preferences matter, always 💖",
    "We will keep the good and avoid the drama 😌🌸",
  ],
};

const quizQuestions: QuizQuestion[] = [
  {
    id: "name",
    prompt: "Before we begin, my love... what should I call you?",
    helper: "We want this to feel like it is made just for you.",
    isText: true,
    placeholder: "Type your beautiful name...",
  },
  {
    id: "skinAfterWash",
    prompt: "After washing your face, darling... does your skin feel dry, oily, or just right?",
    helper: "This helps us read your skin type more accurately.",
    options: [
      { value: "dry", label: "Dry and itchy", subLabel: "Feels tight quickly" },
      { value: "normal", label: "Soft and normal", subLabel: "Comfortable for hours" },
      { value: "oily", label: "Oily very soon", subLabel: "Shine appears quickly" },
      {
        value: "combination",
        label: "Oily T-zone, dry cheeks",
        subLabel: "A little bit of both",
      },
    ],
  },
  {
    id: "concern",
    prompt: "Tell me, sunshine... what skin concerns are bothering you the most right now?",
    helper: "Pick the concern you want us to prioritize first.",
    options: [
      { value: "acne", label: "Breakouts and acne" },
      { value: "pigmentation", label: "Pigmentation or marks" },
      { value: "dullness", label: "Skin looks dull and tired" },
      { value: "texture", label: "Uneven texture / bumps" },
      { value: "dark_circles", label: "Dark circles" },
    ],
  },
  {
    id: "routine",
    prompt: "What's your current skincare routine like, beautiful?",
    helper: "No judgment here, love. We start wherever you are.",
    options: [
      { value: "none", label: "Honestly, nothing right now" },
      { value: "basic", label: "Basic: cleanser + moisturizer" },
      { value: "full", label: "Full routine already" },
    ],
  },
  {
    id: "climate",
    prompt: "What kind of weather do you usually live in, love?",
    helper: "Climate changes everything in skincare.",
    options: [
      { value: "hot_humid", label: "Hot and humid" },
      { value: "dry_heat", label: "Dry heat" },
      { value: "moderate", label: "Mostly moderate" },
      { value: "cold", label: "Cold and dry" },
    ],
  },
  {
    id: "budget",
    prompt: "What's your comfortable budget for each product, queen?",
    helper: "We will keep things real and budget-smart.",
    options: [
      { value: "under_300", label: "Under Rs.300" },
      { value: "300_800", label: "Rs.300 - Rs.800" },
      { value: "800_1500", label: "Rs.800 - Rs.1500" },
      { value: "1500_plus", label: "Rs.1500+" },
    ],
  },
  {
    id: "sensitivity",
    prompt: "How sensitive is your skin, darling?",
    helper: "We will avoid harsh ingredients if needed.",
    options: [
      { value: "not_sensitive", label: "Not very sensitive" },
      { value: "mild", label: "Mildly sensitive" },
      { value: "very_sensitive", label: "Very sensitive, reacts easily" },
    ],
  },
  {
    id: "pamperFrequency",
    prompt: "Tell me, love... how often do you like to pamper your skin?",
    helper: "This helps us tune your routine to your real lifestyle.",
    options: [
      { value: "daily", label: "Daily, I love consistent care" },
      { value: "sometimes", label: "Sometimes, when I can" },
      { value: "when_i_remember", label: "Only when I remember 😄" },
    ],
  },
  {
    id: "makeupStyle",
    prompt: "Do you wear makeup often, or do you let your natural glow shine free?",
    helper: "We can adjust product textures around this beautifully.",
    options: [
      { value: "often", label: "I wear makeup often" },
      { value: "sometimes", label: "Sometimes, depending on the day" },
      { value: "rarely", label: "Mostly natural glow, minimal makeup" },
    ],
  },
  {
    id: "glowTimeline",
    prompt: "Are you looking for quick fixes or a long-term glow-up journey?",
    helper: "Both are valid, we just shape the routine differently.",
    options: [
      { value: "quick", label: "Quick visible improvements" },
      { value: "balanced", label: "A balance of quick and long-term" },
      { value: "long_term", label: "Long-term skin health journey" },
    ],
  },
  {
    id: "ritualStyle",
    prompt: "Do you prefer your skincare simple and effortless... or a full self-love ritual?",
    helper: "Your routine should fit your energy, not fight it.",
    options: [
      { value: "simple", label: "Simple and effortless" },
      { value: "medium", label: "A balanced routine" },
      { value: "ritual", label: "Full self-love ritual" },
    ],
  },
  {
    id: "ingredientPreferences",
    prompt: "Any ingredients your skin absolutely adores... or secretly hates?",
    helper: "Share any ingredient love/hate or past reactions.",
    isText: true,
    placeholder: "Example: Loves niacinamide, dislikes strong fragrance...",
  },
  {
    id: "desire",
    prompt: "How do you want your skin to feel, my love?",
    helper: "Say it in your own words. This line powers personalized recommendations.",
    isText: true,
    placeholder: "Example: Clear, calm, and confident...",
  },
];

// This function picks question-specific affirmations so each answer feels personal.
function pickPraise(questionId: string, index: number): string {
  const pool = praiseByQuestion[questionId] ?? ["Lovely answer, darling ✨"];
  return pool[index % pool.length];
}

export default function RoutinePage() {
  // This state keeps a step-by-step quiz experience with one card at a time.
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [praise, setPraise] = useState<string>("");
  const [textInput, setTextInput] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = quizQuestions[step];
  const progress = ((step + 1) / quizQuestions.length) * 100;
  const progressRounded = Math.round(isNaN(progress) ? 0 : progress);
  const isCompleted = step >= quizQuestions.length;
  const name = answers.name?.trim() || "darling";

  const summaryEntries = useMemo(
    () =>
      quizQuestions
        .map((q) => ({
          label: q.prompt,
          value: answers[q.id],
        }))
        .filter((entry) => entry.value),
    [answers],
  );

  // This function records card selection and advances with a praise cue.
  function handleOptionSelect(value: string): void {
    if (isTransitioning) return;
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);
    setPraise(pickPraise(currentQuestion.id, step));
    setIsTransitioning(true);
    window.setTimeout(() => {
      setPraise("");
      setStep((prev) => prev + 1);
      setTextInput("");
      setIsTransitioning(false);
    }, 1300);
  }

  // This function handles text questions and only proceeds when text is meaningful.
  function handleTextSubmit(): void {
    if (isTransitioning) return;
    const normalized = textInput.trim();
    if (!normalized) return;
    const nextAnswers = { ...answers, [currentQuestion.id]: normalized };
    setAnswers(nextAnswers);
    setPraise(pickPraise(currentQuestion.id, step));
    setIsTransitioning(true);
    window.setTimeout(() => {
      setPraise("");
      setStep((prev) => prev + 1);
      setTextInput("");
      setIsTransitioning(false);
    }, 1300);
  }

  // This function allows the user to move back and edit previous answers.
  function handleBack(): void {
    if (step <= 0 || isTransitioning) return;
    setStep((prev) => prev - 1);
    const prevQuestion = quizQuestions[step - 1];
    setTextInput(answers[prevQuestion.id] ?? "");
  }

  return (
    <div className="min-h-screen bg-cream-100 text-mocha-300">
      <Navbar />

      <main className="paper-grain relative overflow-hidden">
        <section className="mx-auto max-w-6xl px-6 py-10 md:py-16">
          <motion.div
            variants={sectionReveal}
            initial="initial"
            animate="whileInView"
            className="mx-auto max-w-3xl"
          >
            <p className="text-center font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.16em] text-gold-400">
              Your glow routine quiz
            </p>
            <h1 className="mt-4 text-center font-[family-name:var(--font-cormorant-garamond)] text-4xl text-mocha-400 md:text-6xl">
              One lovely question at a time.
            </h1>

            <div className="mt-8">
              <div className="h-1.5 rounded-full bg-cream-300">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${isCompleted ? 100 : progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-1.5 rounded-full bg-rose-300"
                />
              </div>
              <p className="mt-3 text-center font-[family-name:var(--font-dm-sans)] text-sm text-mocha-200">
                Creating your glow... ✨ ({isCompleted ? 100 : progressRounded}%)
              </p>
              <p className="mt-1 text-center font-[family-name:var(--font-dm-sans)] text-xs text-mocha-200">
                Step {Math.min(step + 1, quizQuestions.length)} of {quizQuestions.length}
              </p>
            </div>
          </motion.div>

          <div className="mx-auto mt-10 max-w-xl">
            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="rounded-3xl border border-cream-300 bg-gradient-to-b from-cream-200 to-rose-100/70 p-6 md:p-8"
                >
                  <h2 className="font-[family-name:var(--font-cormorant-garamond)] text-4xl text-mocha-400">
                    {name}, your glow profile is ready ✨
                  </h2>
                  <p className="mt-3 font-[family-name:var(--font-dm-sans)] leading-8 text-mocha-300">
                    Stunning answers. Next, we can connect this profile to the recommendation
                    engine and generate your personalized routine cards.
                  </p>

                  <div className="mt-6 space-y-3">
                    {summaryEntries.map((entry) => (
                      <div
                        key={entry.label}
                        className="rounded-2xl border border-cream-300 bg-cream-100 px-4 py-3"
                      >
                        <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.12em] text-mocha-200">
                          {entry.label}
                        </p>
                        <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-mocha-300">
                          {entry.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="rounded-3xl border border-cream-300 bg-gradient-to-b from-cream-200 to-rose-100/60 p-6 md:p-8"
                >
                  <p className="inline-flex rounded-full bg-gold-100 px-3 py-1 font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-[0.16em] text-gold-400">
                    question {step + 1}
                  </p>
                  <h2 className="mt-4 font-[family-name:var(--font-cormorant-garamond)] text-3xl text-mocha-400 md:text-4xl">
                    {currentQuestion.prompt}
                  </h2>
                  <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-base leading-8 text-mocha-300">
                    {currentQuestion.helper}
                  </p>

                  <div className="mt-2 min-h-10">
                    <AnimatePresence mode="wait">
                      {praise ? (
                        <motion.div
                          key={praise}
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="rounded-2xl border border-rose-200 bg-rose-100/80 px-4 py-3"
                        >
                          <p className="text-center font-[family-name:var(--font-cormorant-garamond)] text-2xl italic text-rose-500">
                            {praise}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <div className="mt-2">
                    {currentQuestion.isText ? (
                      <div>
                        <label
                          htmlFor="quiz-text-input"
                          className="font-[family-name:var(--font-dm-sans)] text-sm text-mocha-300"
                        >
                          Your answer
                        </label>
                        <textarea
                          id="quiz-text-input"
                          value={textInput}
                          onChange={(event) => setTextInput(event.target.value)}
                          placeholder={currentQuestion.placeholder}
                          disabled={isTransitioning}
                          className="mt-2 min-h-28 w-full rounded-2xl border-2 border-cream-300 bg-cream-100 px-4 py-3 font-[family-name:var(--font-dm-sans)] text-base text-mocha-300 outline-none transition-all focus:border-rose-300 focus:ring-2 focus:ring-rose-300"
                        />
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <button
                            onClick={handleBack}
                            disabled={step === 0 || isTransitioning}
                            className="rounded-full border-2 border-rose-300 px-5 py-2 font-[family-name:var(--font-dm-sans)] text-sm text-mocha-300 transition-all duration-300 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            ← Back
                          </button>
                          <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={handleTextSubmit}
                            disabled={isTransitioning}
                            className="rounded-full border-2 border-rose-300 bg-rose-300 px-6 py-3 font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-wider text-mocha-400 transition-all duration-300 hover:border-rose-500 hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-200"
                          >
                            Lovely, next →
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        {currentQuestion.options?.map((option) => (
                          <motion.button
                            key={option.value}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleOptionSelect(option.value)}
                            disabled={isTransitioning}
                            className="rounded-2xl border-2 border-cream-300 bg-cream-100 px-5 py-4 text-left transition-all duration-200 hover:border-rose-300 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300"
                          >
                            <p className="font-[family-name:var(--font-dm-sans)] text-base text-mocha-300">
                              {option.label}
                            </p>
                            {option.subLabel ? (
                              <p className="mt-1 font-[family-name:var(--font-dm-sans)] text-sm text-mocha-200">
                                {option.subLabel}
                              </p>
                            ) : null}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    {!currentQuestion.isText ? (
                      <button
                        onClick={handleBack}
                        disabled={step === 0 || isTransitioning}
                        className="rounded-full border-2 border-rose-300 px-5 py-2 font-[family-name:var(--font-dm-sans)] text-sm text-mocha-300 transition-all duration-300 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ← Back
                      </button>
                    ) : (
                      <span />
                    )}
                    <p className="font-[family-name:var(--font-dm-sans)] text-sm text-mocha-200">
                      {isTransitioning ? "Saving your glow answer..." : "Take your time, love."}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

