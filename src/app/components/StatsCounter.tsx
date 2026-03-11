import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Trophy, Users, Building, Globe, TrendingUp } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  gradient: string;
}

function StatItem({ icon, value, suffix, label, delay, gradient }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

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
  }, [isVisible, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 10, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`w-20 h-20 mx-auto mb-5 ${gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300`}
      >
        {icon}
      </motion.div>
      <div className="text-5xl md:text-6xl font-black text-[#0A192F] mb-2 counter-glow" style={{ fontWeight: 800 }}>
        {count}
        <span className="text-[#FF5722]">{suffix}</span>
      </div>
      <div className="text-gray-600 text-sm uppercase tracking-wider font-medium flex items-center justify-center gap-1" style={{ fontWeight: 400 }}>
        <TrendingUp className="w-3 h-3 text-[#FF5722] opacity-0 group-hover:opacity-100 transition-opacity" />
        {label}
      </div>
    </motion.div>
  );
}

export function StatsCounter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  const stats = [
    { icon: <Trophy className="w-9 h-9 text-white" />, value: 15, suffix: "+", label: "Years Experience", gradient: "bg-gradient-to-br from-[#FF5722] to-[#E64A19]" },
    { icon: <Building className="w-9 h-9 text-white" />, value: 1300, suffix: "+", label: "Projects Completed", gradient: "bg-gradient-to-br from-[#1E293B] to-[#0A192F]" },
    { icon: <Users className="w-9 h-9 text-white" />, value: 500, suffix: "+", label: "Satisfied Clients", gradient: "bg-gradient-to-br from-[#475569] to-slate-700" },
    { icon: <Globe className="w-9 h-9 text-white" />, value: 3, suffix: "", label: "State Presence", gradient: "bg-gradient-to-br from-amber-600 to-amber-700" },
  ];

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,87,34,0.3) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          style={{ opacity, y }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#FF5722]/10 text-[#FF5722] px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <TrendingUp className="w-4 h-4" />
            Track Record of Excellence
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-4" style={{ fontWeight: 800 }}>
            Engineering Excellence <span className="text-shimmer">in Numbers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
            15 years of delivering turnkey infrastructure solutions across India
          </p>
        </motion.div>

        <motion.div 
          style={{ scale }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} delay={index * 0.1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}