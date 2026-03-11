import { motion, useInView } from 'motion/react';
import { Building2, Mountain, Shield, Globe, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export function CompanyOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="divisions" ref={ref} className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Animated gradient */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full text-sm text-white/60 mb-6"
          >
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span>Our Expertise</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Engineering Excellence Since 2011
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            A diversified infrastructure conglomerate delivering world-class solutions across India and international markets.
          </p>
        </motion.div>

        {/* Division Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Prefab */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-500/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-orange-500/30 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30"
                >
                  <Building2 className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <p className="text-xs text-orange-400 font-semibold uppercase tracking-wide mb-1">Division 01</p>
                  <h3 className="text-2xl font-bold text-white">Prefab Solutions</h3>
                </div>
              </div>

              <p className="text-white/60 leading-relaxed mb-6">
                ISO-certified manufacturing of pre-engineered steel buildings. Turnkey project delivery with pan-India installation and world-class quality standards.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {['Warehouses', 'Factories', 'Cold Storage', 'Hangars', 'Commercial'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="px-3 py-1.5 bg-orange-500/10 text-orange-300 text-sm rounded-full border border-orange-500/20"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Shield className="w-4 h-4 text-orange-400" />
                  <span>ISO 9001:2015 Certified</span>
                </div>
                <motion.a
                  href="https://prefab.nestlerinfra.com"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-1 text-orange-400 text-sm font-medium hover:text-orange-300"
                  aria-label="Learn more about Prefab Solutions"
                >
                  Learn more about Prefab <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Mining */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-500/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-slate-800/80 to-amber-900/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-amber-500/30 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30"
                >
                  <Mountain className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <p className="text-xs text-amber-400 font-semibold uppercase tracking-wide mb-1">Division 02</p>
                  <h3 className="text-2xl font-bold text-white">Mining Operations</h3>
                </div>
              </div>

              <p className="text-white/60 leading-relaxed mb-6">
                Sustainable extraction of quartz, feldspar, iron ore, and pyrite from Andhra Pradesh, Karnataka, and Bihar. IEC-registered exporter serving global markets.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {['Quartz (Andhra)', 'Feldspar (Andhra)', 'Iron Ore (AP & Karnataka)', 'Pyrite (Bihar)'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="px-3 py-1.5 bg-amber-500/10 text-amber-300 text-sm rounded-full border border-amber-500/20"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>IEC Registered Exporter</span>
                </div>
                <motion.a
                  href="https://mining.nestlerinfra.com"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-1 text-amber-400 text-sm font-medium hover:text-amber-300"
                  aria-label="Learn more about Mining Operations"
                >
                  Learn more about Mining <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          {[
            { icon: <Shield className="w-4 h-4" />, label: 'ISO 9001:2015', color: 'text-orange-400' },
            { icon: <Globe className="w-4 h-4" />, label: 'IEC Registered Exporter', color: 'text-amber-400' },
            { icon: <CheckCircle2 className="w-4 h-4" />, label: 'Govt. Approved Quarry', color: 'text-emerald-400' },
          ].map((cert, i) => (
            <motion.div
              key={cert.label}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm"
            >
              <span className={cert.color}>{cert.icon}</span>
              <span className="text-sm text-white/70">{cert.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
