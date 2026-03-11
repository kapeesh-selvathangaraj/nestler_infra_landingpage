import { GlassHeader } from '@/app/components/GlassHeader';
import { PortalHero } from '@/app/components/PortalHero';
import { CompanyOverview } from '@/app/components/CompanyOverview';
import { Highlights } from '@/app/components/Highlights';
import { LocationSection } from '@/app/components/LocationSection';
import { ContactSection } from '@/app/components/ContactSection';
import { Footer } from '@/app/components/Footer';

export default function App() {
  // High-quality industrial images
  const steelImage = 'https://images.unsplash.com/photo-1515100665905-d66c4dea74ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMGJ1aWxkaW5nJTIwY29uc3RydWN0aW9uJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3Njg4OTI2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
  const mineImage = 'https://images.unsplash.com/photo-1664578867628-dae621194f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwcGl0JTIwbWluZSUyMHF1YXJyeXxlbnwxfHx8fDE3Njg4OTI2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <GlassHeader />

      {/* Main Content */}
      <main role="main">
        {/* Portal Hero - Redirect to Divisions */}
        <PortalHero steelImage={steelImage} mineImage={mineImage} />

        {/* Company Overview */}
        <CompanyOverview />

        {/* Key Highlights */}
        <Highlights />

        {/* Mining Locations */}
        <LocationSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}