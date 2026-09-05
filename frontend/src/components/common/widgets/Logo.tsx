import logo from "../../../assets/logo.png";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 112, className = "" }: LogoProps) {
  return (
      <img
        src={ logo }
        alt="Barangay 176-E Logo"
        style={{ width: size, height: size }}
        className={`rounded-full object-cover shadow-lg ring-4 ring-white/90 ${className}`}
      />
  );
}
