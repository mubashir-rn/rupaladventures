import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import LogoImage from "@/components/LogoImage";
import type { Expedition } from "@/data/expeditions";

interface ExpeditionShowcaseProps {
  expedition: Expedition;
  variant?: "default" | "featured" | "minimal";
  showLogo?: boolean;
  showActions?: boolean;
  className?: string;
}

const ExpeditionShowcase = ({
  expedition,
  variant = "default",
  showLogo = true,
  showActions = true,
  className = ""
}: ExpeditionShowcaseProps) => {
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

  const variants = {
    default: {
      card: "card-expedition overflow-hidden h-full flex flex-col",
      image: "h-48",
      content: "p-6",
      title: "text-xl font-bold text-foreground mb-2 leading-tight",
      description: "text-muted-foreground text-sm line-clamp-3"
    },
    featured: {
      card: "card-expedition overflow-hidden h-full flex flex-col border-2 border-accent/20",
      image: "h-56",
      content: "p-6",
      title: "text-2xl font-bold text-foreground mb-3 leading-tight",
      description: "text-muted-foreground text-base line-clamp-3"
    },
    minimal: {
      card: "overflow-hidden h-full flex flex-col border border-border rounded-lg",
      image: "h-32",
      content: "p-4",
      title: "text-lg font-semibold text-foreground mb-2 leading-tight",
      description: "text-muted-foreground text-sm line-clamp-2"
    }
  };

  const currentVariant = variants[variant];

  return (
    <Card className={`${currentVariant.card} ${className}`}>
      {/* Expedition Image */}
      <div className={`relative ${currentVariant.image} overflow-hidden`}>
        <img
          src={expedition.image || '/src/assets/hero-mountain.jpg'}
          alt={expedition.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        
        {/* Rupal Adventures Logo Overlay */}
        {showLogo && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <LogoImage size="sm" />
          </div>
        )}
        
        {/* Difficulty Badge Overlay */}
        <div className="absolute top-3 left-3">
          <Badge className={getDifficultyColor(expedition.difficulty)}>
            {expedition.difficulty}
          </Badge>
        </div>

        {/* Altitude Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="text-xs">
            {expedition.altitude}
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className={`${currentVariant.content} flex-grow`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <LogoImage size="sm" />
            <Badge variant="secondary" className="text-xs">
              {expedition.altitude}
            </Badge>
          </div>
        </div>
        
        <h3 className={currentVariant.title}>
          {expedition.name}
        </h3>
        
        <p className={currentVariant.description}>
          {expedition.shortDescription}
        </p>
        
        {/* Expedition Details */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">{expedition.duration}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">{expedition.bestTime}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">Max: {expedition.maxAltitude || expedition.altitude}</span>
          </div>
          
          {expedition.dailyWalking && (
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">{expedition.dailyWalking}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Actions */}
      {showActions && (
        <div className={`${currentVariant.content} pt-0 mt-auto`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to={`/expeditions/${expedition.id}`} className="flex-1">
              <Button variant="default" className="w-full">
                View Details
              </Button>
            </Link>
            
            <Button 
              variant="hero" 
              size="default"
              onClick={() => window.open('https://wa.me/923169457494', '_blank')}
              className="flex-1"
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ExpeditionShowcase;
