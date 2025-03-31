import * as React from "react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, LinkOptions, useNavigate } from "@tanstack/react-router";
import { ChevronsUpDown, Command, LucideIcon } from "lucide-react";

import { MainNavGroup } from "@/components/nav/nav-main";
import { NavUser } from "@/components/nav/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useStopImpersonatingUserMutation } from "@/query/core/mutations/admin";
import { useSetActiveOrganizationMutation } from "@/query/core/mutations/auth";
import {
  activeOrganizationOptions,
  organizationsOptions,
  sessionQuery,
  userRoleForOrganization,
} from "@/query/core/options/auth";

import { TeamSwitcher } from "../nav/team-switcher";
import { Button } from "../ui/button";
import { navSections } from "./default-sidebar-nav-items";

export function DefaultSidebar({
  navSections,
  ...props
}: React.ComponentProps<typeof Sidebar> & { navSections: NavSection[] }) {
  const { data: organizations } = useQuery(organizationsOptions());
  const { data: activeOrganization } = useQuery(activeOrganizationOptions());
  const { data: user } = useQuery(sessionQuery);
  const { data: role } = useQuery(userRoleForOrganization());

  const setActiveOrgMutation = useSetActiveOrganizationMutation();
  const stopImpersonatingUserMutation = useStopImpersonatingUserMutation();
  const isAppAdmin = useMemo(() => user?.user?.role === "admin", [user]);
  const isImpersonation = useMemo(() => user?.session?.impersonatedBy, [user]);
  const navigation = useNavigate();
  const NavUserSkeleton = () => (
    <SidebarMenuButton size="lg">
      <div className="flex aspect-square size-8 items-center justify-center bg-transparent">
        <Skeleton className="h-8 w-8" />
      </div>
      <div className="grid flex-1 gap-1.5">
        <Skeleton className="h-2 w-[120px]" />
        <Skeleton className="h-2 w-[80px]" />
      </div>
      <ChevronsUpDown className="ml-auto opacity-0" />
    </SidebarMenuButton>
  );
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          organizations={organizations}
          activeOrg={activeOrganization}
          onChangeOrganization={(org) => setActiveOrgMutation.mutate(org.id)}
          role={role}
          appAdmin={isAppAdmin}
          userName={user?.user?.name}
        />
      </SidebarHeader>
      <SidebarContent>
        {navSections.map((section) => (
          <MainNavGroup {...section} key={section.title} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        {isImpersonation && (
          <div className="m-2 rounded-md border-2 border-red-500 bg-red-100 p-2">
            <span className="text-sm text-red-800">
              Impersonation Session Active
            </span>
            <Button
              className="text-red-800 hover:bg-red-600 hover:text-white"
              variant="link"
              size="sm"
              onClick={async () => {
                await stopImpersonatingUserMutation.mutateAsync();
                navigation({ to: "/admin/users" });
              }}
            >
              End Impersonation
            </Button>
          </div>
        )}
        {user?.user ? <NavUser user={user.user} /> : <NavUserSkeleton />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
