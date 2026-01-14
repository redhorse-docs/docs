"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Fade up animation for sections
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Stagger container for cards
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Card item animation
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Scale up animation
export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
};

export function FadeUp({
  children,
  className,
  delay = 0,
  once = true,
}: MotionWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  once = true,
}: MotionWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={cardVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function ScaleUp({
  children,
  className,
  delay = 0,
  once = true,
}: MotionWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, scale: 0.85 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Re-export motion for direct use
export { motion };
