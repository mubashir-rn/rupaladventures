import Header from "@/components/Header";
import ExpeditionShowcase from "@/components/ExpeditionShowcase";
import { expeditions } from "@/data/expeditions";
import Logo from "@/components/Logo";
import LogoWatermark from "@/components/LogoWatermark";
import Footer from "@/components/Footer";

const Expeditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header Section with Background Image */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url('/src/assets/hero-mountain.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        
        {/* Logo Watermark */}
        <LogoWatermark opacity={0.03} size="xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Our Expeditions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our complete range of mountain expeditions and trekking adventures. 
            From 8000m peaks to scenic treks, find your perfect mountain challenge.
          </p>
        </div>
      </section>

      {/* Expeditions Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expeditions.map((expedition) => (
              <ExpeditionShowcase 
                key={expedition.id} 
                expedition={expedition}
                variant="default"
                showLogo={true}
                showActions={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg mb-6 text-gray-200">
            We offer custom expeditions and can tailor any adventure to your specific needs and experience level.
          </p>
          <button 
            className="bg-white/20 text-white border border-white/30 hover:bg-white/30 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            onClick={() => window.open('https://wa.me/923169457494', '_blank')}
          >
            Contact Us for Custom Expeditions
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Expeditions;