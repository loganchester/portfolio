import { cn } from "@/lib/utils";
import React from "react";

interface ImageOverlapProps extends React.ComponentProps<"div"> {
  desktopSrc: string;
  mobileSrc: string;
  desktopAlt?: string;
  mobileAlt?: string;
}

const ImageOverlap: React.FC<ImageOverlapProps> = ({
  className,
  desktopSrc,
  mobileSrc,
  desktopAlt,
  mobileAlt,
}) => {
  return (
    <div className={cn("max-w-full", className)}>
      <div className="relative">
        <img className="rounded-md w-11/12 h-full" src={desktopSrc} alt={desktopAlt} />
        <img
          className="rounded-md border border-1 border-black absolute -bottom-10 right-0 w-1/4 h-full"
          src={mobileSrc}
          alt={mobileAlt}
        />
      </div>
    </div>
  );
};

export default ImageOverlap;
