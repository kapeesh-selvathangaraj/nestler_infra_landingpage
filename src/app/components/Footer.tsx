import { motion } from 'motion/react';
import { Building2, Mountain } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-slate-600 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-sm">N</span>
            </div>
            <span className="font-bold text-white">Nestler Infra</span>
          </div>

          {/* Division Links */}
          <div className="flex items-center gap-6 text-sm">
            <motion.a
              href="https://prefab.nestlerinfra.com"
              whileHover={{ x: 2 }}
              className="flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition-colors"
              aria-label="Visit Prefab Solutions website"
            >
              <Building2 className="w-4 h-4" />
              <span>Prefab</span>
            </motion.a>
            <motion.a
              href="https://mining.nestlerinfra.com"
              whileHover={{ x: 2 }}
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors"
              aria-label="Visit Mining Operations website"
            >
              <Mountain className="w-4 h-4" />
              <span>Mining</span>
            </motion.a>
          </div>

          {/* Copyright */}
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Nestler Infra
          </p>
        </div>
      </div>
    </footer>
  );
}
