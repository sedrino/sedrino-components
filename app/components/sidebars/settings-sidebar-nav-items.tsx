import { linkOptions } from "@tanstack/react-router";
import { Settings, UserPlus, Users } from "lucide-react";

export const navSections = (organizationId: string) => {
  return [
    {
      title: "Organization",
      icon: Settings,
      items: [
        {
          title: "General",
          icon: Settings,
          link: linkOptions({
            to: "/$organizationId/settings",
            params: { organizationId },
          }),
          items: [],
        },
      ],
    },
    {
      title: "Invite & Manage Members",
      icon: Settings,
      items: [
        {
          title: "Invite Members",
          icon: UserPlus,
          link: linkOptions({
            to: "/$organizationId/invite",
            params: { organizationId },
          }),
          items: [],
        },
        {
          title: "Manage Members",
          icon: Users,
          link: linkOptions({
            to: "/$organizationId/members",
            params: { organizationId },
          }),
          items: [],
        },
      ],
    },
  ];
};
