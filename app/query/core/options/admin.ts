import { queryOptions } from "@tanstack/react-query";

import {
  $listAllUsers,
  $listUserSessions,
} from "@/server/functions/core/admin";
import {
  $getActiveOrganization,
  $getUserRoleForOrganization,
  $getUsersOrganizations,
} from "@/server/functions/core/auth";

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

export const listAllUsersOptions = ({
  searchValue = "",
  limit = 10,
  offset = 0,
  sortBy = "createdAt",
  sortDirection = "desc",
  filterField = "role",
  filterOperator = "eq",
  filterValue = "admin",
} = {}) =>
  queryOptions({
    queryKey: [
      "admin",
      "users",
      {
        searchValue,
        limit,
        offset,
        sortBy,
        sortDirection,
        filterField,
        filterOperator,
        filterValue,
      },
    ],
    queryFn: () =>
      $listAllUsers({
        data: {
          searchValue,
          limit,
          offset,
          sortBy,
          sortDirection,
          filterField,
          filterOperator,
          filterValue,
        },
      }),
    initialData: { users: [] },
  });

export const listUserSessionsOptions = ({
  userId,
  searchValue = "",
  limit = 10,
  offset = 0,
  sortBy = "createdAt",
  sortDirection = "desc",
}: {
  userId: string;
  searchValue?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortDirection?: string;
}) =>
  queryOptions({
    queryKey: [
      "admin",
      "user-sessions",
      userId,
      {
        searchValue,
        limit,
        offset,
        sortBy,
        sortDirection,
      },
    ],
    queryFn: () =>
      $listUserSessions({
        data: {
          userId,
          searchValue,
          limit,
          sortBy: sortBy as "createdAt" | "expiresAt" | "ipAddress" | undefined,
          sortDirection: sortDirection as "desc" | "asc" | undefined,
        },
      }),
    initialData: { sessions: [] },
  });
