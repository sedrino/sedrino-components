import * as React from "react";
import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronsUpDown, Plus, Settings, UserPlus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function TeamSwitcher({
  organizations,
  activeOrg,
  onChangeOrganization,
  role,
  appAdmin,
  userName,
}: {
  organizations: {
    id: string;
    name: string;
  }[];
  activeOrg?: {
    id: string;
    name: string;
    logo: React.ElementType;
  };
  onChangeOrganization: (org: { id: string; name: string }) => void;
  role: string | null;
  appAdmin: boolean;
  userName?: string;
}) {
  const { isMobile } = useSidebar();

  const isOwner = useMemo(() => {
    return role === "owner";
  }, [role]);

  const OrgSwitcherSkeleton = () => (
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
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {activeOrg || userName ? (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {activeOrg?.name?.[0]?.toUpperCase() ||
                    userName?.charAt(0).toUpperCase()}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeOrg?.name || userName}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            ) : (
              <OrgSwitcherSkeleton />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {appAdmin && (
              <DropdownMenuItem className="gap-2 p-2" asChild>
                <Link to="/admin/users">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Settings className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    App Settings
                  </div>
                </Link>
              </DropdownMenuItem>
            )}

            {isOwner && activeOrg && (
              <>
                <DropdownMenuItem className="gap-2 p-2" asChild>
                  <Link
                    to="/$organizationId/invite"
                    params={{ organizationId: activeOrg.id }}
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      <Settings className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">
                      Settings
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2" asChild>
                  <Link
                    to="/$organizationId/invite"
                    params={{ organizationId: activeOrg.id }}
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      <UserPlus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">
                      Invite & manage members
                    </div>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            {organizations.map((org, index) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => onChangeOrganization(org)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {org.name[0].toUpperCase()}
                </div>
                {org.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              onClick={() =>
                onChangeOrganization({
                  name: null,
                  id: null,
                })
              }
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                {userName?.charAt(0).toUpperCase()}
              </div>
              {userName}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" asChild>
              <Link to="/create-org">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add organization
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
