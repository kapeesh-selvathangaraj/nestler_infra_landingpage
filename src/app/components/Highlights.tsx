import { motion, useInView } from 'motion/react';
import { Trophy, Building, Users, Globe, Award, Shield, Zap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { icon: <Trophy className="w-7 h-7 text-white" />, value: 15, suffix: '+', label: 'Years Experience', color: 'from-orange-500 to-orange-600', shadowColor: 'shadow-orange-500/30' },
  { icon: <Building className="w-7 h-7 text-white" />, value: 1300, suffix: '+', label: 'Projects Delivered', color: 'from-slate-600 to-slate-700', shadowColor: 'shadow-slate-500/30' },
  { icon: <Users className="w-7 h-7 text-white" />, value: 500, suffix: '+', label: 'Satisfied Clients', color: 'from-slate-500 to-slate-600', shadowColor: 'shadow-slate-400/30' },
  { icon: <Globe className="w-7 h-7 text-white" />, value: 3, suffix: '', label: 'State Presence', color: 'from-amber-500 to-amber-600', shadowColor: 'shadow-amber-500/30' },
];

const certifications = [
  { icon: <Award className="w-5 h-5" />, label: 'ISO 9001:2015 Certified', color: 'text-orange-400', border: 'border-orange-500/30' },
  { icon: <Shield className="w-5 h-5" />, label: 'IEC Registered Exporter', color: 'text-amber-400', border: 'border-amber-500/30' },
  { icon: <Zap className="w-5 h-5" />, label: 'Government Approved Quarry', color: 'text-emerald-400', border: 'border-emerald-500/30' },
];

function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span className="text-5xl font-black text-white">
      {count}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">{suffix}</span>
    </span>
  );
}

export function Highlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Animated orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]"
      />

      <div className="container mx-auto px-6 relative">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -10, rotate: 5 }}
                className={`w-20 h-20 mx-auto mb-5 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg ${stat.shadowColor}`}
              >
                {stat.icon}
              </motion.div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              <div className="text-white/50 text-sm uppercase tracking-wider mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent max-w-3xl mx-auto mb-16"
        />

        {/* Certifications */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.label}
              whileHover={{ scale: 1.05, y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`flex items-center gap-3 bg-white/5 border ${cert.border} px-6 py-3 rounded-full backdrop-blur-sm`}
            >
              <span className={cert.color}>{cert.icon}</span>
              <span className="text-sm font-medium text-white/80">{cert.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
