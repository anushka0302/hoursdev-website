'use client';

import ScrambleText from '@/components/ScrambleText';
import Typewriter from '@/components/Typewriter';
import { motion, Variants } from 'framer-motion';
import { submitContactForm } from '../actions'; // Import the server action

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

export default function Contact() {
  
  // Handler to send data to the Server Action
  async function handleSubmit(formData: FormData) {
    await submitContactForm(formData);
    alert("Message Sent! Check your server terminal.");
    // Optional: Reset form logic here
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* LAYER 0: ALIVE GEOMETRIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[20%] w-[60%] h-[60%] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 180, repeat: Infinity, ease: "linear" }} className="absolute top-[-30%] left-[-10%] w-[130vh] h-[130vh] border-2 border-white/5 rounded-full" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-20%] right-[-10%] w-[90vh] h-[90vh] border-2 border-dashed border-white/10 rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        <motion.div initial={{ top: "-100%" }} animate={{ top: "100%" }} transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute left-[50%] w-[1px] h-[40%] bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50" />
      </div>

      {/* LAYER 1: CONTENT */}
      <div className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen flex flex-col md:flex-row gap-20">
        
        {/* Left Content */}
        <motion.div className="md:w-1/2" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-8 leading-[0.9]">
            <ScrambleText text="LET'S" delay={200} /> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white w-fit">
               <ScrambleText text="TALK." delay={600} />
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-gray-400 mb-12 max-w-lg leading-relaxed">
            Have a project in mind? Looking to migrate your data? Send us a message and we&apos;ll get back to you within 24 hours.
          </motion.p>
          <motion.div variants={fadeInUp} className="space-y-8 text-lg">
            <div className="group cursor-pointer">
              <span className="text-gray-500 block text-xs uppercase tracking-widest mb-1 group-hover:text-blue-400 transition-colors">Email</span>
              <span className="text-2xl font-light border-b border-transparent group-hover:border-white transition-all">hello@hoursdev.com</span>
            </div>
            <div className="group cursor-pointer">
              <span className="text-gray-500 block text-xs uppercase tracking-widest mb-1 group-hover:text-blue-400 transition-colors">Phone</span>
               <span className="text-2xl font-light border-b border-transparent group-hover:border-white transition-all">+91 910 549 8001</span>
            </div>
            <div className="group cursor-pointer">
              <span className="text-gray-500 block text-xs uppercase tracking-widest mb-1 group-hover:text-blue-400 transition-colors">Location</span>
               <span className="text-2xl font-light border-b border-transparent group-hover:border-white transition-all">Uttarakhand, India</span>
            </div>
          </motion.div>
          {/* TERMINAL DECORATION */}
          <motion.div variants={fadeInUp} className="mt-16 p-4 rounded-lg bg-black/50 border border-white/10 font-mono text-xs text-gray-500 w-fit hidden md:block">
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
          <div className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* FORM CONNECTED TO ACTION */}
            <form action={handleSubmit} className="flex flex-col gap-8 relative z-10">
              
              {/* Name Field */}
              <div className="flex flex-col gap-2 group/input">
                <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within/input:text-blue-400 transition-colors">Name</label>
                <input type="text" name="name" className="bg-transparent border-b border-white/20 focus:border-blue-400 outline-none py-3 text-lg transition-colors placeholder:text-gray-700" placeholder="Jane Doe" required />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2 group/input">
                <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within/input:text-blue-400 transition-colors">Email</label>
                <input type="email" name="email" className="bg-transparent border-b border-white/20 focus:border-blue-400 outline-none py-3 text-lg transition-colors placeholder:text-gray-700" placeholder="jane@company.com" required />
              </div>

              {/* --- NEW MOBILE NUMBER FIELD --- */}
              <div className="flex flex-col gap-2 group/input">
                <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within/input:text-blue-400 transition-colors">Mobile Number</label>
                <input type="tel" name="mobile" className="bg-transparent border-b border-white/20 focus:border-blue-400 outline-none py-3 text-lg transition-colors placeholder:text-gray-700" placeholder="+91 98765 43210" />
              </div>

              {/* Service Interest */}
              <div className="flex flex-col gap-2 group/input">
                <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within/input:text-blue-400 transition-colors">Service Interest</label>
                <select name="service" className="bg-transparent border-b border-white/20 focus:border-blue-400 outline-none py-3 text-lg transition-colors text-white [&>option]:text-black cursor-pointer appearance-none">
                  <option value="Web Development">Web Development</option>
                  <option value="Data Engineering">Data Engineering</option>
                  <option value="App Development">App Development</option>
                  <option value="Migration">Migration</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2 group/input">
                <label className="text-xs uppercase tracking-widest text-gray-500 group-focus-within/input:text-blue-400 transition-colors">Message</label>
                <textarea name="message" rows={4} className="bg-transparent border-b border-white/20 focus:border-blue-400 outline-none py-3 text-lg transition-colors resize-none placeholder:text-gray-700" placeholder="Tell us about your project..." required></textarea>
              </div>

              <button type="submit" className="mt-4 bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Send Message
              </button>

            </form>
          </div>
        </motion.div>

      </div>
    </main>
  );
}