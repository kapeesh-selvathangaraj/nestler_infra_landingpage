import { motion } from 'motion/react';
import { Building2, Mountain, Phone, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function GlassHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-xl border-white/10' 
          : 'bg-slate-900/80 backdrop-blur-md border-white/5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a 
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            aria-label="Nestler Infra - Home"
          >
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="w-11 h-11 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30"
            >
              <span className="font-black text-white text-xl">N</span>
            </motion.div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight group-hover:text-orange-400 transition-colors">Nestler Infra</h1>
              <p className="text-[10px] text-white/40 leading-tight">Engineering Excellence</p>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <motion.a
              href="#hero"
              whileHover={{ y: -2 }}
              className="relative px-4 py-2 text-sm font-medium text-orange-400 transition-colors"
              aria-label="Home section"
            >
              Home
              <motion.div
                layoutId="activeNav"
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-orange-500 rounded-full"
              />
            </motion.a>
            <motion.a
              href="#divisions"
              whileHover={{ y: -2 }}
              className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              aria-label="Divisions section"
            >
              Divisions
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              aria-label="Contact section"
            >
              Contact
            </motion.a>
          </nav>

          {/* Division Links & CTA */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Division Links */}
            <div className="flex items-center gap-4 pr-4 border-r border-white/10">
              <motion.a
                href="https://prefab.nestlerinfra.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-orange-400 hover:text-orange-300 transition-colors"
                aria-label="Visit Prefab Solutions (opens in new tab)"
              >
                <Building2 className="w-4 h-4" />
                <span>Prefab</span>
              </motion.a>
              <motion.a
                href="https://mining.nestlerinfra.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                aria-label="Visit Mining Operations (opens in new tab)"
              >
                <Mountain className="w-4 h-4" />
                <span>Mining</span>
              </motion.a>
            </div>

            {/* Phone & CTA */}
            <a
              href="tel:+919944118888"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              aria-label="Call us at +91-9944118888"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">+91-9944118888</span>
            </a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow"
              aria-label="Get Started - Contact us"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="py-4 border-t border-white/10">
              <nav className="flex flex-col gap-1 mb-4">
                <a
                  href="#hero"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-orange-400 rounded-lg transition-colors"
                >
                  Home
                </a>
                <a
                  href="#divisions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Divisions
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Contact
                </a>
              </nav>

              <div className="border-t border-white/10 pt-4 mb-4">
                <p className="px-3 text-xs text-white/40 uppercase tracking-wider mb-2">Divisions</p>
                <a
                  href="https://prefab.nestlerinfra.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors"
                  aria-label="Visit Prefab Solutions website (opens in new tab)"
                >
                  <Building2 className="w-5 h-5" />
                  <span>Prefab Solutions</span>
                </a>
                <a
                  href="https://mining.nestlerinfra.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
                  aria-label="Visit Mining Operations website (opens in new tab)"
                >
                  <Mountain className="w-5 h-5" />
                  <span>Mining Operations</span>
                </a>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 text-white/60 mb-4">
                <Phone className="w-5 h-5" />
                <span>+91-9944118888</span>
              </div>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg font-semibold text-center shadow-lg shadow-orange-500/30"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}