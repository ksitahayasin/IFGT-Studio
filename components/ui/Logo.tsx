import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  width?: number;
  height?: number;
}

export function Logo({ className = "", size = "md", width, height }: LogoProps) {
  const sizes = {
    sm: { width: 48, height: 24 },
    md: { width: 64, height: 32 },
    lg: { width: 96, height: 48 },
    xl: { width: 144, height: 72 },
    xxl: { width: 192, height: 96 },
    xxxl: { width: 288, height: 144 },
  };

  const finalWidth = width ?? sizes[size].width;
  const finalHeight = height ?? sizes[size].height;

  return (
    <Image
      src="/logo.svg"
      alt="IFGT Studio Logo"
      width={finalWidth}
      height={finalHeight}
      className={className}
      priority
    />
  );
}
