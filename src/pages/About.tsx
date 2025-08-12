import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Mountain, 
  Award, 
  Users, 
  Shield, 
  Target,
  Heart,
  CheckCircle,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            About Rupal Adventures
          </h1>
          <p className="text-xl text-muted-foreground">
            Your trusted partner for epic mountain expeditions in the heart of Pakistan's magnificent peaks.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Rupal Adventures, we believe that the mountains of Pakistan offer some of the world's 
                most spectacular and challenging expeditions. Our mission is to provide safe, professional, 
                and transformative mountain experiences that connect adventurers with the raw beauty and 
                power of these legendary peaks.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Founded with a passion for mountaineering and deep respect for Pakistan's mountain heritage, 
                we specialize in expeditions to some of the world's most coveted peaks, including the 
                legendary Nanga Parbat - the "Killer Mountain" - and the stunning Laila Peak.
              </p>
              <Link to="/contact">
                <Button variant="adventure" size="lg">
                  Start Your Journey
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center">
                <Mountain className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">15+</h3>
                <p className="text-muted-foreground">Years Experience</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
                <p className="text-muted-foreground">Expeditions Led</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">100%</h3>
                <p className="text-muted-foreground">Safety Record</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Target className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">8,126m</h3>
                <p className="text-muted-foreground">Highest Peak</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Meet Our Leader</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Led by one of Pakistan's most experienced expedition guides, our team brings 
              unmatched expertise to every mountain adventure.
            </p>
          </div>
          
          <Card className="p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="w-32 h-32 bg-adventure-gradient rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Mubashir Hussain</h3>
                <p className="text-accent font-semibold mb-4">CEO & Expedition Leader</p>
                
                <div className="flex flex-col space-y-2 text-sm">
                  <div className="flex items-center space-x-2 justify-center md:justify-start">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>15+ Years Mountain Experience</span>
                  </div>
                  <div className="flex items-center space-x-2 justify-center md:justify-start">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Certified Mountain Guide</span>
                  </div>
                  <div className="flex items-center space-x-2 justify-center md:justify-start">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>8000m+ Peak Specialist</span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Mubashir Hussain has dedicated his life to the mountains of Pakistan. With over 15 years 
                  of experience leading expeditions to some of the world's most challenging peaks, he combines 
                  deep local knowledge with international safety standards to create unforgettable adventures.
                </p>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  His expertise spans from technical 8000-meter climbs to scenic trekking routes, and he's 
                  personally guided hundreds of climbers from around the world to achieve their mountain dreams. 
                  Mubashir's commitment to safety and his passion for sharing Pakistan's mountain heritage 
                  make him an exceptional expedition leader.
                </p>
                
                <Button 
                  variant="hero"
                  onClick={() => window.open('https://wa.me/923169457494', '_blank')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Mubashir
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every expedition we lead is guided by these core principles that ensure 
              your safety, success, and satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Shield className="h-16 w-16 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Safety First</h3>
              <p className="text-muted-foreground leading-relaxed">
                We maintain the highest safety standards with modern equipment, comprehensive 
                risk assessment, and emergency protocols. Your safety is our top priority.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Heart className="h-16 w-16 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Passion for Mountains</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our deep love for Pakistan's mountains drives everything we do. We share this 
                passion with every adventurer who joins our expeditions.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Award className="h-16 w-16 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We strive for excellence in every aspect of our service, from expedition 
                planning to execution, ensuring unforgettable experiences.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Pakistan Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-hero-gradient text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Pakistan's Mountains?</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Pakistan is home to some of the world's most spectacular peaks, including five of 
              the fourteen 8000-meter summits and countless incredible trekking destinations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Legendary Peaks</h3>
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-start space-x-3">
                  <Mountain className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span><strong>Nanga Parbat (8,126m)</strong> - The "Killer Mountain" and ninth highest peak in the world</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Mountain className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span><strong>K2 (8,611m)</strong> - The second highest and most challenging peak</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Mountain className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span><strong>Broad Peak (8,051m)</strong> - A stunning pyramid-shaped giant</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Mountain className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span><strong>Laila Peak (6,096m)</strong> - The dramatic spear-like beauty of Karakoram</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Unique Advantages</h3>
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span>Less crowded than Himalayan peaks in Nepal</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span>Rich cultural heritage and local hospitality</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span>Spectacular glacial landscapes and pristine wilderness</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span>Expert local guides with intimate mountain knowledge</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Explore Pakistan's Mountains?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join us for an unforgettable mountain adventure. Browse our expeditions or contact us 
            to create a custom expedition tailored to your dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/expeditions">
              <Button variant="adventure" size="lg">
                View Expeditions
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;