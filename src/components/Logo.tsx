import logoImage from "@/assets/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
}

const Logo = ({ size = "md", className = "", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-20 w-20"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-2xl"
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img
        src={logoImage}
        alt="Rupal Adventures Logo"
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizes[size]} text-foreground`}>
            Rupal
          </span>
          <span className={`font-light ${textSizes[size]} text-foreground -mt-1`}>
            Adventures
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
