import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { expeditions } from "@/data/expeditions";
import ImageCarousel from "@/components/ImageCarousel";
import ExpeditionDetailLogo from "@/components/ExpeditionDetailLogo";
import Footer from "@/components/Footer";
import { 
  Mountain, 
  Clock, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Users,
  MessageCircle,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const ExpeditionDetail = () => {
  const { id } = useParams();
  const expedition = expeditions.find(exp => exp.id === id);

  if (!expedition) {
    return (
      <>
        <SEO
          title="Expedition Not Found | Rupal Adventures"
          description="The requested expedition could not be found. Browse our complete list of mountain expeditions in Pakistan."
          url="/expeditions"
        />
        <div className="min-h-screen bg-background">
          <Header />
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Expedition Not Found</h1>
              <Link to="/expeditions">
                <Button variant="default">Back to Expeditions</Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'moderate':
      case 'moderate to difficult':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'difficult':
      case 'very difficult':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'extreme':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Structured data for expedition detail
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": expedition.name,
    "description": expedition.shortDescription,
    "url": `https://rupaladventures.com/expeditions/${expedition.id}`,
    "image": expedition.image,
    "provider": {
      "@type": "TravelAgency",
      "name": "Rupal Adventures",
      "url": "https://rupaladventures.com"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD"
    },
    "itinerary": expedition.itinerary.map(item => ({
      "@type": "TouristTrip",
      "name": item.day,
      "description": item.description
    }))
  };

  return (
    <>
      <SEO
        title={`${expedition.name} | Rupal Adventures - Mountain Expedition in Pakistan`}
        description={`Join ${expedition.name} with Rupal Adventures. ${expedition.shortDescription} Duration: ${expedition.duration}. Difficulty: ${expedition.difficulty}. Book your mountain adventure today!`}
        image={expedition.image}
        url={`/expeditions/${expedition.id}`}
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
        <Header />
      
      {/* Hero Section with Image */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${expedition.image || '/src/assets/hero-mountain.jpg'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <Link to="/expeditions" className="inline-flex items-center text-accent hover:text-accent-glow mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Expeditions
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <ExpeditionDetailLogo size="sm" />
                <Badge variant="secondary" className="text-sm">
                  {expedition.altitude}
                </Badge>
                <Badge className={getDifficultyColor(expedition.difficulty)}>
                  {expedition.difficulty}
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {expedition.name}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                {expedition.shortDescription}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{expedition.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Best Time</p>
                    <p className="font-semibold">{expedition.bestTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Max Altitude</p>
                    <p className="font-semibold">{expedition.maxAltitude || expedition.altitude}</p>
                  </div>
                </div>
                
                {expedition.dailyWalking && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Daily Walk</p>
                      <p className="font-semibold text-xs">{expedition.dailyWalking}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="p-6 bg-card border border-border">
                <h3 className="text-xl font-bold mb-4">Book This Expedition</h3>
                <p className="text-muted-foreground mb-6">
                  Contact our expedition experts to plan your adventure and get detailed pricing information.
                </p>
                
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full mb-4"
                  onClick={() => window.open('https://wa.me/923169457494', '_blank')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Book via WhatsApp
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => window.location.href = 'mailto:info@rupaladventures.com'}
                >
                  Send Email Inquiry
                </Button>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Expedition Leader</p>
                  <p className="font-semibold text-foreground">Mubashir Hussain</p>
                  <p className="text-sm text-muted-foreground">CEO, Rupal Adventures</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {expedition.images && expedition.images.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Expedition Gallery</h2>
            <div className="max-w-4xl mx-auto">
              <ImageCarousel
                images={expedition.images}
                alt={expedition.name}
                autoPlay={true}
                interval={4000}
                showControls={true}
                showIndicators={true}
                className="h-96"
              />
            </div>
          </div>
        </section>
      )}

      {/* Details & Itinerary */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Expedition Details */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-foreground mb-6">Expedition Details</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {expedition.details.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
              
              {(expedition.grade || expedition.dailyWalking) && (
                <div className="mt-8 p-6 bg-secondary/20 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {expedition.grade && (
                      <div>
                        <p className="text-sm text-muted-foreground">Grade</p>
                        <p className="font-semibold">{expedition.grade}</p>
                      </div>
                    )}
                    {expedition.dailyWalking && (
                      <div>
                        <p className="text-sm text-muted-foreground">Daily Walking</p>
                        <p className="font-semibold">{expedition.dailyWalking}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Itinerary */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-foreground mb-6">Itinerary</h2>
              <div className="space-y-4">
                {expedition.itinerary.map((day, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {day.day}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="p-6 mt-8 bg-accent/5 border-accent/20">
                <h3 className="text-lg font-semibold mb-3 text-foreground">Need More Information?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our expedition experts are ready to answer all your questions and help plan your adventure.
                </p>
                <Button 
                  variant="adventure" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('https://wa.me/923169457494', '_blank')}
                >
                  Contact Us Now
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <BookingForm expeditionName={expedition.name} />
        </div>
      </section>
      
      <Footer />
      </div>
    </>
  );
};

export default ExpeditionDetail;