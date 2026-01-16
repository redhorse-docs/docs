"use client";

import { motion } from "framer-motion";

export function BackgroundPaths() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* SVG Paths */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Path 1 - Large flowing curve from top-left */}
        <motion.path
          d="M-100 200 Q 300 100, 500 300 T 900 250 T 1300 400 T 1600 300"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
        />

        {/* Path 1 glow */}
        <motion.path
          d="M-100 200 Q 300 100, 500 300 T 900 250 T 1300 400 T 1600 300"
          stroke="url(#gradient1)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          className="blur-md"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
        />

        {/* Path 2 - Mid curve */}
        <motion.path
          d="M-50 500 Q 200 400, 400 550 T 800 480 T 1200 600 T 1550 500"
          stroke="url(#gradient2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, ease: "easeOut", delay: 1 }}
        />

        {/* Path 2 glow */}
        <motion.path
          d="M-50 500 Q 200 400, 400 550 T 800 480 T 1200 600 T 1550 500"
          stroke="url(#gradient2)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          className="blur-md"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 4, ease: "easeOut", delay: 1 }}
        />

        {/* Path 3 - Bottom curve */}
        <motion.path
          d="M-100 750 Q 250 650, 500 780 T 950 700 T 1400 800 T 1600 720"
          stroke="url(#gradient3)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 5, ease: "easeOut", delay: 1.5 }}
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E0323A" stopOpacity="0" />
            <stop offset="20%" stopColor="#E0323A" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#6a5efb" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#E0323A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6a5efb" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6a5efb" stopOpacity="0" />
            <stop offset="30%" stopColor="#6a5efb" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#E0323A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E0323A" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating particles/dots */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[--rh-primary]"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
}
