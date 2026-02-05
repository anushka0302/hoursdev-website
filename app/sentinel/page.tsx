'use client';

import { useState } from 'react';
import ScrambleText from '@/components/ScrambleText';
import Typewriter from '@/components/Typewriter';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm } from '../actions';
import Image from 'next/image';

export default function SentinelPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    await submitContactForm(formData);
    setIsSubmitting(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 6000);
  }

  return (
    <main className="relative min-h-screen bg-[#020202] text-white selection:bg-red-500/30 overflow-x-hidden font-sans">
      
      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>

      {/* --- UPDATED CONTAINER SPACING (pt-32 md:pt-40) --- */}
      <div className="relative z-10 max-w-[1400px] mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6 pt-32 pb-20 md:pt-40">
        
        {/* --- LEFT: VISUALS --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 flex flex-col gap-8"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-red-500/30 bg-red-950/20 w-fit">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"/>
            <span className="text-red-400 text-xs tracking-widest uppercase font-bold">Classified // Level 5</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
            SENTINEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">PRIME</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
            The first Converged Personal SOC. Unifying physical surveillance and cyber-defense into a single, AI-driven active defense engine.
          </p>

          {/* --- ENHANCED PRODUCT IMAGE HUD --- */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(220,38,38,0.15)] group bg-black/50">
             
             {/* 1. The Image */}
             <Image 
               src="/sentin.jpg" 
               alt="Sentinel Prime Device" 
               fill 
               className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale-[30%] group-hover:grayscale-0"
             />
             
             {/* 2. Monitor Grid Overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06)_1px,transparent_1px)] z-10 bg-[size:100%_4px,20px_100%] pointer-events-none" />

             {/* 3. Animated Scanline */}
             <motion.div 
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                className="absolute left-0 right-0 h-[2px] bg-red-500/50 shadow-[0_0_20px_rgba(220,38,38,1)] z-20"
             />

             {/* 4. HUD Corner Brackets */}
             <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-red-500/60 z-20" />
             <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-red-500/60 z-20" />
             <div className="absolute bottom-16 right-4 w-8 h-8 border-b-2 border-r-2 border-red-500/60 z-20" />
             <div className="absolute bottom-16 left-4 w-8 h-8 border-b-2 border-l-2 border-red-500/60 z-20" />

             {/* 5. Technical Status Bar */}
             <div className="absolute bottom-0 left-0 w-full bg-black/90 border-t border-red-500/20 p-3 flex justify-between items-center z-30 backdrop-blur-sm">
                 <div className="flex flex-col gap-0.5">
                     <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-emerald-500 font-mono tracking-widest uppercase">Neural_Net: Online</span>
                     </div>
                     <div className="font-mono text-[10px] text-red-500/80">
                        <Typewriter text="> TRAFFIC_ANALYSIS: ACTIVE..." startDelay={500}/>
                     </div>
                 </div>
                 <div className="text-[9px] text-gray-600 font-mono text-right leading-tight hidden sm:block">
                    UPTIME: 99.99%<br/>
                    LATENCY: 12ms
                 </div>
             </div>
          </div>

        </motion.div>

        {/* --- RIGHT: ACCESS TERMINAL (FORM) --- */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 w-full max-w-md"
        >
          <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">Request Access</h2>
              <p className="text-sm text-gray-500">Secure channel established. Identification required.</p>
            </div>

            <form action={handleSubmit} className="flex flex-col gap-5">
              
              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-red-500 transition-colors">Operative Name</label>
                <input type="text" name="name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:bg-red-900/10 outline-none transition-all placeholder:text-gray-700" placeholder="Agent Name" />
              </div>

              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-red-500 transition-colors">Secure Email</label>
                <input type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:bg-red-900/10 outline-none transition-all placeholder:text-gray-700" placeholder="operative@agency.com" />
              </div>

              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-red-500 transition-colors">Organization / Unit</label>
                <input type="text" name="organization" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:bg-red-900/10 outline-none transition-all placeholder:text-gray-700" placeholder="Org Name (Optional)" />
              </div>

              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-red-500 transition-colors">Deployment Scale</label>
                <select name="deployment_scale" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:bg-red-900/10 outline-none transition-all cursor-pointer [&>option]:bg-black">
                  <option value="Single Unit (Personal)">Single Unit (Personal)</option>
                  <option value="Small Team (2-10)">Small Team (2-10)</option>
                  <option value="Enterprise Grid (10+)">Enterprise Grid (10+)</option>
                  <option value="Government / Defense">Government / Defense</option>
                </select>
              </div>

              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-red-500 transition-colors">Briefing (Message)</label>
                <textarea name="message" rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:bg-red-900/10 outline-none transition-all resize-none placeholder:text-gray-700" placeholder="Additional requirements..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-2 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-lg uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "TRANSMITTING..." : "INITIATE SEQUENCE"}
              </button>

            </form>
          </div>
        </motion.div>
      </div>

      {/* --- RED TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="bg-[#050505] border border-red-500 text-white p-6 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.3)] flex items-center gap-4 max-w-sm">
              <div className="bg-red-500/20 p-3 rounded-full animate-pulse">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-red-500 text-lg tracking-wide">ACCESS REQUESTED</h4>
                <p className="text-gray-400 text-xs font-mono">ENCRYPTION KEY: PENDING APPROVAL</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}