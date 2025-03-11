import { navigate } from "astro:transitions/client";
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import AnimatedGrid from "../animations/grid";
import Skills from "../skills";

const Hero: React.FC = () => {
  return (
    <div className="relative flex items-center min-h-screen px-8 mx-auto">
      <div className="z-10 flex flex-col gap-2 relative mx-auto">
        <h1 className="text-gray-400 text-2xl font-semibold">
          Full-Stack Developer
        </h1>
        <h2 className="text-white text-4xl font-bold">Logan Chester</h2>
        <h4 className="text-white max-w-[560px]">
          With a degree from the{" "}
          <span className="font-bold text-purple">Univeristy of Toronto</span>{" "}
          specializing in{" "}
          <span className="font-bold text-purple">Software Engineering</span>{" "}
          and 5 years of professional experience as a Developer, I specialize in{" "}
          <span className="font-bold text-purple">React</span> and{" "}
          <span className="font-bold text-purple">Django</span> web development.
        </h4>
        <div className="flex items-center gap-2 py-2">
          <Button variant="secondary" onClick={() => navigate("#projects")}>
            View my work
          </Button>
          <a href="/files/resume.pdf" target="_blank" download>
            <Button>
              <Download />
              Resume
            </Button>
          </a>
        </div>
        <Skills className="mt-8" />
      </div>
      <AnimatedGrid />
    </div>
  );
};

export default Hero;
