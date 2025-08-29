import { Mountain } from "lucide-react";

interface LogoShowcaseProps {
  variant?: "default" | "hero" | "minimal" | "branded";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const LogoShowcase = ({ variant = "default", size = "md", className = "" }: LogoShowcaseProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-20 w-20"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl"
  };

  const variants = {
    default: {
      icon: "text-accent",
      text: "text-foreground",
      container: "flex items-center space-x-3"
    },
    hero: {
      icon: "text-white",
      text: "text-white",
      container: "flex items-center space-x-4"
    },
    minimal: {
      icon: "text-accent",
      text: "text-foreground",
      container: "flex items-center space-x-2"
    },
    branded: {
      icon: "text-accent",
      text: "text-primary",
      container: "flex items-center space-x-3"
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className={`${currentVariant.container} ${className}`}>
      <div className="relative">
        <Mountain className={`${sizeClasses[size]} ${currentVariant.icon}`} />
        {variant === "branded" && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
        )}
      </div>
      <div className="flex flex-col">
        <span className={`font-bold ${textSizes[size]} ${currentVariant.text}`}>
          Rupal
        </span>
        <span className={`font-light ${textSizes[size]} ${currentVariant.text} -mt-1`}>
          Adventures
        </span>
      </div>
    </div>
  );
};

export default LogoShowcase;
