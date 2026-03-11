import { motion } from 'motion/react';
import { 
  Building2, 
  Mountain, 
  Shield, 
  Zap, 
  Globe, 
  Award,
  Wrench,
  Leaf,
  ArrowRight
} from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  size?: 'small' | 'medium' | 'large';
  image?: string;
  index: number;
}

function BentoCard({ title, description, icon, gradient, size = 'medium', image, index }: BentoCardProps) {
  const sizeClasses = {
    small: 'md:col-span-1 md:row-span-1',
    medium: 'md:col-span-1 md:row-span-2',
    large: 'md:col-span-2 md:row-span-1',
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all group card-shine ${sizeClasses[size]}`}
    >
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#FF5722]/20 transition-colors duration-300" />

      {/* Content */}
      <div className="relative p-8 h-full flex flex-col">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
        >
          {icon}
        </motion.div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#0A192F] transition-colors">{title}</h3>
        <p className="text-gray-600 leading-relaxed flex-grow group-hover:text-gray-700 transition-colors">{description}</p>

        <motion.div
          className="mt-6 text-sm font-semibold text-[#FF5722] flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ x: 8 }}
        >
          Learn More
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function BentoGrid() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,87,34,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,87,34,0.5) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#1E293B]/10 text-[#1E293B] px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Award className="w-4 h-4" />
            Why Choose Us
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-shimmer">Nestler Infra</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dual-division expertise delivering comprehensive infrastructure solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(200px,auto)] gap-6">
          {/* Prefab Excellence */}
          <BentoCard
            title="Pre-Engineered Steel"
            description="Custom-designed steel structures with rapid deployment. ISO-certified manufacturing ensuring superior quality and durability for industrial and commercial applications."
            icon={<Building2 className="w-8 h-8 text-white" />}
            gradient="bg-gradient-to-br from-[#1E293B] to-[#0A192F]"
            size="large"
            index={0}
          />

          {/* Mining Operations */}
          <BentoCard
            title="Sustainable Mining"
            description="Eco-compliant mineral extraction with advanced processing technology. Specializing in quartz, feldspar, and industrial minerals with global export capabilities."
            icon={<Mountain className="w-8 h-8 text-white" />}
            gradient="bg-gradient-to-br from-[#92400E] to-[#78350F]"
            size="medium"
            index={1}
          />

          {/* Quality Assurance */}
          <BentoCard
            title="Quality First"
            description="ISO 9001:2015 certified processes ensuring world-class standards in every project."
            icon={<Shield className="w-8 h-8 text-white" />}
            gradient="bg-gradient-to-br from-[#FF5722] to-[#E64A19]"
            size="small"
            index={2}
          />

          {/* Fast Delivery */}
          <BentoCard
            title="Rapid Execution"
            description="Turnkey solutions with accelerated project timelines without compromising quality."
            icon={<Zap className="w-8 h-8 text-white" />}
            gradient="bg-gradient-to-br from-[#1E293B] to-blue-700"
            size="small"
            index={3}
          />

          {/* Engineering Excellence */}
          <BentoCard
            title="Engineering Innovation"
            description="15 years of technical expertise delivering cutting-edge solutions. Our in-house engineering team designs structures optimized for strength, cost-efficiency, and sustainability."
            icon={<Wrench className="w-8 h-8 text-white" />}
            gradient="bg-gradient-to-br from-[#475569] to-slate-700"
            size="medium"
            index={4}
          />

          {/* Global Reach */}
          <BentoCard
            title="Pan-India Network"
            description="Strategic presence across Tamil Nadu, Karnataka, and Andhra Pradesh with nationwide project execution capabilities."
            icon={<Globe className="w-8 h-8 text-white" />}
            gradient="bg-gradient-to-br from-[#0A192F] to-[#1E293B]"
            size="small"
            index={5}
          />

          {/* Sustainability */}
          <BentoCard
            title="Eco-Conscious"
            description="Committed to sustainable practices in both manufacturing and mining operations with minimal environmental impact."
            icon={<Leaf className="w-8 h-8 text-white" />}
            gradient="bg-gradient-to-br from-green-700 to-emerald-800"
            size="small"
            index={6}
          />

          {/* Awards & Recognition */}
          <BentoCard
            title="Industry Recognition"
            description="Award-winning infrastructure solutions recognized for excellence in engineering, sustainability, and client satisfaction across multiple industry sectors."
            icon={<Award className="w-8 h-8 text-white" />}
            gradient="bg-gradient-to-br from-[#FF5722] to-[#FF8A65]"
            size="large"
            index={7}
          />
        </div>
      </div>
    </section>
  );
}