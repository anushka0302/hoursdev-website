'use client';

// FIX: Added 'React' and 'ChangeEvent' to imports to solve the type errors
import React, { useState, ChangeEvent } from 'react';
import ScrambleText from '@/components/ScrambleText';
import Typewriter from '@/components/Typewriter';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { submitContactForm } from '../actions'; 

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

// --- SERVICE OPTIONS ---
const serviceOptions = [
  "Web Development",
  "Data Engineering",
  "App Development",
  "Migration",
  "Other"
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formLocked, setFormLocked] = useState(false); // Success State

  // Phone State
  const [phoneValue, setPhoneValue] = useState("");

  // Custom Dropdown State
  const [serviceOpen, setServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);

  // Phone Formatter (FIX: Using ChangeEvent correctly)
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
    let formatted = input;
    
    // Formatting logic: +91 99999 99999
    if (input.length > 0) {
        // If user types more than just country code, start formatting
        if (input.length <= 5) {
            formatted = input; 
        } else {
            formatted = `+${input.slice(0, 2)} ${input.slice(2, 7)} ${input.slice(7, 12)}`;
        }
    }
    setPhoneValue(formatted);
  };

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);

    // 1. HONEYPOT CHECK
    if (formData.get('bot_field')) {
        setIsSubmitting(false);
        return;
    }

    // 2. Append Custom Fields
    formData.append('service', selectedService);
    // Ensure mobile number is sent even if not fully typed
    if (!formData.get('mobile')) {
         formData.append('mobile', phoneValue);
    }

    await submitContactForm(formData);
    
    setIsSubmitting(false);
    setFormLocked(true); // Lock UI
    setShowToast(true);  // Show Toast
    setTimeout(() => setShowToast(false), 8000);
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* LAYER 0: ALIVE GEOMETRIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[20%] w-[60%] h-[60%] bg-purple-900/10 blur-[80px] md:blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[60px] md:blur-[100px] rounded-full mix-blend-screen" />
        
        <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 180, repeat: Infinity, ease: "linear" }} 
            className="absolute top-[-30%] left-[-20%] md:left-[-10%] w-[100vh] h-[100vh] md:w-[130vh] md:h-[130vh] border-2 border-white/5 rounded-full" 
        />
        <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }} 
            className="absolute bottom-[-20%] right-[-20%] md:right-[-10%] w-[80vh] h-[80vh] md:w-[90vh] md:h-[90vh] border-2 border-dashed border-white/10 rounded-full" 
        />
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        <motion.div initial={{ top: "-100%" }} animate={{ top: "100%" }} transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute left-[50%] w-[1px] h-[40%] bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50" />
      </div>

      {/* LAYER 1: CONTENT */}
      <div className="relative z-10 pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 max-w-[1400px] mx-auto min-h-screen flex flex-col md:flex-row gap-12 md:gap-20">
        
        {/* Left Content */}
        <motion.div className="md:w-1/2" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-6 md:mb-8 leading-[0.9]">
            <ScrambleText text="LET'S" delay={200} /> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white w-fit">
               <ScrambleText text="TALK." delay={600} />
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 mb-8 md:mb-12 max-w-lg leading-relaxed">
            Have a project in mind? Looking to migrate your data? Send us a message and we&apos;ll get back to you within 24 hours.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="space-y-6 md:space-y-8 text-base md:text-lg">
            <div className="group cursor-pointer">
              <span className="text-gray-500 block text-xs uppercase tracking-widest mb-1 group-hover:text-blue-400 transition-colors">Email</span>
              <span className="text-xl md:text-2xl font-light border-b border-transparent group-hover:border-white transition-all break-all">hello@hoursdev.com</span>
            </div>
            <div className="group cursor-pointer">
              <span className="text-gray-500 block text-xs uppercase tracking-widest mb-1 group-hover:text-blue-400 transition-colors">Phone</span>
               <span className="text-xl md:text-2xl font-light border-b border-transparent group-hover:border-white transition-all">+91 910 549 8001</span>
            </div>
            <div className="group cursor-pointer">
              <span className="text-gray-500 block text-xs uppercase tracking-widest mb-1 group-hover:text-blue-400 transition-colors">Location</span>
               <span className="text-xl md:text-2xl font-light border-b border-transparent group-hover:border-white transition-all">Uttarakhand, India</span>
            </div>
          </motion.div>

          {/* TERMINAL DECORATION */}
          <motion.div variants={fadeInUp} className="mt-16 p-4 rounded-lg bg-black/50 border border-white/10 font-mono text-xs text-gray-500 w-fit hidden md:block backdrop-blur-sm">
              <div className="flex gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <div className="text-green-500">
                  <Typewriter text="> ESTABLISHING SECURE CONNECTION..." startDelay={1000} />
              </div>
              <div className="text-blue-400">
                   <Typewriter text="> READY FOR TRANSMISSION" startDelay={3000} />
              </div>
              <div className="text-gray-400 animate-pulse">
                   <Typewriter text="> WAITING_FOR_INPUT..." startDelay={5000} />
              </div>
          </motion.div>
        </motion.div>

        {/* Right Form */}
        <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          <div className="bg-white/5 backdrop-blur-xl p-6 md:p-12 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl relative overflow-visible group">
            
            {/* SUCCESS OVERLAY */}
            <AnimatePresence>
                {formLocked && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="absolute inset-0 z-50 bg-[#050505]/95 flex flex-col items-center justify-center text-center p-8 backdrop-blur-md rounded-3xl border border-blue-500/30"
                    >
                        <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-6"
                        >
                            <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">TRANSMISSION COMPLETE</h3>
                        <p className="text-gray-400 text-base max-w-xs">We have received your signal. Our team will establish contact within 24 hours.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <form action={handleSubmit} className="flex flex-col gap-6 md:gap-8 relative z-10">
              
              {/* HONEYPOT */}
              <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" />

              {/* Name Field */}
              <div className="flex flex-col gap-2 group/input">
                <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-blue-400 transition-colors">Name</label>
                <input type="text" name="name" className="bg-transparent border-b border-white/20 focus:border-blue-400 outline-none py-2 md:py-3 text-base md:text-lg transition-colors placeholder:text-gray-700 text-white" placeholder="Jane Doe" required />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2 group/input">
                <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-blue-400 transition-colors">Email</label>
                <input type="email" name="email" className="bg-transparent border-b border-white/20 focus:border-blue-400 outline-none py-2 md:py-3 text-base md:text-lg transition-colors placeholder:text-gray-700 text-white" placeholder="jane@company.com" required />
              </div>

              {/* Mobile Number Field (Formatted) */}
              <div className="flex flex-col gap-2 group/input">
                <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-blue-400 transition-colors">Mobile Number</label>
                <input 
                    type="tel" 
                    name="mobile" 
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    className="bg-transparent border-b border-white/20 focus:border-blue-400 outline-none py-2 md:py-3 text-base md:text-lg transition-colors placeholder:text-gray-700 text-white" 
                    placeholder="+91 98765 43210" 
                />
              </div>

              {/* Service Interest (Custom Dropdown) */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-xs uppercase tracking-widest text-gray-500">Service Interest</label>
                
                <button 
                  type="button" 
                  onClick={() => setServiceOpen(!serviceOpen)}
                  className="text-left bg-transparent border-b border-white/20 focus:border-blue-400 outline-none py-2 md:py-3 text-base md:text-lg text-white flex justify-between items-center group/btn"
                >
                  <span className="font-light">{selectedService}</span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform ${serviceOpen ? 'rotate-180' : ''} group-focus/btn:text-blue-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {serviceOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 w-full bg-[#0a0a0a] border border-white/10 rounded-xl mt-2 overflow-hidden z-50 shadow-2xl"
                    >
                      {serviceOptions.map((opt) => (
                        <div 
                          key={opt}
                          onClick={() => { setSelectedService(opt); setServiceOpen(false); }}
                          className="px-4 py-3 hover:bg-blue-900/20 hover:text-blue-400 cursor-pointer text-sm text-gray-300 transition-colors border-b border-white/5 last:border-0"
                        >
                          {opt}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2 group/input">
                <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-blue-400 transition-colors">Message</label>
                <textarea name="message" rows={4} className="bg-transparent border-b border-white/20 focus:border-blue-400 outline-none py-2 md:py-3 text-base md:text-lg transition-colors resize-none placeholder:text-gray-700 text-white" placeholder="Tell us about your project..." required></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || formLocked}
                className="mt-2 md:mt-4 bg-white text-black py-3 md:py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed group/btn relative overflow-hidden"
              >
                 <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
                 {!isSubmitting && !formLocked && <div className="absolute inset-0 bg-blue-500/10 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out skew-x-12" />}
              </button>

            </form>
          </div>
        </motion.div>

      </div>
    </main>
  );
}