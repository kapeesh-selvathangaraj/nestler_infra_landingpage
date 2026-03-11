'use client';

import { motion, useInView, AnimatePresence } from 'motion/react';
import { MapPin, Mountain, Gem, Factory, Building2, Zap, Navigation, X } from 'lucide-react';
import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const locations = [
  {
    id: 'tiruppur',
    name: 'Tiruppur, Tamil Nadu',
    subtitle: 'Corporate HQ',
    type: 'headquarters',
    minerals: ['Prefab Manufacturing', 'Corporate'],
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    icon: Building2,
    description: 'Corporate headquarters and prefab manufacturing facility.',
    stats: { capacity: '50K MT/yr', team: '500+', since: '2010' },
    coordinates: [11.1085, 77.3411] as [number, number],
  },
  {
    id: 'andhra',
    name: 'Andhra Pradesh',
    subtitle: 'Multi-Mineral Hub',
    type: 'mining',
    minerals: ['Quartz', 'Feldspar', 'Iron Ore'],
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.6)',
    icon: Gem,
    description: 'Primary mining hub for quartz and feldspar extraction.',
    stats: { output: '2,500 TPD', grade: '98.5%', mines: '3' },
    coordinates: [15.9129, 79.7400] as [number, number],
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    subtitle: 'Iron Ore Belt',
    type: 'mining',
    minerals: ['Iron Ore', 'Hematite'],
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.6)',
    icon: Factory,
    description: 'High-grade hematite deposits in the Western Ghats.',
    stats: { output: '5,000 TPD', grade: '64% Fe', mines: '2' },
    coordinates: [15.3175, 75.7139] as [number, number],
  },
  {
    id: 'bihar',
    name: 'Bihar',
    subtitle: 'Pyrite Operations',
    type: 'mining',
    minerals: ['Pyrite', 'Industrial Sulfur'],
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    icon: Mountain,
    description: 'Strategic pyrite extraction for industrial sulfur.',
    stats: { output: '800 TPD', purity: '95%', mines: '1' },
    coordinates: [25.0960, 85.3131] as [number, number],
  },
];

