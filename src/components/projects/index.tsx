import React from "react";
import { projectsData } from "./data";
import ProjectCard from "./card";
import { cn } from "@/lib/utils";
// import AnimatedGrid from "../animations/grid";

const Projects = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("grid grid-cols-1 lg:grid-cols-2 gap-4", className)}
      {...props}
    >
      {projectsData.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};

export default Projects;
