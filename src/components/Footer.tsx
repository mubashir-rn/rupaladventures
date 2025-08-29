import { Phone, Mail, MapPin, Mountain } from "lucide-react";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <Logo size="lg" />
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Conquer the mighty peaks of Pakistan with Rupal Adventures. From Nanga Parbat to Laila Peak, 
              embark on legendary expeditions with expert guides and unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/923169457494" className="text-accent hover:text-accent-glow transition-colors">
                <Phone className="h-5 w-5" />
              </a>
              <a href="mailto:info@rupaladventures.com" className="text-accent hover:text-accent-glow transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-accent hover:text-accent-glow transition-colors">
                <MapPin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/expeditions" className="text-muted-foreground hover:text-foreground transition-colors">
                  Expeditions
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">+92 316 945 7494</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">info@rupaladventures.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mountain className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Rupal Adventures. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Mountain className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">
              Conquering peaks, creating memories
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
