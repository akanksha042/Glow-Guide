import type { Variants } from "framer-motion";

export const easing = "easeOut";

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const sectionReveal: Variants = {
  initial: { opacity: 0, y: 18 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easing },
  },
};

export const staggerContainer: Variants = {
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 16 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easing },
  },
};

export const floatSoft: Variants = {
  initial: { y: 0, opacity: 0.03 },
  animate: {
    y: [0, -6, 0],
    opacity: [0.03, 0.05, 0.03],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

export const sparkleFloat: Variants = {
  initial: { opacity: 0.25, y: 0 },
  animate: {
    opacity: [0.25, 0.7, 0.25],
    y: [0, -6, 0],
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
};

