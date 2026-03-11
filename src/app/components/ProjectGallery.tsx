import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Mountain, MapPin, Calendar } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'prefab' | 'mining';
  location: string;
  year: string;
  image: string;
  description: string;
}

interface ProjectGalleryProps {
  prefabImages: string[];
  miningImages: string[];
}

export function ProjectGallery({ prefabImages, miningImages }: ProjectGalleryProps) {
  const [filter, setFilter] = useState<'all' | 'prefab' | 'mining'>('all');

  const projects: Project[] = [
    {
      id: '1',
      title: 'Industrial Warehouse Complex',
      category: 'prefab',
      location: 'Chennai, Tamil Nadu',
      year: '2025',
      image: prefabImages[0],
      description: '50,000 sq.ft pre-engineered steel warehouse with advanced logistics infrastructure',
    },
    {
      id: '2',
      title: 'Quartz Mining Operations',
      category: 'mining',
      location: 'Mysore, Karnataka',
      year: '2024',
      image: miningImages[0],
      description: 'Large-scale quartz extraction facility with eco-compliant processing plant',
    },
    {
      id: '3',
      title: 'Manufacturing Facility',
      category: 'prefab',
      location: 'Bangalore, Karnataka',
      year: '2025',
      image: prefabImages[1],
      description: 'State-of-the-art manufacturing unit with integrated office spaces',
    },
    {
      id: '4',
      title: 'Feldspar Processing Unit',
      category: 'mining',
      location: 'Visakhapatnam, AP',
      year: '2024',
      image: miningImages[1],
      description: 'Advanced mineral processing facility with global export capabilities',
    },
    {
      id: '5',
      title: 'Cold Storage Facility',
      category: 'prefab',
      location: 'Coimbatore, Tamil Nadu',
      year: '2025',
      image: prefabImages[2],
      description: 'Temperature-controlled warehouse with automated storage systems',
    },
    {
      id: '6',
      title: 'Multi-Mineral Extraction',
      category: 'mining',
      location: 'Hyderabad, AP',
      year: '2024',
      image: miningImages[2],
      description: 'Integrated mining operation extracting multiple industrial minerals',
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            1300+ successful projects across industrial, commercial, and mining sectors
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-blue-900 to-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('prefab')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                filter === 'prefab'
                  ? 'bg-blue-900 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Prefab Solutions
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('mining')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                filter === 'mining'
                  ? 'bg-amber-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Mountain className="w-4 h-4" />
              Mining Operations
            </motion.button>
          </div>
        </motion.div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${
                      project.category === 'prefab'
                        ? 'bg-blue-900 text-white'
                        : 'bg-amber-700 text-white'
                    }`}>
                      {project.category === 'prefab' ? (
                        <Building2 className="w-4 h-4" />
                      ) : (
                        <Mountain className="w-4 h-4" />
                      )}
                      {project.category === 'prefab' ? 'Prefab' : 'Mining'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button className="w-full bg-white text-blue-900 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors" aria-label="View case study">
                    View Case Study
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-900 to-orange-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
