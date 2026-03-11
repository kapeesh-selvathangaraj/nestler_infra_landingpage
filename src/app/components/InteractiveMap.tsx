import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Building2, Mountain, Phone, Users, TrendingUp } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  state: string;
  type: 'prefab' | 'mining' | 'both';
  projects: number;
  x: number;
  y: number;
  unitType: string;
  capacity: string;
  manager: string;
  phone: string;
  employees: number;
  revenue: string;
}

const locations: Location[] = [
  { 
    id: 'tn1', 
    name: 'Chennai', 
    state: 'Tamil Nadu', 
    type: 'both', 
    projects: 450, 
    x: 65, 
    y: 75,
    unitType: 'Manufacturing Hub',
    capacity: '1200+ Tons/Month',
    manager: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    employees: 85,
    revenue: '₹45Cr'
  },
  { 
    id: 'tn2', 
    name: 'Coimbatore', 
    state: 'Tamil Nadu', 
    type: 'prefab', 
    projects: 280, 
    x: 55, 
    y: 72,
    unitType: 'Distribution Center',
    capacity: '800 Tons/Month',
    manager: 'Priya Sharma',
    phone: '+91 98765 43211',
    employees: 52,
    revenue: '₹28Cr'
  },
  { 
    id: 'ka1', 
    name: 'Bangalore', 
    state: 'Karnataka', 
    type: 'both', 
    projects: 380, 
    x: 58, 
    y: 68,
    unitType: 'Regional HQ & Plant',
    capacity: '1000+ Tons/Month',
    manager: 'Arun Menon',
    phone: '+91 98765 43212',
    employees: 95,
    revenue: '₹52Cr'
  },
  { 
    id: 'ka2', 
    name: 'Mysore', 
    state: 'Karnataka', 
    type: 'mining', 
    projects: 120, 
    x: 54, 
    y: 70,
    unitType: 'Mining Operations',
    capacity: '500 Tons/Month',
    manager: 'Vikram Reddy',
    phone: '+91 98765 43213',
    employees: 68,
    revenue: '₹18Cr'
  },
  { 
    id: 'ap1', 
    name: 'Hyderabad', 
    state: 'Andhra Pradesh', 
    type: 'both', 
    projects: 320, 
    x: 62, 
    y: 62,
    unitType: 'Integrated Facility',
    capacity: '950 Tons/Month',
    manager: 'Suresh Babu',
    phone: '+91 98765 43214',
    employees: 78,
    revenue: '₹38Cr'
  },
  { 
    id: 'ap2', 
    name: 'Visakhapatnam', 
    state: 'Andhra Pradesh', 
    type: 'prefab', 
    projects: 180, 
    x: 72, 
    y: 60,
    unitType: 'Coastal Distribution',
    capacity: '600 Tons/Month',
    manager: 'Lakshmi Devi',
    phone: '+91 98765 43215',
    employees: 45,
    revenue: '₹22Cr'
  },
];

