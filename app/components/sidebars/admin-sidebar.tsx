import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { MainNavGroup } from "@/components/nav/nav-main";
import { NavUser } from "@/components/nav/nav-user";
import { navSections } from "@/components/sidebars/admin-sidebar-nav-items";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sessionQuery } from "@/query/core/options/auth";

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useQuery(sessionQuery);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Button
          asChild
          className="flex justify-start gap-2"
          variant="default"
          size="sm"
        >
          <Link to="/">
            <ChevronLeft className="size-4" />
            <span>Back to app</span>
          </Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {navSections().map((section) => (
          <MainNavGroup {...section} key={section.title} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        {user?.user && <NavUser user={user.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
