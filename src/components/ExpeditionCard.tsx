import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mountain, Clock, TrendingUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import type { Expedition } from "@/data/expeditions";

interface ExpeditionCardProps {
  expedition: Expedition;
}

const ExpeditionCard = ({ expedition }: ExpeditionCardProps) => {
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

  return (
    <Card className="card-expedition overflow-hidden h-full flex flex-col">
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Mountain className="h-6 w-6 text-accent" />
            <Badge variant="secondary" className="text-xs">
              {expedition.altitude}
            </Badge>
          </div>
          <Badge className={getDifficultyColor(expedition.difficulty)}>
            {expedition.difficulty}
          </Badge>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
          {expedition.name}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3">
          {expedition.shortDescription}
        </p>
      </div>
      
      <div className="p-6 flex-grow">
        <div className="grid grid-cols-2 gap-4 mb-6">
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
              <span className="text-muted-foreground">{expedition.dailyWalking}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 pt-0 mt-auto">
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
    </Card>
  );
};

export default ExpeditionCard;