import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-mountain.jpg";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-6">
          <Logo size="lg" />
        </div>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Conquer the mighty peaks of Pakistan. From Nanga Parbat to Laila Peak, 
          embark on legendary expeditions with expert guides.
         This company particularly lies in Culture/Sightseeing Tours, Trekking & Expeditions
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/expeditions">
            <Button variant="hero" size="lg" className="group">
              Explore Expeditions
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 text-white border-white/30 hover:bg-white/20"
            onClick={() => window.open('https://wa.me/923169457494', '_blank')}
          >
            Contact via WhatsApp
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-accent">8,126m</h3>
            <p className="text-gray-300">Nanga Parbat Peak</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-accent">5+</h3>
            <p className="text-gray-300">Epic Expeditions</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-accent">15+</h3>
            <p className="text-gray-300">Years Experience</p>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;