import { motion } from 'motion/react';
import { Send, Loader2, CheckCircle2, User, Mail, Phone, Building2, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  division: string;
  message: string;
}

const initialState: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  division: '',
  message: '',
};

export function InquiryForm() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // EmailJS configuration
      // Replace these with your actual EmailJS credentials
      const serviceId = 'service_nestlerinfra'; // Your EmailJS service ID
      const templateIdToCompany = 'template_inquiry'; // Template for company notification
      const templateIdAutoReply = 'template_autoreply'; // Template for auto-reply to user
      const publicKey = 'YOUR_PUBLIC_KEY'; // Your EmailJS public key

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        division: formData.division,
        message: formData.message,
        to_email: 'info@nestlerinfra.com',
      };

      // Send email to company
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateIdToCompany,
          user_id: publicKey,
          template_params: templateParams,
        }),
      });

      if (response.ok) {
        // Send auto-reply to user
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateIdAutoReply,
            user_id: publicKey,
            template_params: {
              to_name: formData.name,
              to_email: formData.email,
              division: formData.division,
              message: formData.message,
            },
          }),
        });

        setIsSuccess(true);
        setFormData(initialState);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to submit inquiry. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm text-center"
      >
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Inquiry Submitted!</h3>
        <p className="text-white/60 mb-4">
          Thank you for your inquiry. We've sent a confirmation to your email.
          Our team will contact you within 24 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-orange-400 font-semibold hover:text-orange-300"
        >
          Submit Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Send Us an Inquiry</h3>
        <p className="text-white/50 text-sm">Fill out the form and we'll get back to you within 24 hours</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Email Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-colors text-white placeholder:text-white/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@company.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-colors text-white placeholder:text-white/30"
              />
            </div>
          </div>
        </div>

        {/* Phone & Company Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-colors text-white placeholder:text-white/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Company Name
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="ABC Industries"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-colors text-white placeholder:text-white/30"
              />
            </div>
          </div>
        </div>

        {/* Division Selection */}
        <div>
          <label htmlFor="division" className="block text-sm font-medium text-white/70 mb-1">
            Interested Division *
          </label>
          <select
            id="division"
            name="division"
            value={formData.division}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-colors text-white bg-slate-800"
          >
            <option value="" className="bg-slate-800">Select a division</option>
            <option value="Prefab Solutions" className="bg-slate-800">Prefab Solutions - Steel Buildings</option>
            <option value="Mining Operations" className="bg-slate-800">Mining Operations - Minerals</option>
            <option value="Both" className="bg-slate-800">Both Divisions</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">
            Your Message *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-white/30" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Tell us about your requirements..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-colors text-white resize-none placeholder:text-white/30"
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Inquiry
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
