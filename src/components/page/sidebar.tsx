import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import React from "react";
import { navData } from "./data";
import { ModeToggle } from "../theme/toggle";
import { withProviders } from "@/utils/withProviders";

const NavSidebar = withProviders<React.ComponentProps<typeof Sidebar>>(({
  className,
  ...props
}) => {
  return (
    <Sidebar className={cn(className)} {...props}>
      <SidebarContent>
        {navData.map((item, i) => (
          <SidebarGroup key={i}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem key={i}>
                  <a className="flex items-center gap-1" href={item.url}>
                    <SidebarMenuButton>
                      {item.icon}
                      <span>{item.text}</span>
                    </SidebarMenuButton>
                  </a>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
});

export default NavSidebar;
