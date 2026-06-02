import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import { mainNavigation, systemNavigation } from "../../config/navigation";
import SidebarFooterComponent from "./SidebarFooterComponent";
import SidebarHeaderComponent from "./SidebarHeaderComponent";

// helper so you don't repeat JSX
function NavItems({ items }: { items: typeof mainNavigation }) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                [
                  "group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13.5px] transition-all duration-100",
                  isActive
                    ? "bg-primary/12 text-primary font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1/2 before:w-0.75 before:rounded-r-full before:bg-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                ]
                  .filter(Boolean)
                  .join(" ")
              }>
              <item.icon className="h-3.75 w-3.75 shrink-0" />
              <span>{item.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export default function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      {/* HEADER */}
      <SidebarHeader className=" border-sidebar-border px-4 py-4.5">
        <SidebarHeaderComponent />
      </SidebarHeader>

      {/* NAVIGATION */}
      <SidebarContent className="px-2 pt-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-[0.8px] text-muted-foreground/60 px-2 mb-1">
            Main
          </SidebarGroupLabel>
          <NavItems items={mainNavigation} />
        </SidebarGroup>

        <div className="mx-2 my-2.5 h-px bg-sidebar-border" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-[0.8px] text-muted-foreground/60 px-2 mb-1">
            System
          </SidebarGroupLabel>
          {/* Settings nav item — add to your navigation config or hardcode here */}
          <NavItems items={systemNavigation} />
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarFooterComponent />
      </SidebarFooter>
    </Sidebar>
  );
}
