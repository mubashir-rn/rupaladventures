import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ExpeditionShowcase from "@/components/ExpeditionShowcase";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { expeditions } from "@/data/expeditions";
import { ArrowRight, Award, Users, Shield, Phone, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import LogoWatermark from "@/components/LogoWatermark";
import heroMountain from "@/assets/hero-mountain.jpg";

const Home = () => {
  // Show first 3 expeditions on home page
  const featuredExpeditions = expeditions.slice(0, 3);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Rupal Adventures",
    "description": "Expert-led mountain expeditions and treks in Pakistan. Conquer Nanga Parbat, Laila Peak and more with professional guides.",
    "url": "https://rupaladventures.com",
    "logo": "https://rupaladventures.com/src/assets/logo.png",
    "image": "https://rupaladventures.com/src/assets/hero-mountain.jpg",
    "telephone": "+92-316-9457494",
    "email": "info@rupaladventures.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Pakistan"
    },
    "founder": {
      "@type": "Person",
      "name": "Mubashir Hussain"
    },
    "serviceArea": {
      "@type": "Country",
      "name": "Pakistan"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mountain Expeditions",
      "itemListElement": featuredExpeditions.map((expedition, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "name": expedition.name,
        "description": expedition.shortDescription,
        "url": `https://rupaladventures.com/expeditions/${expedition.id}`
      }))
    }
  };

  return (
    <>
      <SEO
        title="Rupal Adventures - Best Mountain Expeditions in Pakistan | Nanga Parbat & Laila Peak"
        description="Join Rupal Adventures for the best mountain expeditions in Pakistan. Expert guides, 15+ years experience. Conquer Nanga Parbat (8126m), Laila Peak (6096m) and more. Book your adventure today!"
        image={heroMountain}
        url="/"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
      
            {/* Featured Expeditions Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/20">
        {/* Logo Watermark */}
        <LogoWatermark opacity={0.02} size="lg" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Featured Expeditions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our most popular mountain expeditions, from challenging 8000m peaks 
            to spectacular trekking adventures in the heart of Pakistan's mountains.
          </p>
        </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredExpeditions.map((expedition) => (
              <ExpeditionShowcase 
                key={expedition.id} 
                expedition={expedition}
                variant="featured"
                showLogo={true}
                showActions={true}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/expeditions">
              <Button variant="adventure" size="lg" className="group">
                View All Expeditions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-mountain-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose Rupal Adventures?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              With years of experience in high-altitude expeditions, we provide safe, 
              professional, and unforgettable mountain adventures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-adventure-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">15+ Years Experience</h3>
              <p className="text-muted-foreground">
                Our expert guides have been leading expeditions in Pakistan's mountains for over a decade, 
                ensuring your safety and success on every adventure.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-adventure-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Expert Local Guides</h3>
              <p className="text-muted-foreground">
                Our team consists of certified mountain guides with intimate knowledge of local terrain, 
                weather patterns, and climbing conditions.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-adventure-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Safety First</h3>
              <p className="text-muted-foreground">
                We maintain the highest safety standards with modern equipment, comprehensive insurance, 
                and emergency evacuation protocols for all expeditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Get in touch with our expedition experts to plan your mountain adventure. 
            We're here to help you conquer your dreams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-6 w-6" />
              <span className="text-lg">+92-316-9457494</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-6 w-6" />
              <span className="text-lg">info@rupaladventures.com • rupaladventures@gmail.com</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              onClick={() => window.open('https://wa.me/923169457494', '_blank')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              onClick={() => window.location.href = 'mailto:info@rupaladventures.com'}
            >
              <Mail className="mr-2 h-5 w-5" />
              Send Email
            </Button>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-300 mb-2">CEO & Expedition Leader</p>
            <p className="text-xl font-semibold">Mubashir Hussain</p>
          </div>
        </div>
      </section>
      
        <WhatsAppFloat />
        <Footer />
      </div>
    </>
  );
};

export default Home;