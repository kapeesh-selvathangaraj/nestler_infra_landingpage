import { motion, useInView } from 'motion/react';
import { Mail, Phone, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
import { InquiryForm } from './InquiryForm';
import { useRef } from 'react';

const contactInfo = [
  { 
    icon: <Phone className="w-6 h-6" />, 
    label: 'Phone', 
    value: '+91-9944118888',
    subtext: 'Mon-Sat, 9AM-6PM',
    href: 'tel:+919944118888',
    color: 'from-orange-500 to-orange-600',
    shadowColor: 'shadow-orange-500/30'
  },
  { 
    icon: <Mail className="w-6 h-6" />, 
    label: 'Email', 
    value: 'info@nestlerinfra.com',
    subtext: 'Quick Response',
    href: 'mailto:info@nestlerinfra.com',
    color: 'from-blue-500 to-blue-600',
    shadowColor: 'shadow-blue-500/30'
  },
  { 
    icon: <MapPin className="w-6 h-6" />, 
    label: 'Head Office', 
    value: 'Tiruppur, Tamil Nadu',
    subtext: 'India - 641604',
    href: null,
    color: 'from-amber-500 to-amber-600',
    shadowColor: 'shadow-amber-500/30'
  },
  { 
    icon: <Clock className="w-6 h-6" />, 
    label: 'Business Hours', 
    value: 'Monday - Saturday',
    subtext: '9:00 AM - 6:00 PM IST',
    href: null,
    color: 'from-emerald-500 to-emerald-600',
    shadowColor: 'shadow-emerald-500/30'
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Animated gradient */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full blur-[150px]"
      />

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
            <Send className="w-4 h-4 text-orange-400" />
            <span>Get in Touch</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Connect With Us
          </h2>
          <p className="text-lg text-white/50 max-w-lg mx-auto">
            Have questions? Reach out to the right team for your requirements.
          </p>
        </motion.div>

        {/* Contact Cards and Form Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Info Cards */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ y: 30, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="relative bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-white/20 transition-all">
                    <div className={`w-12 h-12 mb-4 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg ${item.shadowColor}`}>
                      <span className="text-white">{item.icon}</span>
                    </div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-lg font-semibold text-white hover:text-orange-400 transition-colors block" aria-label={`${item.label}: ${item.value}`}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-semibold text-white">{item.value}</p>
                    )}
                    <p className="text-sm text-white/40 mt-1">{item.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick CTA */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <motion.a
                href="https://prefab.nestlerinfra.com"
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-orange-500/20"
                aria-label="Visit Prefab Division website"
              >
                <span>Prefab Division</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://mining.nestlerinfra.com"
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-amber-500/20"
                aria-label="Visit Mining Division website"
              >
                <span>Mining Division</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Inquiry Form */}
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
