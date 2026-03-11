import { motion, useScroll, useTransform } from 'motion/react';
import { Building2, Mountain, ArrowRight, Sparkles, Factory, HardHat, Gem, Ship, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

interface PortalHeroProps {
  steelImage: string;
  mineImage: string;
}

export function PortalHero({ steelImage, mineImage }: PortalHeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px]"
        />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }} />

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6 pt-20">
          <div className="text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-2 rounded-full text-sm text-white/80 mb-8 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Engineering Excellence Since 2011</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight"
              >
                Nestler<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Infra</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed"
              >
                A diversified infrastructure conglomerate delivering world-class solutions across India and international markets.
              </motion.p>
            </motion.div>

            {/* Floating Icons */}
            <div className="flex justify-center gap-4 mb-12">
              {[
                { icon: <Factory className="w-5 h-5" />, delay: 0.6, color: 'from-orange-500 to-orange-600' },
                { icon: <Mountain className="w-5 h-5" />, delay: 0.7, color: 'from-amber-500 to-amber-600' },
                { icon: <Gem className="w-5 h-5" />, delay: 0.8, color: 'from-slate-400 to-slate-500' },
                { icon: <Ship className="w-5 h-5" />, delay: 0.9, color: 'from-blue-500 to-blue-600' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: item.delay, type: 'spring' }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer`}
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Division Cards */}
        <div className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-white/40 text-sm uppercase tracking-widest mb-8"
            >
              Select Your Division
            </motion.p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Prefab Card */}
              <motion.a
                href="https://prefab.nestlerinfra.com"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 p-8 backdrop-blur-sm cursor-pointer"
                aria-label="Visit Prefab Solutions - Steel Buildings division"
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20">
                  <img 
                    src={steelImage} 
                    alt="" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-transparent transition-all duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30"
                    >
                      <Building2 className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider">Division 01</p>
                      <h2 className="text-3xl font-bold text-white">Prefab Solutions</h2>
                    </div>
                  </div>

                  <p className="text-white/70 mb-6 leading-relaxed">
                    ISO-certified pre-engineered steel buildings with turnkey project delivery and pan-India installation.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Warehouses', 'Factories', 'Cold Storage', 'Hangars', 'Commercial'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-orange-400 font-semibold group-hover:gap-4 transition-all">
                    <span>Visit Prefab Site</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.a>

              {/* Mining Card */}
              <motion.a
                href="https://mining.nestlerinfra.com"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-amber-900/30 border border-white/10 p-8 backdrop-blur-sm cursor-pointer"
                aria-label="Visit Mining Operations - Minerals division"
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20">
                  <img 
                    src={mineImage} 
                    alt="" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:to-transparent transition-all duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: -10, scale: 1.1 }}
                      className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30"
                    >
                      <Mountain className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Division 02</p>
                      <h2 className="text-3xl font-bold text-white">Mining Operations</h2>
                    </div>
                  </div>

                  <p className="text-white/70 mb-6 leading-relaxed">
                    Sustainable extraction of quartz, feldspar, iron ore, and pyrite from Andhra Pradesh, Karnataka, and Bihar.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Quartz (Andhra)', 'Feldspar (Andhra)', 'Iron Ore (AP & Karnataka)', 'Pyrite (Bihar)'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-amber-500/20 text-amber-300 text-sm rounded-full border border-amber-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-4 transition-all">
                    <span>Visit Mining Site</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-white/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
