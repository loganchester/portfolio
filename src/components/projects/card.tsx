import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import type { ProjectData } from "./types";
import ImageOverlap from "./image-overlap";
import { Badge } from "../ui/badge";
import { navigate } from "astro:transitions/client";

const ProjectCard = ({
  className,
  title,
  description,
  image,
  github,
  demo,
  desktopImageSrc,
  desktopImageAlt,
  mobileImageSrc,
  mobileImageAlt,
  requestAccess = false,
  stack,
  ...props
}: React.ComponentProps<typeof Card> & ProjectData) => {
  return (
    <Card className={cn("dark:text-purple-300", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {stack?.map((item, index) => (
            <Badge key={index} variant="outline" className="text-sm dark:text-purple-300">
              {item}
            </Badge>
          ))}
        </div>
        {desktopImageSrc && mobileImageSrc && (
          <ImageOverlap
            desktopSrc={desktopImageSrc}
            mobileSrc={mobileImageSrc}
            desktopAlt={desktopImageAlt}
            mobileAlt={mobileImageAlt}
          />
        )}
      </CardContent>
      <CardFooter className="flex gap-2 mt-8 p-4 border-t dark:border-gray-800">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer">
            <Button disabled={!github}>Github</Button>
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer">
            <Button variant="default" disabled={!demo}>Demo</Button>
          </a>
        )}
        {requestAccess && (
          <Button variant="outline" onClick={() => navigate("#contact")}>
            Request Sample
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
