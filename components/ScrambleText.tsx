'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number; // Delay before starting scramble
  duration?: number; // Total scramble duration in ms
}

export default function ScrambleText({
  text,
  className = '',
  delay = 0,
  duration = 1500,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let startTime: number;

    const startScramble = () => {
      setIsScrambling(true);
      startTime = Date.now();

      interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Calculate how many characters should be revealed based on progress
        const revealedChars = Math.floor(progress * text.length);

        // FIXED: removed space between "new" and "Text"
        let newText = ''; 
        for (let i = 0; i < text.length; i++) {
          if (i < revealedChars) {
            // Reveal the actual character
            newText += text[i];
          } else {
            // Show a random character based on a randomized index
            const randomCharIndex = Math.floor(Math.random() * CHARS.length);
            newText += CHARS[randomCharIndex];
          }
        }

        setDisplayText(newText);

        if (progress >= 1) {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text); // Ensure final text is correct
        }
      }, 50); // Update every 50ms for a busy tech feel
    };

    const timeout = setTimeout(startScramble, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${className} inline-block font-mono`} // font-mono enhances the tech feel during scramble
    >
      {displayText}
    </motion.span>
  );
}