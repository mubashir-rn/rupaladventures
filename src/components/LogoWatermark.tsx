import logoImage from "@/assets/logo.png";

interface LogoWatermarkProps {
  opacity?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const LogoWatermark = ({ opacity = 0.05, size = "lg", className = "" }: LogoWatermarkProps) => {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
    xl: "h-48 w-48"
  };

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}>
      <img
        src={logoImage}
        alt="Rupal Adventures Logo Watermark"
        className={`${sizeClasses[size]} object-contain opacity-${Math.round(opacity * 100)}`}
        style={{ opacity }}
      />
    </div>
  );
};

export default LogoWatermark;
