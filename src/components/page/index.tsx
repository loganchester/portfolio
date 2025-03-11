import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
//   import Projects from "../projects";
import NavSidebar from "./sidebar";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { withProviders } from "@/utils/withProviders";
import SocialLinks from "../social";

const Page = withProviders<HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }) => {
    return (
      <SidebarProvider defaultOpen={false}>
        <NavSidebar collapsible="icon" side="left" />
        <SidebarInset>
          <header className="h-16 bg-black z-10 sticky top-0 w-full flex justify-between items-center py-4 px-8">
            <SidebarTrigger className="text-white" />
            <SocialLinks />
          </header>
          <div className={cn("flex flex-col gap-8 p-8", className)} {...props}>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }
);

export default Page;
