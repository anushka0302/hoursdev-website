'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'Agency' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Desktop threshold is usually higher (100), but for mobile shrink
    // we want it to react quickly (50px)
    const threshold = 50;
    if (latest > threshold && !isScrolled) setIsScrolled(true);
    else if (latest <= threshold && isScrolled) setIsScrolled(false);
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  // Smooth physics
  const smoothTransition = { 
    type: "spring" as const, 
    stiffness: 70,    
    damping: 20,      
    mass: 1           
  };

  return (
    <>
      {/* =========================================================
          DESKTOP NAV (Side Dock Animation)
          Hidden on Mobile (md:flex)
      ========================================================== */}
      <motion.header
        layout
        transition={smoothTransition}
        className={`hidden md:flex fixed z-50 mix-blend-difference 
          ${isScrolled 
            ? "flex-col items-end right-8 top-1/2 -translate-y-1/2 gap-8" 
            : "flex-row justify-between items-center top-6 left-0 w-full px-6" 
          }
        `}
      >
        <motion.div layout transition={smoothTransition} className="relative">
          <Link href="/" className="block">
            <motion.img 
              layout="position"
              src="/white_logo.png" 
              alt="Hoursdev Logo"
              className={`object-contain ${isScrolled ? 'h-16 w-auto' : 'h-20 w-auto'}`}
            />
          </Link>
        </motion.div>

        <motion.nav 
          layout
          transition={smoothTransition}
          className={`flex ${isScrolled ? "flex-col items-end gap-6" : "flex-row gap-10"} uppercase tracking-widest text-xs font-semibold text-white`}
        >
          {navLinks.map((link) => (
            <motion.div key={link.label} layout transition={smoothTransition}>
              <Link href={link.href} className="group relative hover:text-purple-400 transition-colors duration-300 block">
                {link.label}
                <span className={`absolute bg-purple-500 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${isScrolled ? "top-1/2 -right-4 w-2 h-2 -translate-y-1/2" : "-bottom-2 left-1/2 -translate-x-1/2 w-1 h-1"}`}></span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </motion.header>

      {/* =========================================================
          MOBILE NAV (Sticky Shrink)
          Visible on Mobile (md:hidden)
      ========================================================== */}
      
      {/* 1. MOBILE HEADER CONTAINER 
          Using fixed positioning. We animate the 'top' and 'padding' 
          based on scroll state to pull it into the corner.
      */}
      <div className={`md:hidden fixed left-0 w-full z-50 flex justify-between items-center mix-blend-difference transition-all duration-500 ease-in-out
          ${isScrolled 
            ? "top-2 px-4"  // SCROLLED: Tighter to corners (Small gap)
            : "top-6 px-6"  // TOP: Standard spacing (Large gap)
          }
        `}
      >
        {/* Mobile Logo */}
        <Link href="/" className="block">
          <div className={`relative transition-all duration-500 ease-in-out origin-left
              ${isScrolled 
                ? "w-24 h-8"   // SCROLLED: Smaller Logo
                : "w-32 h-12"  // TOP: Standard Logo
              }
            `}
          >
             <Image 
               src="/white_logo.png" 
               alt="Hoursdev Logo" 
               fill
               className="object-contain object-left"
               priority
             />
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className={`text-white focus:outline-none font-bold uppercase tracking-wider transition-all duration-500
            ${isScrolled ? "text-xs" : "text-sm"}
          `}
        >
          {isOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* =========================================================
          MOBILE MENU OVERLAY
      ========================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center md:hidden"
          >
             <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

             <div className="flex flex-col gap-8 text-center relative z-10 text-white">
               {navLinks.map((link, i) => (
                 <motion.div
                   key={link.label}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 + (i * 0.1) }}
                 >
                   <Link href={link.href} onClick={toggleMenu} className="text-4xl font-bold tracking-tighter">
                     {link.label}
                   </Link>
                 </motion.div>
               ))}
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
                 <Link href="/contact" onClick={toggleMenu} className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 inline-block">
                   Start Project
                 </Link>
               </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}