export function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-4" style={{ fontWeight: 800 }}>
            Our Pan-India Presence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
            Strategic operations across Tamil Nadu, Karnataka, and Andhra Pradesh
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Map Visualization */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-square bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl p-8 overflow-hidden shadow-xl">
              {/* Simplified South India Map Outline */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Karnataka */}
                <motion.path
                  d="M 30,45 L 45,35 L 60,40 L 65,55 L 55,70 L 40,65 Z"
                  fill={hoveredState === 'Karnataka' ? '#1E293B' : '#E0E7FF'}
                  stroke="#1E293B"
                  strokeWidth="0.5"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredState('Karnataka')}
                  onMouseLeave={() => setHoveredState(null)}
                  whileHover={{ scale: 1.02 }}
                />
                
                {/* Andhra Pradesh */}
                <motion.path
                  d="M 60,40 L 75,35 L 85,50 L 80,65 L 65,55 Z"
                  fill={hoveredState === 'Andhra Pradesh' ? '#92400E' : '#FEF3C7'}
                  stroke="#92400E"
                  strokeWidth="0.5"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredState('Andhra Pradesh')}
                  onMouseLeave={() => setHoveredState(null)}
                  whileHover={{ scale: 1.02 }}
                />
                
                {/* Tamil Nadu */}
                <motion.path
                  d="M 40,65 L 55,70 L 65,85 L 50,90 L 35,80 Z"
                  fill={hoveredState === 'Tamil Nadu' ? '#FF5722' : '#FFEDD5'}
                  stroke="#FF5722"
                  strokeWidth="0.5"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredState('Tamil Nadu')}
                  onMouseLeave={() => setHoveredState(null)}
                  whileHover={{ scale: 1.02 }}
                />

                {/* Location Markers */}
                {locations.map((location) => (
                  <motion.g
                    key={location.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.circle
                      cx={location.x}
                      cy={location.y}
                      r="2"
                      fill={location.type === 'prefab' ? '#FF5722' : location.type === 'mining' ? '#92400E' : '#1E293B'}
                      className="cursor-pointer"
                      whileHover={{ scale: 1.5 }}
                      onClick={() => setSelectedLocation(location)}
                    />
                    <motion.circle
                      cx={location.x}
                      cy={location.y}
                      r="3"
                      fill="none"
                      stroke={location.type === 'prefab' ? '#FF5722' : location.type === 'mining' ? '#92400E' : '#1E293B'}
                      strokeWidth="0.5"
                      className="cursor-pointer opacity-50"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.g>
                ))}
              </svg>

              {/* State Labels */}
              <div className="absolute top-1/4 left-1/4 text-xs font-semibold text-[#1E293B]" style={{ fontWeight: 600 }}>Karnataka</div>
              <div className="absolute top-1/3 right-1/4 text-xs font-semibold text-[#92400E]" style={{ fontWeight: 600 }}>Andhra Pradesh</div>
              <div className="absolute bottom-1/4 left-1/3 text-xs font-semibold text-[#FF5722]" style={{ fontWeight: 600 }}>Tamil Nadu</div>
            </div>
          </motion.div>

          {/* Location Details - Enhanced Bento Box */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {selectedLocation ? (
                <motion.div
                  key={selectedLocation.id}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedLocation.type === 'prefab' ? 'bg-[#FF5722]' :
                      selectedLocation.type === 'mining' ? 'bg-[#92400E]' : 'bg-[#1E293B]'
                    }`}>
                      {selectedLocation.type === 'prefab' ? (
                        <Building2 className="w-6 h-6 text-white" />
                      ) : selectedLocation.type === 'mining' ? (
                        <Mountain className="w-6 h-6 text-white" />
                      ) : (
                        <MapPin className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#0A192F]" style={{ fontWeight: 800 }}>{selectedLocation.name}</h3>
                      <p className="text-gray-600" style={{ fontWeight: 300 }}>{selectedLocation.state}</p>
                    </div>
                  </div>

                  {/* Detailed Info Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1" style={{ fontWeight: 600 }}>Unit Type</p>
                      <p className="text-lg font-bold text-[#0A192F]" style={{ fontWeight: 600 }}>{selectedLocation.unitType}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1" style={{ fontWeight: 600 }}>Capacity</p>
                      <p className="text-lg font-bold text-[#FF5722]" style={{ fontWeight: 600 }}>{selectedLocation.capacity}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <p className="text-sm text-gray-500" style={{ fontWeight: 600 }}>Team Size</p>
                      </div>
                      <p className="text-lg font-bold text-[#0A192F]" style={{ fontWeight: 600 }}>{selectedLocation.employees} Employees</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-gray-500" />
                        <p className="text-sm text-gray-500" style={{ fontWeight: 600 }}>Annual Revenue</p>
                      </div>
                      <p className="text-lg font-bold text-green-600" style={{ fontWeight: 600 }}>{selectedLocation.revenue}</p>
                    </div>
                  </div>

                  <div className="border-t pt-6 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1" style={{ fontWeight: 600 }}>Projects Completed</p>
                      <p className="text-3xl font-bold text-[#0A192F]" style={{ fontWeight: 800 }}>{selectedLocation.projects}+</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-2" style={{ fontWeight: 600 }}>Active Divisions</p>
                      <div className="flex gap-2">
                        {(selectedLocation.type === 'both' || selectedLocation.type === 'prefab') && (
                          <span className="px-3 py-1 bg-[#FF5722] text-white rounded-full text-sm" style={{ fontWeight: 600 }}>
                            Prefab
                          </span>
                        )}
                        {(selectedLocation.type === 'both' || selectedLocation.type === 'mining') && (
                          <span className="px-3 py-1 bg-[#92400E] text-white rounded-full text-sm" style={{ fontWeight: 600 }}>
                            Mining
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm text-gray-500 mb-2" style={{ fontWeight: 600 }}>Contact Manager</p>
                      <p className="font-bold text-[#0A192F] mb-1" style={{ fontWeight: 600 }}>{selectedLocation.manager}</p>
                      <a 
                        href={`tel:${selectedLocation.phone}`}
                        className="flex items-center gap-2 text-[#FF5722] hover:text-[#1E293B] transition-colors"
                        style={{ fontWeight: 600 }}
                      >
                        <Phone className="w-4 h-4" />
                        <span>{selectedLocation.phone}</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 text-center"
                >
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600" style={{ fontWeight: 300 }}>Click on a location pin to view detailed facility information</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Legend */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <h4 className="font-semibold text-[#0A192F] mb-4" style={{ fontWeight: 600 }}>Legend</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#FF5722] rounded-full" />
                  <span className="text-sm text-gray-600" style={{ fontWeight: 300 }}>Prefab Operations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#92400E] rounded-full" />
                  <span className="text-sm text-gray-600" style={{ fontWeight: 300 }}>Mining Operations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#1E293B] rounded-full" />
                  <span className="text-sm text-gray-600" style={{ fontWeight: 300 }}>Combined Operations</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
