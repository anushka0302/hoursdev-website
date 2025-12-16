'use client';

import ScrambleText from '@/components/ScrambleText';
import { motion, Variants } from 'framer-motion';

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

export default function Agency() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* =========================================
          LAYER 0: ALIVE GEOMETRIC BACKGROUND (Fixed) 
         ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Base Glows */}
        <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen" />

        {/* Orbit Lines (Updated: Thicker borders & Higher Opacity) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          // CHANGED: border-2 (was border), border-white/10 (was /5)
          className="absolute top-[-40%] left-[-20%] w-[140vh] h-[140vh] border-2 border-white/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          // CHANGED: border-2, border-white/20
          className="absolute bottom-[-20%] right-[-20%] w-[100vh] h-[100vh] border-2 border-dashed border-white/20 rounded-full"
        />

        {/* Tech Grid (Updated: Brighter Lines) */}
        {/* CHANGED: rgba alpha from 0.05 to 0.15 for clearer lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        
        {/* Shooting Beams (Updated: Thicker Beam) */}
        <motion.div 
           initial={{ top: "-100%" }}
           animate={{ top: "100%" }}
           transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
           // CHANGED: w-[3px] (was 1px), opacity-50
           className="absolute right-[15%] w-[3px] h-[30%] bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50"
        />
      </div>

      {/* =========================================
          LAYER 1: CONTENT
         ========================================= */}
      <div className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
        
        {/* 1. MANIFESTO SECTION */}
        <section className="mb-32 relative">
            
            {/* Decorative Code Block (Floating Right) - ESCAPED QUOTES HERE */}
            <div className="hidden lg:block absolute top-10 right-0 p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md font-mono text-sm text-gray-400 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div>
                    <span className="text-purple-400">const</span> <span className="text-blue-300">agency</span> = <span className="text-yellow-300">{`{`}</span>
                </div>
                <div className="pl-4">
                    <span className="text-blue-300">philosophy</span>: <span className="text-green-400">&apos;Engineering First&apos;</span>,
                </div>
                <div className="pl-4">
                    <span className="text-blue-300">focus</span>: [<span className="text-green-400">&apos;Data&apos;</span>, <span className="text-green-400">&apos;Cloud&apos;</span>],
                </div>
                <div className="pl-4">
                     <span className="text-blue-300">slides</span>: <span className="text-red-400">false</span>,
                </div>
                <div className="pl-4">
                     <span className="text-blue-300">code</span>: <span className="text-purple-400">true</span>
                </div>
                <div><span className="text-yellow-300">{`}`}</span>;</div>
            </div>

            <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <motion.h1 variants={fadeInUp} className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85] mb-12 flex flex-col">
                    <ScrambleText text="ENGINEERING" delay={200} />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-white w-fit">
                        <ScrambleText text="FIRST" delay={800} />
                    </span>
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div variants={fadeInUp}>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Hoursdev was founded on a simple principle: <strong className="text-white bg-white/10 px-1 rounded">Code speaks louder than slides.</strong> We are not just a creative agency; we are technical specialists deeply rooted in data engineering and system architecture.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Whether migrating complex databases or building the next viral app, we bring the same level of rigorous precision and scalability to every project. We don&apos;t just build for launch; we build for the decade.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </section>

        {/* 2. STATS SECTION */}
        <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-16 mb-32 relative bg-white/[0.02]"
        >
            {[
            { label: "Projects Shipped", value: "50+" },
            { label: "Data Processed", value: "10TB+" },
            { label: "Uptime", value: "99.9%" },
            { label: "Happy Clients", value: "100%" },
            ].map((stat, i) => (
            <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="text-center group cursor-default"
            >
                <h3 className="text-4xl md:text-6xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {stat.value}
                </h3>
                <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                    {stat.label}
                </p>
            </motion.div>
            ))}
        </motion.section>

        {/* 3. VALUES SECTION */}
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            <motion.h2 variants={fadeInUp} className="text-sm uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"/> ( Our Values )
            </motion.h2>

            <div className="space-y-4">
            {[
                "Transparency in Code & Cost",
                "Speed without Shortcuts",
                "Scalability by Default",
                "User-Centric Design"
            ].map((value, i) => (
                <motion.div 
                    key={i} 
                    variants={fadeInUp}
                    whileHover={{ x: 20, backgroundColor: 'rgba(255,255,255,0.03)' }}
                    className="border-b border-white/10 pb-8 pt-8 pl-4 transition-all duration-300 cursor-pointer group rounded-lg"
                >
                    <h3 className="text-2xl md:text-4xl flex items-center justify-between">
                        <span className="group-hover:text-blue-300 transition-colors">{value}</span>
                        <span className="opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:-translate-x-4 transition-all duration-300 text-purple-400 text-xl">
                            &lt;/&gt;
                        </span>
                    </h3>
                </motion.div>
            ))}
            </div>
        </motion.section>

      </div>
    </main>
  );
}