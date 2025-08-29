import logoImage from "@/assets/logo.png";

interface ExpeditionDetailLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ExpeditionDetailLogo = ({ size = "md", className = "" }: ExpeditionDetailLogoProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img
        src={logoImage}
        alt="Rupal Adventures Logo"
        className={`${sizeClasses[size]} object-contain`}
      />
      <span className="text-sm font-medium text-foreground">Rupal Adventures</span>
    </div>
  );
};

export default ExpeditionDetailLogo;
