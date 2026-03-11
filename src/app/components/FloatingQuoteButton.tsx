import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ArrowRight, ArrowLeft, Building2, Mountain, Warehouse, Factory, ShoppingBag, Plane } from 'lucide-react';

type Step = 'initial' | 'projectType' | 'details' | 'contact';
type ProjectType = 'warehouse' | 'factory' | 'commercial' | 'hangar' | 'mining' | 'other';

export function FloatingQuoteButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('initial');
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Quote request submitted for ${projectType}! Our engineer will contact you within 2 hours.`);
    resetForm();
  };

  const resetForm = () => {
    setIsOpen(false);
    setStep('initial');
    setProjectType(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      location: '',
      budget: '',
      timeline: '',
      message: '',
    });
  };

  const projectTypes = [
    { id: 'warehouse' as ProjectType, name: 'Industrial Warehouse', icon: Warehouse, color: 'from-[#1E293B] to-[#FF5722]' },
    { id: 'factory' as ProjectType, name: 'Manufacturing Unit', icon: Factory, color: 'from-[#FF5722] to-[#1E293B]' },
    { id: 'commercial' as ProjectType, name: 'Commercial Space', icon: ShoppingBag, color: 'from-[#1E293B] to-blue-600' },
    { id: 'hangar' as ProjectType, name: 'Aircraft Hangar', icon: Plane, color: 'from-blue-600 to-[#FF5722]' },
    { id: 'mining' as ProjectType, name: 'Mining Operation', icon: Mountain, color: 'from-[#92400E] to-amber-800' },
    { id: 'other' as ProjectType, name: 'Other Project', icon: Building2, color: 'from-gray-600 to-gray-800' },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-r from-[#1E293B] to-[#FF5722] rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-shadow"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-7 h-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulse Animation */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#1E293B] to-[#FF5722] rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Progressive Disclosure Form Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-28 right-8 w-[450px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#1E293B] to-[#FF5722] p-6 text-white">
                <h3 className="text-2xl font-bold mb-2" style={{ fontWeight: 800 }}>Talk to an Engineer</h3>
                <p className="text-white/90 text-sm" style={{ fontWeight: 300 }}>2-hour response guarantee</p>
              </div>

              {/* Progress Bar */}
              <div className="h-1 bg-gray-100">
                <motion.div
                  className="h-full bg-[#FF5722]"
                  initial={{ width: '0%' }}
                  animate={{
                    width: step === 'initial' ? '25%' : step === 'projectType' ? '50%' : step === 'details' ? '75%' : '100%'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Initial Question */}
                  {step === 'initial' && (
                    <motion.div
                      key="initial"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-xl font-bold text-[#0A192F] mb-2" style={{ fontWeight: 800 }}>
                          What are you building?
                        </h4>
                        <p className="text-gray-600 text-sm mb-6" style={{ fontWeight: 300 }}>
                          Select the type of project you need help with
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                          {projectTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                              <motion.button
                                key={type.id}
                                type="button"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  setProjectType(type.id);
                                  setStep('projectType');
                                }}
                                className={`p-4 rounded-xl bg-gradient-to-br ${type.color} text-white flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-shadow`}
                              >
                                <Icon className="w-8 h-8" />
                                <span className="text-sm text-center" style={{ fontWeight: 600 }}>
                                  {type.name}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Project Details */}
                  {step === 'projectType' && (
                    <motion.div
                      key="projectType"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-[#0A192F]" style={{ fontWeight: 800 }}>
                          Project Requirements
                        </h4>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setStep('initial')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontWeight: 600 }}>
                            Location
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-all"
                            placeholder="City, State"
                          />
                        </div>

                        <div>
                          <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontWeight: 600 }}>
                            Timeline
                          </label>
                          <select
                            id="timeline"
                            value={formData.timeline}
                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-all bg-white"
                          >
                            <option value="">Select</option>
                            <option value="urgent">Urgent (1-3 months)</option>
                            <option value="medium">3-6 months</option>
                            <option value="flexible">6+ months</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontWeight: 600 }}>
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-all bg-white"
                        >
                          <option value="">Select budget range</option>
                          <option value="10-25L">₹10-25 Lakhs</option>
                          <option value="25-50L">₹25-50 Lakhs</option>
                          <option value="50L-1Cr">₹50 Lakhs - 1 Crore</option>
                          <option value="1Cr+">₹1 Crore+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontWeight: 600 }}>
                          Additional Details
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-all resize-none"
                          placeholder="Square footage, specific requirements..."
                        />
                      </div>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep('details')}
                        className="w-full bg-gradient-to-r from-[#1E293B] to-[#FF5722] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                        style={{ fontWeight: 600 }}
                      >
                        Continue
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Information */}
                  {step === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-[#0A192F]" style={{ fontWeight: 800 }}>
                          Contact Information
                        </h4>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setStep('projectType')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontWeight: 600 }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontWeight: 600 }}>
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-all"
                          placeholder="Your Company"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontWeight: 600 }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-all"
                          placeholder="john@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontWeight: 600 }}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-[#1E293B] to-[#FF5722] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                        style={{ fontWeight: 600 }}
                      >
                        Submit Request
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>

                      <p className="text-center text-xs text-gray-500 mt-4" style={{ fontWeight: 300 }}>
                        By submitting, you agree to our Terms & Privacy Policy
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* WhatsApp Button - Enhanced with "Talk to Engineer" */}
      <motion.a
        href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20speak%20with%20an%20engineer%20about%20my%20project"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-8 group z-40"
      >
        <div className="relative">
          <div className="w-14 h-14 bg-green-500 rounded-full shadow-xl flex items-center justify-center text-white hover:bg-green-600 transition-colors">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap" style={{ fontWeight: 600 }}>
              Talk to an Engineer
            </div>
          </div>
        </div>
      </motion.a>
    </>
  );
}
