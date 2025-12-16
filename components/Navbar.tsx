'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'Agency' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  // State to track if the menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the state
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-6 py-6 flex justify-between items-center z-50 mix-blend-difference text-white uppercase tracking-wider text-sm">
        
        {/* Logo Image linked to homepage */}
        <Link href="/" className="block relative z-50">
          <Image
            src="/white_logo.png" 
            alt="Hoursdev Logo"
            width={150} 
            height={50}  
            // Maintained your specific sizing: h-20 on mobile and desktop
            className="w-auto h-20 md:h-20 object-contain"
            priority 
          />
        </Link>
        
        {/* Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              className="hover:underline underline-offset-4 decoration-1 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button (Visible on Mobile) */}
        {/* Added onClick handler here to make it work */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden relative z-50 text-white focus:outline-none font-bold"
        >
          {isOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {/* Mobile Menu Overlay Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center md:hidden"
          >
            {/* Background Tech Grid for Mobile Menu */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

            <div className="flex flex-col gap-8 text-center relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                >
                  <Link 
                    href={link.href} 
                    onClick={toggleMenu} // Closes menu when a link is clicked
                    className="text-4xl font-bold tracking-tighter hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile CTA */}
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
                 className="mt-8"
              >
                  <Link 
                    href="/contact"
                    onClick={toggleMenu}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200"
                  >
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