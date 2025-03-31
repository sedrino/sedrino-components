import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Link,
  useParams,
  useRouteContext,
  useRouter,
} from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { MainNavGroup } from "@/components/nav/nav-main";
import { NavUser } from "@/components/nav/nav-user";
import { navSections } from "@/components/sidebars/settings-sidebar-nav-items";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sessionQuery } from "@/query/core/options/auth";

export function SetingsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useQuery(sessionQuery);
  const { organizationId } = useParams({ strict: false });
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Button
          asChild
          className="flex justify-start gap-2"
          variant="default"
          size="sm"
        >
          <Link to="/" className="bg-secondary hover:bg-secondary">
            <ChevronLeft className="size-4 text-primary" />
            <span className="text-primary">Back to app</span>
          </Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {navSections(organizationId!).map((section) => (
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
