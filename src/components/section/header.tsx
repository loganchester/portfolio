import React from "react";

import { cn } from "@/lib/utils";

const SectionHeader: React.FC<
  { text: string } & React.ComponentProps<"div">
> = ({ className, text, ...props }) => {
  return (
    <div className={cn("mb-4", className)}>
      <h2 className="text-white text-2xl font-bold underline">{text}</h2>
    </div>
  );
};

export default SectionHeader;
