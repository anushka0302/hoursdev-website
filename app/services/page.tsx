'use client';

import Link from 'next/link';
import ScrambleText from '@/components/ScrambleText';
import Typewriter from '@/components/Typewriter';
import { motion, Variants } from 'framer-motion';

const servicesDetail = [
  {
    category: "Engineering",
    id: "01",
    title: "Data Engineering",
    description: "We architect robust data pipelines that turn raw chaos into actionable insights. Specializing in high-volume ETL processes and real-time analytics.",
    stack: "['Python', 'SQL Server', 'Apache Spark', 'Snowflake']"
  },
  {
    category: "Migration",
    id: "02",
    title: "Data Migrations",
    description: "Securely move your legacy infrastructure to the cloud without downtime. We handle complex schema mapping and data integrity verification.",
    stack: "['On-Prem -> Cloud', 'AWS Migration Hub', 'PostgreSQL']"
  },
  {
    category: "Development",
    id: "03",
    title: "Web & Mobile",
    description: "High-performance frontends built with React 19 and Next.js. Native-feeling mobile apps for iOS and Android using modern hybrid frameworks.",
    stack: "['Next.js 15', 'React Native', 'Tailwind v4', 'TypeScript']"
  },
  {
    category: "Growth",
    id: "04",
    title: "Digital Marketing",
    description: "Data-driven campaigns that convert. We don't guess; we use analytics to target your ideal customer profile with precision.",
    stack: "['SEO', 'Google Analytics 4', 'Content Strategy']"
  }
];

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

export default function Services() {
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
        
        {/* Header */}
        <section className="mb-24 border-b border-white/10 pb-12">
          <h1 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter uppercase mb-6 leading-[0.85] flex flex-col">
            <ScrambleText text="OUR" delay={200} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 w-fit">
               <ScrambleText text="EXPERTISE" delay={500} />
            </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="text-xl text-gray-400 max-w-2xl border-l-2 border-purple-500 pl-6"
          >
            We provide end-to-end technical services. From database architecture to pixel-perfect frontends.
          </motion.p>
        </section>

        {/* Detailed Services Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {servicesDetail.map((service, index) => (
            <motion.div 
              key={index} 
              variants={fadeInUp}
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/10 pt-12 pb-4 hover:bg-white/5 transition-colors duration-500 rounded-xl px-4 relative overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* ID & Category */}
              <div className="md:col-span-3 flex flex-col justify-between">
                <span className="text-4xl font-mono text-white/20 group-hover:text-purple-400 transition-colors duration-300">
                  {service.id}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 mt-4 border border-blue-400/30 px-3 py-1 rounded-full w-fit">
                  {service.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="md:col-span-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                  {service.description}
                </p>
                
                {/* Tech Stack as Code Block */}
                <div className="bg-black/40 border border-white/10 p-4 rounded-lg font-mono text-sm text-gray-300 shadow-inner">
                  <span className="text-purple-400">const</span> <span className="text-yellow-200">stack</span> = 
                  <span className="text-green-400">
                     <Typewriter text={service.stack} startDelay={1000 + (index * 500)} className="ml-2" />
                  </span>
                  <span className="text-gray-500">;</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="md:col-span-3 flex items-end justify-end">
                 <Link 
                   href="/contact" 
                   className="group/btn flex items-center gap-2 text-sm uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                 >
                   Book Service 
                   <span className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform duration-300">
                     ↗
                   </span>
                 </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}