// Custom marker icon creator
const createCustomIcon = (color: string, isHQ: boolean = false) => {
  const size = isHQ ? 40 : 32;
  const html = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 20px ${color}, 0 4px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: ${size * 0.4}px;
        height: ${size * 0.4}px;
        background: white;
        border-radius: 50%;
      "></div>
    </div>
  `;
  
  return L.divIcon({
    className: 'custom-marker',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

// Map controller component
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

export function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([16.0, 78.0]);
  const [mapZoom, setMapZoom] = useState(5);

  const selected = locations.find((l) => l.id === selectedLocation);

  const handleLocationClick = (locationId: string) => {
    const location = locations.find((l) => l.id === locationId);
    if (location) {
      setSelectedLocation(locationId);
      setMapCenter(location.coordinates);
      setMapZoom(7);
    }
  };

  const handleCloseDetail = () => {
    setSelectedLocation(null);
    setMapCenter([16.0, 78.0]);
    setMapZoom(5);
  };

  return (
    <section id="locations" ref={ref} className="relative min-h-screen py-24 overflow-hidden bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-sm text-white/60 mb-6 backdrop-blur-sm"
          >
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>Operational Network</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Our{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Locations
            </span>
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto">
            Strategic mining operations and manufacturing facilities across India.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Map Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-emerald-500/10 pointer-events-none z-10" />
              
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '500px', width: '100%', background: '#1e293b' }}
                scrollWheelZoom={true}
                zoomControl={false}
              >
                <MapController center={mapCenter} zoom={mapZoom} />
                
                {/* Dark themed tiles */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                
                {/* Markers */}
                {locations.map((location) => (
                  <Marker
                    key={location.id}
                    position={location.coordinates}
                    icon={createCustomIcon(location.color, location.type === 'headquarters')}
                    eventHandlers={{
                      click: () => handleLocationClick(location.id),
                    }}
                  >
                    <Popup className="custom-popup">
                      <div className="p-2 min-w-[180px]">
                        <h4 className="font-bold text-slate-900">{location.name}</h4>
                        <p className="text-sm text-slate-600">{location.subtitle}</p>
                        <button
                          onClick={() => handleLocationClick(location.id)}
                          className="mt-2 text-xs text-orange-500 hover:underline"
                          aria-label={`View details for ${location.name}`}
                        >
                          View Details →
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-xs text-white/60 mb-2 uppercase tracking-wider">Legend</p>
                <div className="space-y-2">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleLocationClick(loc.id)}
                      className="flex items-center gap-2 hover:bg-white/5 rounded-lg px-2 py-1 transition-colors w-full"
                      aria-label={`Select ${loc.name}`}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: loc.color, boxShadow: `0 0 8px ${loc.color}` }}
                      />
                      <span className="text-xs text-white/80">{loc.name.split(',')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location Cards Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Access</h3>
            {locations.map((location, index) => (
              <motion.button
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => handleLocationClick(location.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                  selectedLocation === location.id
                    ? 'bg-white/10 border-white/20 scale-[1.02]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${location.color}, #1e1b4b)`,
                      boxShadow: `0 0 20px ${location.glowColor}`,
                    }}
                  >
                    <location.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-white font-medium">{location.name.split(',')[0]}</p>
                    <p className="text-white/50 text-sm">{location.subtitle}</p>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: location.color, boxShadow: `0 0 10px ${location.color}` }}
                  />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="mt-8 max-w-4xl mx-auto"
            >
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,27,75,0.95) 100%)',
                  boxShadow: `0 0 60px ${selected.glowColor}`,
                }}
              >
                {/* Gradient Border */}
                <div
                  className="absolute inset-0 rounded-3xl p-[1px]"
                  style={{
                    background: `linear-gradient(135deg, ${selected.color}, transparent, ${selected.color})`,
                  }}
                >
                  <div className="w-full h-full rounded-3xl bg-slate-900/90" />
                </div>

                <div className="relative p-8">
                  {/* Close Button */}
                  <button
                    onClick={handleCloseDetail}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                    aria-label="Close details panel"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Icon Section */}
                    <div className="flex-shrink-0">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        className="w-24 h-24 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${selected.color}, #1e1b4b)`,
                          boxShadow: `0 0 40px ${selected.glowColor}`,
                        }}
                      >
                        <selected.icon className="w-12 h-12 text-white" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: `${selected.color}20`,
                            color: selected.color,
                            border: `1px solid ${selected.color}40`,
                          }}
                        >
                          {selected.type === 'headquarters' ? 'Headquarters' : 'Mining Site'}
                        </span>
                        <span className="text-white/40 text-sm">{selected.subtitle}</span>
                      </div>

                      <h3 className="text-3xl font-bold text-white mb-3">{selected.name}</h3>
                      <p className="text-white/60 mb-6 leading-relaxed">{selected.description}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {Object.entries(selected.stats).map(([key, value]) => (
                          <div
                            key={key}
                            className="bg-white/5 rounded-xl p-4 border border-white/5"
                          >
                            <p className="text-2xl font-bold text-white">{value}</p>
                            <p className="text-xs text-white/40 uppercase">{key}</p>
                          </div>
                        ))}
                      </div>

                      {/* Minerals */}
                      <div className="flex flex-wrap gap-2">
                        {selected.minerals.map((mineral) => (
                          <span
                            key={mineral}
                            className="px-4 py-2 rounded-full text-sm"
                            style={{
                              background: `${selected.color}15`,
                              border: `1px solid ${selected.color}30`,
                              color: selected.color,
                            }}
                          >
                            {mineral}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Footer */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Navigation, label: 'States', value: '4' },
            { icon: Mountain, label: 'Mines', value: '7' },
            { icon: Zap, label: 'Daily Output', value: '8.3K TPD' },
            { icon: MapPin, label: 'Team', value: '500+' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <stat.icon className="w-6 h-6 text-orange-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-white/40">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Custom styles for Leaflet */}
      <style>{`
        .leaflet-container {
          font-family: inherit;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(15, 23, 42, 0.95);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .leaflet-popup-content {
          color: white;
          margin: 8px 12px;
        }
        .leaflet-popup-tip {
          background: rgba(15, 23, 42, 0.95);
        }
        .leaflet-popup-close-button {
          display: none;
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </section>
  );
}
