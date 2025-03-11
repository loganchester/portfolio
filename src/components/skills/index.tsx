import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { skillData } from "./data";
import { useIsMobile } from "@/hooks/use-mobile";

const Skills = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <div className={cn("", className)} {...props}>
          <div className="col-span-5 flex flex-wrap gap-2">
            {skillData
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((skill, index) => (
                <Badge
                  key={index}
                  className="text-sm dark:text-purple-300"
                  variant="outline"
                >
                  {skill.name}
                </Badge>
              ))}
          </div>
        </div>
      ) : (
        <div className={cn("grid grid-cols-6 gap-2", className)} {...props}>
          {/* obtain unique skill categories */}
          {Array.from(
            new Set(skillData.map((skill) => skill.category)).values()
          ).map((category, index) => (
            <>
              <div key={index} className="text-white text-sm font-semibold">
                {category}:
              </div>
              <div className="col-span-5 flex flex-wrap gap-2">
                {skillData
                  .filter((skill) => skill.category === category)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((skill, index) => (
                    <Badge
                      key={index}
                      className="text-sm dark:text-purple-300"
                      variant="outline"
                    >
                      {skill.name}
                    </Badge>
                  ))}
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Skills;
