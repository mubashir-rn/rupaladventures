import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProfileImg from "../assets/CEORupalAdventures.png";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  User,
  Award,
  Mountain
} from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to embark on your mountain adventure? Get in touch with our expedition experts
            and let us help you plan the perfect expedition.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Get In Touch</h2>

              <div className="space-y-6">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-adventure-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">WhatsApp</h3>
                      <p className="text-muted-foreground mb-3">
                        Fastest way to reach us. Available 24/7 for expedition inquiries.
                      </p>
                      <Button
                        variant="hero"
                        size="sm"
                        onClick={() => window.open('https://wa.me/923169457494', '_blank')}
                      >
                        +92-316-9457494
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-adventure-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                      <p className="text-muted-foreground mb-3">
                        Send us your detailed expedition requirements and questions.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = 'mailto:info@rupaladventures.com'}
                      >
                        info@rupaladventures.com
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-adventure-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
                      <p className="text-muted-foreground">
                        Based in Pakistan, we operate expeditions throughout the northern mountain regions
                        including Gilgit-Baltistan and the Karakoram and Himalaya ranges.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-adventure-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Response Time</h3>
                      <p className="text-muted-foreground">
                        We typically respond to WhatsApp messages within 2 hours and emails within 24 hours.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* CEO Information & Company Details */}
            <div>
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-accent/20">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                    <img
                      src={ProfileImg}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Mubashir Hussain</h2>
                  <p className="text-accent font-semibold mb-4">CEO & Expedition Leader</p>
                  <p className="text-muted-foreground leading-relaxed">
                    With over 15 years of experience leading expeditions in Pakistan's most challenging mountains,
                    Mubashir is dedicated to providing safe, professional, and unforgettable mountain adventures.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-accent" />
                    <span className="text-sm text-muted-foreground">15+ Years Mountain Experience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mountain className="h-5 w-5 text-accent" />
                    <span className="text-sm text-muted-foreground">Expert in 8000m+ Expeditions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-accent" />
                    <span className="text-sm text-muted-foreground">Certified Mountain Guide</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold mb-4">Quick Contact</h3>
                  <div className="flex flex-col space-y-3">
                    <Button
                      variant="hero"
                      className="w-full"
                      onClick={() => window.open('https://wa.me/923169457494', '_blank')}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message on WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.location.href = 'mailto:info@rupaladventures.com'}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Why Choose Rupal Adventures?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Experienced local guides with intimate mountain knowledge</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Comprehensive safety protocols and emergency planning</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>Custom expeditions tailored to your experience level</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>All necessary permits and logistics handled professionally</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Planning?
          </h2>
          <p className="text-lg mb-6 text-gray-200">
            Don't wait – the mountains are calling! Contact us today to begin planning your next great adventure.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 text-white border-white/30 hover:bg-white/20"
            onClick={() => window.open('https://wa.me/923169457494', '_blank')}
          >
            Start Your Adventure Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;