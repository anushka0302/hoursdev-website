'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import ScrambleText from '@/components/ScrambleText';
import Typewriter from '@/components/Typewriter'; 
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

// --- DATA: Clients ---
const clients = [
  { 
    name: 'Haatwale', 
    url: 'https://www.haatwale.com',
    desc: 'E-commerce Marketplace',
    year: '2024'
  },
  { 
    name: 'Ghume Ghume', 
    url: 'https://www.ghumeghume.com',
    desc: 'Travel & Trekking Platform',
    year: '2025'
  },
  { 
    name: 'CEDRF', 
    url: 'https://www.cedrf.com',
    desc: 'Development Research Foundation',
    year: '2024'
  }
];

// --- DATA: Why Us ---
const features = [
  {
    title: 'Hyper-Fast Delivery',
    desc: 'We use pre-built architectures (Next.js 15 + Tailwind v4) to ship products in weeks, not months.',
    stat: '4x Faster'
  },
  {
    title: 'Cost Efficient',
    desc: 'No account managers, no bloat. You pay strictly for engineering hours and code quality.',
    stat: '-40% Cost'
  },
  {
    title: 'Lifetime Maintenance',
    desc: 'We don’t just ship and leave. We provide 24/7 monitoring and security patches.',
    stat: '99.9% Uptime'
  }
];

// --- DATA: Services ---
const services = [
  { id: '01', name: 'Website Development', tags: 'React 19 / Next.js' },
  { id: '02', name: 'Android & iPhone Apps', tags: 'Native / Flutter' },
  { id: '03', name: 'Data Engineering', tags: 'Pipelines / ETL' },
  { id: '04', name: 'Data Migrations', tags: 'Cloud / On-Prem' },
  { id: '05', name: 'Digital Marketing', tags: 'SEO / Campaigns' },
];

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

// Helper component for "Code" style keywords
const CodeHighlight = ({ children, color = "text-blue-400" }: { children: React.ReactNode, color?: string }) => (
  <span className={`font-mono ${color} bg-white/5 px-1 rounded mx-0.5 border border-white/5 text-[0.9em]`}>
    {children}
  </span>
);

