import { motion } from 'motion/react';
import { Building2, Mountain, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface SplitHeroProps {
  steelImage: string;
  mineImage: string;
}

export function SplitHero({ steelImage, mineImage }: SplitHeroProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16">
      {/* Prefab Division - Left Side */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex-1 overflow-hidden group"
      >
        {/* Background Image with parallax effect */}
        <div className="absolute inset-0 img-zoom-container">
          <img
            src={steelImage}
            alt="Prefabricated Steel Buildings"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B]/95 via-[#1E293B]/90 to-[#1E293B]/85" />
          {/* Animated grid overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,87,34,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,87,34,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-8 md:px-12 py-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-[#FF5722] rounded-lg flex items-center justify-center animate-glow-pulse"
              >
                <Building2 className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <p className="text-[#FF5722] text-sm tracking-wider uppercase" style={{ fontWeight: 600 }}>Division 01</p>
                <h2 className="text-white text-2xl font-bold" style={{ fontWeight: 800 }}>Prefab Solutions</h2>
              </div>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontWeight: 800 }}>
              Pre-Engineered<br />
              <span className="text-shimmer">Steel Buildings</span>
            </h3>

            <p className="text-blue-100 text-lg mb-8 max-w-lg" style={{ fontWeight: 300 }}>
              Turnkey infrastructure solutions delivering sustainable, cost-effective steel structures 
              across industrial, commercial, and agricultural sectors.
            </p>

            <div className="space-y-3 mb-8">
              {['ISO Certified Manufacturing', 'Turnkey Project Delivery', 'Pan-India Installation'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 group/feature"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#FF5722] transition-transform group-hover/feature:scale-110" />
                  <span className="text-white transition-colors group-hover/feature:text-[#FF5722]" style={{ fontWeight: 300 }}>{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-[#FF5722] text-white px-8 py-3 rounded-lg hover:bg-[#E64A19] transition-all shadow-lg hover:shadow-xl hover:shadow-[#FF5722]/30"
              style={{ fontWeight: 600 }}
            >
              <Sparkles className="w-4 h-4" />
              Explore Prefab
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Mining Division - Right Side */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex-1 overflow-hidden group"
      >
        {/* Background Image with parallax effect */}
        <div className="absolute inset-0 img-zoom-container">
          <img
            src={mineImage}
            alt="Global Mineral Mining"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/95 via-amber-900/90 to-amber-900/85" />
          {/* Animated grid overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(217,119,6,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-8 md:px-12 py-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-12 h-12 bg-amber-700 rounded-lg flex items-center justify-center glow-amber"
              >
                <Mountain className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <p className="text-amber-400 text-sm tracking-wider uppercase">Division 02</p>
                <h2 className="text-white text-2xl font-bold">Mining Operations</h2>
              </div>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Global Mineral<br />
              <span className="text-amber-400">Extraction</span>
            </h3>

            <p className="text-slate-200 text-lg mb-8 max-w-lg">
              Sustainable mining operations specializing in quartz, feldspar, and industrial minerals 
              with advanced extraction technology and environmental compliance.
            </p>

            <div className="space-y-3 mb-8">
              {['Eco-Compliant Operations', 'Advanced Mineral Processing', 'Global Export Network'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 group/feature"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-400 transition-transform group-hover/feature:scale-110" />
                  <span className="text-white transition-colors group-hover/feature:text-amber-400">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl hover:shadow-amber-600/30"
            >
              <Sparkles className="w-4 h-4" />
              Explore Mining
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}