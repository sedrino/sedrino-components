import { queryOptions } from "@tanstack/react-query";

import {
  $getActiveOrganization,
  $getActiveOrganizationMembers,
  $getSessionAndUser,
  $getUserRoleForOrganization,
  $getUsersOrganizations,
} from "@/server/functions/core/auth";

export const sessionQuery = queryOptions({
  queryKey: ["session"],
  queryFn: async () => {
    const result = await $getSessionAndUser();
    console.log("Session query result:", result);
    return result;
  },
});

export const organizationsOptions = () =>
  queryOptions({
    queryKey: ["organizations"],
    queryFn: () => $getUsersOrganizations(),
    initialData: [],
  });

export const activeOrganizationOptions = () =>
  queryOptions({
    queryKey: ["organizations", "active"],
    queryFn: () => $getActiveOrganization(),
    initialData: null,
  });

export const userRoleForOrganization = () =>
  queryOptions({
    queryKey: ["organization", "user", "role"],
    queryFn: () => $getUserRoleForOrganization(),
    initialData: null,
  });

export const activeOrganizationMembersOptions = () =>
  queryOptions({
    queryKey: ["organizations", "active", "members"],
    queryFn: async () => {
      const members = await $getActiveOrganizationMembers();
      return members;
    },

    initialData: null,
  });
