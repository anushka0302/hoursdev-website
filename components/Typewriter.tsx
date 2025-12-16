'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
  startDelay?: number;
}

export default function Typewriter({ text, className = "", startDelay = 0 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Starts when 50% visible

  useEffect(() => {
    if (!isInView) return;

    let typingInterval: NodeJS.Timeout;

    const startTyping = () => {
      let currentIndex = 0;
      typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50); // Typing speed (ms per character)
    };

    const startTimeout = setTimeout(startTyping, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [isInView, text, startDelay]);

  return (
    <span ref={ref} className={`${className} font-mono inline-flex items-center`}>
      {/* The Text */}
      <span className="text-blue-400 mr-1">&gt;</span> {/* Terminal Arrow */}
      {displayedText}
      
      {/* Blinking Cursor */}
      <motion.span
        // Keyframes: Stay visible (1) then snap to invisible (0)
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
          // Times: 0-50% = visible, 50-100% = invisible (Hard blink)
          times: [0, 0.5, 0.5, 1] 
        }}
        className="inline-block w-[2px] h-[1.2em] bg-blue-400 ml-1 align-text-bottom"
      />
    </span>
  );
}