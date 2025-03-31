import { linkOptions, LinkOptions } from "@tanstack/react-router";
import { LucideIcon, SquareTerminal } from "lucide-react";

import { NavSection } from "@/components/nav/nav-main";

export const navSections: NavSection[] = [
  {
    title: "Playground",
    items: [
      {
        title: "Test",
        icon: SquareTerminal,
        link: linkOptions({ to: "/test" }),
        items: [
          {
            title: "Test 2",
            link: linkOptions({ to: "/dev/pages" }),
          },
        ],
      },
    ],
  },
];
