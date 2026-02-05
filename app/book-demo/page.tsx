'use client';

import { useState } from 'react';
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

// --- DROPDOWN OPTIONS ---
const budgetOptions = [
  "Not Sure Yet",
  "Less than $2k",
  "$2k - $5k",
  "$5k - $10k",
  "$10k+"
];

const objectiveOptions = [
  "Building an MVP",
  "Scaling Existing Tech",
  "Cloud / Data Migration",
  "AI Integration",
  "General Consultation"
];

export default function BookDemo() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Custom Select State 1: Budget
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(budgetOptions[0]);

  // Custom Select State 2: Objective (Survey)
  const [objectiveOpen, setObjectiveOpen] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState(objectiveOptions[0]);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    
    // Append custom fields
    formData.append('budget', selectedBudget);
    formData.append('service', selectedObjective); // Map Objective to 'service' field

    await submitContactForm(formData);
    
    setIsSubmitting(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* --- LAYER 0: BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[20%] w-[60%] h-[60%] bg-emerald-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
      </div>

      {/* --- LAYER 1: MAIN CONTENT --- */}
      <div className="relative z-10 pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 max-w-[1400px] mx-auto min-h-screen flex flex-col md:flex-row gap-12 md:gap-20">
        
        {/* LEFT COLUMN: INFO */}
        <motion.div className="md:w-1/2" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-6 md:mb-8 leading-[0.9]">
            <ScrambleText text="BOOK" delay={200} /> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-white w-fit">
               <ScrambleText text="A DEMO." delay={600} />
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 mb-12 max-w-lg leading-relaxed">
            See how HoursDev can accelerate your infrastructure. Select a time slot and let&apos;s engineer your solution.
          </motion.p>
          
          {/* PRICING CARDS */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 transition-colors group cursor-default">
                <div className="text-emerald-400 text-xs font-mono mb-2"> DEDICATED_RESOURCE</div>
                <div className="text-2xl font-bold mb-1">$25 - $45<span className="text-sm text-gray-500 font-normal">/hr</span></div>
                <p className="text-sm text-gray-400">For ongoing development & augmentation.</p>
             </div>

             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/50 transition-colors group cursor-default">
                <div className="text-blue-400 text-xs font-mono mb-2"> FIXED_PROJECT</div>
                <div className="text-2xl font-bold mb-1">Custom<span className="text-sm text-gray-500 font-normal">/scope</span></div>
                <p className="text-sm text-gray-400">End-to-end delivery. MVPs from $2k.</p>
             </div>
          </motion.div>

          {/* TERMINAL DECORATION */}
          <motion.div variants={fadeInUp} className="hidden md:block font-mono text-xs text-emerald-500/80 bg-black/40 p-4 rounded border border-emerald-500/20 w-fit backdrop-blur-sm">
              <div className="flex gap-2 mb-3 opacity-50">
                  <div className="w-2 h-2 rounded-full bg-red-500"/>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"/>
                  <div className="w-2 h-2 rounded-full bg-green-500"/>
              </div>
              <Typewriter text="> SYSTEM_STATUS: ONLINE" startDelay={100} /><br/>
              <Typewriter text="> CALENDAR_API: CONNECTED" startDelay={800} /><br/>
              <span className="animate-pulse">_</span>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: FORM */}
        <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-visible">
            
            {/* Form Glow Effect */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />

            <form action={handleSubmit} className="flex flex-col gap-6 relative z-10">
              
              {/* Row 1: Name & Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 group/input">
                    <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-emerald-400 transition-colors">Name</label>
                    <input type="text" name="name" className="bg-transparent border-b border-white/20 focus:border-emerald-400 outline-none py-2 transition-colors text-white placeholder:text-gray-700 font-light" placeholder="John Doe" required />
                </div>
                <div className="flex flex-col gap-2 group/input">
                    <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-emerald-400 transition-colors">Company</label>
                    <input type="text" name="company" className="bg-transparent border-b border-white/20 focus:border-emerald-400 outline-none py-2 transition-colors text-white placeholder:text-gray-700 font-light" placeholder="Acme Inc." />
                </div>
              </div>

              {/* Row 2: Email & Mobile (NEW) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 group/input">
                  <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-emerald-400 transition-colors">Email</label>
                  <input type="email" name="email" className="bg-transparent border-b border-white/20 focus:border-emerald-400 outline-none py-2 transition-colors text-white placeholder:text-gray-700 font-light" placeholder="john@acme.com" required />
                </div>
                <div className="flex flex-col gap-2 group/input">
                  <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-emerald-400 transition-colors">Mobile Number</label>
                  <input type="tel" name="mobile" className="bg-transparent border-b border-white/20 focus:border-emerald-400 outline-none py-2 transition-colors text-white placeholder:text-gray-700 font-light" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              {/* Row 3: Survey (Objective) & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 {/* OBJECTIVE DROPDOWN (SURVEY) */}
                 <div className="flex flex-col gap-2 relative">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Project Goal</label>
                    <button 
                      type="button" 
                      onClick={() => { setObjectiveOpen(!objectiveOpen); setBudgetOpen(false); }}
                      className="text-left bg-transparent border-b border-white/20 focus:border-emerald-400 outline-none py-2 text-white flex justify-between items-center group"
                    >
                      <span className="font-light truncate pr-2">{selectedObjective}</span>
                      <svg className={`w-4 h-4 text-gray-500 transition-transform ${objectiveOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {objectiveOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 w-full bg-[#111] border border-white/10 rounded-xl mt-2 overflow-hidden z-50 shadow-xl"
                        >
                          {objectiveOptions.map((opt) => (
                            <div key={opt} onClick={() => { setSelectedObjective(opt); setObjectiveOpen(false); }} className="px-4 py-3 hover:bg-emerald-500/20 hover:text-emerald-400 cursor-pointer text-sm text-gray-300 transition-colors">
                              {opt}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>

                 {/* BUDGET DROPDOWN */}
                 <div className="flex flex-col gap-2 relative">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Project Budget</label>
                    <button 
                      type="button" 
                      onClick={() => { setBudgetOpen(!budgetOpen); setObjectiveOpen(false); }}
                      className="text-left bg-transparent border-b border-white/20 focus:border-emerald-400 outline-none py-2 text-white flex justify-between items-center group"
                    >
                      <span className="font-light">{selectedBudget}</span>
                      <svg className={`w-4 h-4 text-gray-500 transition-transform ${budgetOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {budgetOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 w-full bg-[#111] border border-white/10 rounded-xl mt-2 overflow-hidden z-50 shadow-xl"
                        >
                          {budgetOptions.map((opt) => (
                            <div key={opt} onClick={() => { setSelectedBudget(opt); setBudgetOpen(false); }} className="px-4 py-3 hover:bg-emerald-500/20 hover:text-emerald-400 cursor-pointer text-sm text-gray-300 transition-colors">
                              {opt}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
              </div>

              {/* Row 4: Date Picker */}
              <div className="flex flex-col gap-2 group/input">
                  <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-emerald-400 transition-colors">Preferred Time</label>
                  <div className="relative">
                    <input type="datetime-local" name="demo_date" className="w-full bg-transparent border-b border-white/20 focus:border-emerald-400 outline-none py-2 text-white font-light [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer" required />
                  </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 group/input">
                <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within:text-emerald-400 transition-colors">Additional Details</label>
                <textarea name="message" rows={2} className="bg-transparent border-b border-white/20 focus:border-emerald-400 outline-none py-2 resize-none text-white placeholder:text-gray-700 font-light" placeholder="Specific requirements or questions?" required></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-4 bg-emerald-500 text-black py-4 rounded-full font-bold uppercase tracking-widest hover:bg-emerald-400 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Processing...</span>
                ) : "Confirm Booking"}
              </button>

            </form>
          </div>
        </motion.div>

      </div>

      {/* --- TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="bg-[#0A0A0A] border border-emerald-500/30 text-white p-6 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center gap-4 max-w-sm backdrop-blur-md">
              <div className="bg-emerald-500/20 p-3 rounded-full">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-emerald-400 text-lg">Mission Confirmed</h4>
                <p className="text-gray-400 text-sm">Coordinates received. Our team is initializing the uplink.</p>
              </div>
              <button onClick={() => setShowToast(false)} className="absolute top-2 right-2 text-gray-600 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}