import logoImage from "@/assets/logo.png";

interface LogoImageProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const LogoImage = ({ size = "md", className = "" }: LogoImageProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  return (
    <img
      src={logoImage}
      alt="Rupal Adventures Logo"
      className={`${sizeClasses[size]} object-contain ${className}`}
    />
  );
};

export default LogoImage;
