import { linkOptions } from "@tanstack/react-router";
import { User2 } from "lucide-react";

export const navSections = () => {
  return [
    {
      title: "Users",
      icon: User2,
      items: [
        {
          title: "All Users",
          icon: User2,
          link: linkOptions({
            to: "/admin/users",
          }),
          items: [],
        },
      ],
    },
  ];
};