export default function Home() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Mobile Shrink Logic
  const heroScale = useTransform(scrollY, [0, 200], [1, 0.8]);
  const heroOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const heroY = useTransform(scrollY, [0, 200], [0, 100]); 

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* LAYER 0: BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen" />

        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-50%] left-[-20%] w-[150vh] h-[150vh] border-2 border-white/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[20%] w-[80vh] h-[80vh] border-2 border-dashed border-white/20 rounded-full"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Abstract Beams */}
        <motion.div 
           initial={{ top: "-100%" }}
           animate={{ top: "100%" }}
           transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
           className="absolute left-[20%] w-[2px] h-[40%] bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50"
        />
        <motion.div 
           initial={{ top: "-100%" }}
           animate={{ top: "100%" }}
           transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
           className="absolute right-[30%] w-[2px] h-[60%] bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50"
        />
      </div>

      {/* LAYER 1: CONTENT */}
      <div ref={containerRef} className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-20 flex flex-col gap-32 min-h-screen">
        
        {/* 1. HERO SECTION */}
        <motion.section 
          style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
          className="relative origin-top"
        >
          <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
             <div className="absolute top-[-10%] right-[-5%] md:right-[-10%] opacity-20 font-mono text-xs md:text-sm leading-relaxed">
                 <div className="text-blue-300"><Typewriter text="<div className='future'>" startDelay={200} /></div>
                 <div className="pl-4 text-purple-300"><Typewriter text="{services.map(s => (" startDelay={1500} /></div>
                 <div className="pl-8 text-gray-400"><Typewriter text="<DigitalReality key={s.id} />" startDelay={3000} /></div>
                 <div className="pl-4 text-purple-300"><Typewriter text="))}" startDelay={4500} /></div>
                 <div className="text-blue-300"><Typewriter text="</div>" startDelay={5000} /></div>
             </div>
          </div>

          <h1 className="text-[10vw] md:text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase mb-8 flex flex-col relative z-10">
            <ScrambleText text="WE BUILD" delay={200} duration={1200} />
            <motion.span 
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 w-fit bg-[length:200%_auto] pb-2"
            >
              <ScrambleText text="DIGITAL" delay={800} duration={1200} />
            </motion.span>
            <ScrambleText text="REALITIES" delay={1400} duration={1200} />
          </h1>

          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-6 backdrop-blur-sm relative z-10"
          >
            <p className="max-w-md text-lg text-gray-400">
              Hoursdev is a full-service technical agency. We transform complex data into elegant interfaces.
            </p>
            <div className="mt-8 md:mt-0">
              <Link 
                href="/book-demo" 
                className="bg-white text-black px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300 inline-block relative overflow-hidden group shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-10">Start a Project</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* --- SENTINEL PRIME SPOTLIGHT (Updated Text) --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="relative rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-950/10 to-black p-8 md:p-12 overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                <div className="lg:w-1/2">
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded border border-red-500/30 bg-red-950/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"/>
                        <span className="text-red-400 text-xs tracking-widest uppercase font-bold">Featured Innovation</span>
                    </motion.div>
                    
                    <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        SENTINEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">PRIME</span>
                    </motion.h2>
                    
                    <motion.h3 variants={fadeInUp} className="text-xl md:text-2xl text-white font-medium mb-4">
                        The First Converged Personal SOC.
                    </motion.h3>
                    
                    <motion.p variants={fadeInUp} className="text-gray-400 text-lg leading-relaxed mb-8">
                        We bridge the gap between physical security and digital defense. Sentinel Prime acts as a unified Security Operations Center (SOC) that correlates real-time data from physical hardware (cameras, biometrics) with network traffic logs. Powered by our proprietary neural networks and heuristic models, the system automatically detects anomalies and neutralizes threats across both physical and digital vectors instantly.
                          </motion.p>

                    <motion.div variants={fadeInUp}>
                        <Link href="/sentinel" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-bold uppercase tracking-widest transition-colors group/link">
                            Explore The Platform 
                            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                        </Link>
                    </motion.div>
                </div>

                <div className="lg:w-1/2 relative">
                    <motion.div 
                        variants={fadeInUp}
                        className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(220,38,38,0.2)]"
                    >
                        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                             <Image 
                               src="/sentin.jpg" 
                               alt="Sentinel Prime Dashboard" 
                               fill
                               className="object-cover opacity-80"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        </div>
                        <div className="absolute bottom-4 left-4 font-mono text-xs text-red-500">
                            <Typewriter text="> THREAT_DETECTION: ACTIVE" startDelay={500}/>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>

        {/* 2. WHY CHOOSE US */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-end justify-between mb-8">
            <h2 className="text-sm uppercase tracking-widest text-gray-500">( The Advantage )</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -5 }} 
                className="group relative border border-white/10 bg-white/5 backdrop-blur-md p-8 rounded-2xl overflow-hidden min-h-[250px] flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
                </div>
                <div className="relative z-10 mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest text-gray-500">Metric</span>
                  <span className="font-mono text-xl text-blue-300">{feature.stat}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 3. SELECTED WORK */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-end justify-between mb-8">
            <h2 className="text-sm uppercase tracking-widest text-gray-500">( Selected Works )</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clients.map((client, i) => (
              <motion.a 
                key={i}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className="group block border border-white/10 bg-white/5 backdrop-blur-md p-8 rounded-2xl relative hover:bg-white/10 transition-colors duration-300 overflow-hidden"
              >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                 <div className="flex justify-between items-start relative z-10">
                   <div>
                     <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                       {client.name}
                     </h3>
                     <p className="text-gray-400 text-sm uppercase tracking-widest">{client.desc}</p>
                   </div>
                   <div className="text-right">
                     <span className="text-xs font-mono border border-gray-700 px-2 py-1 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                       {client.year}
                     </span>
                     <motion.span 
                       className="block mt-2 text-2xl text-purple-400"
                       initial={{ x: -10, opacity: 0 }}
                       whileInView={{ x: 0, opacity: 1 }}
                     >
                       ↗
                     </motion.span>
                   </div>
                 </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* 4. SERVICES LIST */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-end justify-between mb-8">
            <h2 className="text-sm uppercase tracking-widest text-gray-500">( Our Expertise )</h2>
          </motion.div>
          <div className="flex flex-col">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                variants={fadeInUp}
                whileHover={{ x: 10 }} 
                className="group border-t border-gray-800 py-10 hover:bg-white/5 transition-colors duration-300 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center px-4 rounded-xl relative overflow-hidden"
              >
                <span className="text-sm font-mono mb-2 md:mb-0 opacity-50 text-blue-400 mr-4">{service.id}</span>
                <h3 className="text-3xl md:text-5xl font-medium tracking-tight flex-1 md:ml-20 relative z-10 group-hover:text-white transition-colors duration-300">{service.name}</h3>
                <div className="relative z-10 mt-2 md:mt-0 px-3 py-1 bg-white/5 border border-white/10 rounded-md">
                   <Typewriter text={service.tags} startDelay={index * 500} className="text-xs md:text-sm text-green-400" />
                </div>
              </motion.div>
            ))}
            <div className="border-t border-gray-800"></div>
          </div>
        </motion.section>

        {/* --- ENGINEERING PHILOSOPHY (Updated) --- */}
        <motion.section
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className="py-12 border-t border-white/5 text-gray-400 text-base md:text-lg leading-relaxed font-light"
        >
            <h2 className="text-white font-bold mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Engineering Philosophy
            </h2>
            <div className="max-w-4xl space-y-6">
              <p>
                At HoursDev, we don&apos;t just write code; we engineer scalable digital ecosystems. From high-performance <CodeHighlight>Next.js</CodeHighlight> web applications to complex <CodeHighlight color="text-purple-400">Data Engineering</CodeHighlight> pipelines, our team delivers enterprise-grade solutions. 
              </p>
              <p>
                Whether you need to migrate legacy systems to the cloud, deploy <CodeHighlight color="text-blue-300">Flutter-based</CodeHighlight> mobile apps, or engage our expert <CodeHighlight color="text-red-400">Cyber Security AI Developers</CodeHighlight> to build adaptive defense systems like Sentinel Prime, our architecture is built for speed, security, and uptime.
              </p>
              <p>
                We specialize in transforming raw data into actionable insights through robust <CodeHighlight color="text-green-400">ETL/ELT processes</CodeHighlight> and intuitive dashboards.
                <span className="inline-block w-2 h-4 bg-blue-500 ml-1 align-middle animate-pulse"></span>
              </p>
            </div>
        </motion.section>

      </div> 
    </main>
  );
}