import { motion, useScroll, useTransform } from 'motion/react';
import { Quote, Star, Building2, Mountain, CheckCircle2, TrendingUp, Users, Clock } from 'lucide-react';
import { useRef } from 'react';

interface CaseStudy {
  id: string;
  client: string;
  logo: string;
  industry: string;
  project: string;
  division: 'prefab' | 'mining';
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    icon: React.ReactNode;
  }[];
  testimonial: string;
  author: string;
  position: string;
  image: string;
  specs?: {
    label: string;
    value: string;
  }[];
}

interface TestimonialsProps {
  projectImages: string[];
}

export function Testimonials({ projectImages }: TestimonialsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      client: 'Titan Industries',
      logo: '🏢',
      industry: 'Manufacturing',
      project: '50,000 sq ft Industrial Warehouse Complex',
      division: 'prefab',
      challenge: 'Needed rapid deployment of temperature-controlled storage facility with zero construction delays.',
      solution: 'Pre-engineered steel structure with advanced insulation and automated climate control systems.',
      results: [
        { metric: 'Completion Time', value: '45 Days', icon: <Clock className="w-5 h-5" /> },
        { metric: 'Cost Savings', value: '32%', icon: <TrendingUp className="w-5 h-5" /> },
        { metric: 'Capacity', value: '5000 MT', icon: <Building2 className="w-5 h-5" /> },
      ],
      testimonial: 'Nestler Infra delivered a world-class warehouse in record time. Their engineering team understood our specific requirements and executed flawlessly. The project was completed 15 days ahead of schedule.',
      author: 'Rajesh Malhotra',
      position: 'VP Operations, Titan Industries',
      image: projectImages[0],
      specs: [
        { label: 'Steel Grade', value: 'Q345' },
        { label: 'Roof System', value: 'Standing Seam' },
        { label: 'Insulation', value: 'PUF Panel 100mm' },
      ],
    },
    {
      id: '2',
      client: 'Karnataka Minerals Ltd',
      logo: '⛰️',
      industry: 'Mining & Minerals',
      project: 'Integrated Quartz Extraction & Processing Facility',
      division: 'mining',
      challenge: 'Environmental compliance challenges with traditional mining methods impacting production capacity.',
      solution: 'Eco-compliant extraction technology with closed-loop water recycling and advanced dust suppression systems.',
      results: [
        { metric: 'Production Increase', value: '120%', icon: <TrendingUp className="w-5 h-5" /> },
        { metric: 'Water Conservation', value: '85%', icon: <CheckCircle2 className="w-5 h-5" /> },
        { metric: 'Team Efficiency', value: '40% Better', icon: <Users className="w-5 h-5" /> },
      ],
      testimonial: 'The sustainable mining solutions provided by Nestler transformed our operations. We achieved higher output while significantly reducing our environmental footprint. Their mineral processing expertise is unmatched.',
      author: 'Dr. Suresh Kumar',
      position: 'Director, Karnataka Minerals Ltd',
      image: projectImages[1],
      specs: [
        { label: 'Daily Capacity', value: '500 Tons' },
        { label: 'Purity Level', value: '99.8%' },
        { label: 'Export Ready', value: 'ISO Certified' },
      ],
    },
    {
      id: '3',
      client: 'Apex Automotive',
      logo: '🏭',
      industry: 'Automotive',
      project: 'State-of-the-Art Manufacturing Plant',
      division: 'prefab',
      challenge: 'Required flexible space design to accommodate future expansion and heavy machinery installation.',
      solution: 'Modular pre-engineered building with reinforced foundation and crane-ready infrastructure.',
      results: [
        { metric: 'Floor Area', value: '75,000 sq ft', icon: <Building2 className="w-5 h-5" /> },
        { metric: 'Construction Speed', value: '60 Days', icon: <Clock className="w-5 h-5" /> },
        { metric: 'ROI Timeline', value: '18 Months', icon: <TrendingUp className="w-5 h-5" /> },
      ],
      testimonial: 'From concept to completion, Nestler Infra was exceptional. The modular design allows us to scale operations seamlessly. Their understanding of industrial requirements sets them apart from competitors.',
      author: 'Priya Nair',
      position: 'Plant Manager, Apex Automotive',
      image: projectImages[2],
      specs: [
        { label: 'Crane Capacity', value: '20 Ton EOT' },
        { label: 'Bay Spacing', value: '30m x 60m' },
        { label: 'Clearance Height', value: '12 meters' },
      ],
    },
  ];

  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0A192F 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          style={{ opacity, scale }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#FF5722]/10 text-[#FF5722] px-4 py-2 rounded-full mb-6"
          >
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm" style={{ fontWeight: 600 }}>Client Success Stories</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-4" style={{ fontWeight: 800 }}>
            Engineering Excellence in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontWeight: 300 }}>
            Real projects, real results. See how we've transformed infrastructure challenges into success stories for India's leading companies.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image & Specs */}
              <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl group"
                >
                  <img
                    src={study.image}
                    alt={study.project}
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  
                  {/* Division Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-2 rounded-full text-white flex items-center gap-2 ${
                      study.division === 'prefab' ? 'bg-[#FF5722]' : 'bg-[#92400E]'
                    }`} style={{ fontWeight: 600 }}>
                      {study.division === 'prefab' ? (
                        <><Building2 className="w-4 h-4" /> Prefab</>
                      ) : (
                        <><Mountain className="w-4 h-4" /> Mining</>
                      )}
                    </span>
                  </div>

                  {/* Technical Specs Overlay */}
                  {study.specs && (
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs text-gray-500 mb-2" style={{ fontWeight: 600 }}>TECHNICAL SPECIFICATIONS</p>
                      <div className="grid grid-cols-3 gap-3">
                        {study.specs.map((spec, i) => (
                          <div key={i}>
                            <p className="text-xs text-gray-600" style={{ fontWeight: 300 }}>{spec.label}</p>
                            <p className="text-sm font-bold text-[#0A192F]" style={{ fontWeight: 600 }}>{spec.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                {/* Client Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{study.logo}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A192F]" style={{ fontWeight: 800 }}>{study.client}</h3>
                    <p className="text-gray-600" style={{ fontWeight: 300 }}>{study.industry}</p>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-[#0A192F] mb-4" style={{ fontWeight: 600 }}>
                  {study.project}
                </h4>

                {/* Challenge & Solution */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-[#FF5722] mb-2" style={{ fontWeight: 600 }}>THE CHALLENGE</p>
                    <p className="text-gray-700" style={{ fontWeight: 300 }}>{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#1E293B] mb-2" style={{ fontWeight: 600 }}>OUR SOLUTION</p>
                    <p className="text-gray-700" style={{ fontWeight: 300 }}>{study.solution}</p>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.results.map((result, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100 shadow-sm"
                    >
                      <div className="text-[#FF5722] mb-2">{result.icon}</div>
                      <p className="text-2xl font-bold text-[#0A192F] mb-1" style={{ fontWeight: 800 }}>{result.value}</p>
                      <p className="text-xs text-gray-600" style={{ fontWeight: 300 }}>{result.metric}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="bg-gradient-to-br from-[#1E293B] to-[#0A192F] rounded-xl p-6 relative">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-white/20" />
                  <p className="text-white mb-4 relative z-10" style={{ fontWeight: 300 }}>
                    "{study.testimonial}"
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF5722] text-[#FF5722]" />
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-white" style={{ fontWeight: 600 }}>{study.author}</p>
                    <p className="text-sm text-white/80" style={{ fontWeight: 300 }}>{study.position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-[#1E293B] to-[#FF5722] rounded-2xl p-12"
        >
          <h3 className="text-3xl font-bold text-white mb-4" style={{ fontWeight: 800 }}>
            Ready to Transform Your Infrastructure Project?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
            Join 500+ satisfied clients who trust Nestler Infra for their critical infrastructure needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#1E293B] px-8 py-4 rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            style={{ fontWeight: 600 }}
          >
            Schedule Engineering Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
