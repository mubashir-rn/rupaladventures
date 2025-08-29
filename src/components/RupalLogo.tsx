import { Mountain } from "lucide-react";

interface RupalLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "accent";
  showText?: boolean;
  className?: string;
}

const RupalLogo = ({ 
  size = "md", 
  variant = "default", 
  showText = true,
  className = "" 
}: RupalLogoProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-2xl"
  };

  const variantClasses = {
    default: "text-foreground",
    white: "text-white",
    accent: "text-accent"
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Mountain className={`${sizeClasses[size]} ${variantClasses[variant]}`} />
      {showText && (
        <span className={`font-bold ${textSizes[size]} ${variantClasses[variant]}`}>
          Rupal Adventures
        </span>
      )}
    </div>
  );
};

export default RupalLogo;
