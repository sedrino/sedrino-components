import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/query/client";
import {
  $banUser,
  $impersonateUser,
  $removeUser,
  $revokeInvitation,
  $revokeUserSessions,
  $setUserRole,
  $stopImpersonatingUser,
  $unbanUser,
} from "@/server/functions/core/admin";
import { $setActiveOrganization } from "@/server/functions/core/auth";

export function useSetActiveOrganizationMutation() {
  return useMutation({
    mutationFn: (organizationId: string) => {
      return $setActiveOrganization({
        data: {
          organizationId: organizationId,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });
}

export function useSetUserRoleMutation() {
  return useMutation({
    mutationFn: ({
      userId,
      role,
    }: {
      userId: string;
      role: "user" | "admin";
    }) => {
      return $setUserRole({
        data: {
          userId: userId,
          role: role,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User role updated successfully.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update user role. Please try again.");
    },
  });
}

export function useBanUserMutation() {
  return useMutation({
    mutationFn: ({
      userId,
      banReason,
    }: {
      userId: string;
      banReason?: string;
    }) => {
      return $banUser({
        data: {
          userId: userId,
          banReason: banReason,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User banned successfully.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to ban user. Please try again.");
    },
  });
}

export function useUnbanUserMutation() {
  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      return $unbanUser({
        data: {
          userId: userId,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User unbanned successfully.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to unban user. Please try again.");
    },
  });
}

export function useRemoveUserMutation() {
  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      return $removeUser({
        data: {
          userId: userId,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User removed successfully.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to remove user. Please try again.");
    },
  });
}
export function useRevokeUserSessionsMutation() {
  return useMutation({
    mutationFn: ({ sessionToken }: { sessionToken: string }) => {
      return $revokeUserSessions({
        data: {
          sessionToken: sessionToken,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
      toast.success("User sessions revoked successfully.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to revoke user sessions. Please try again.");
    },
  });
}

export function useImpersonateUserMutation() {
  return useMutation({
    mutationFn: ({ userId }: { userId: string }) => {
      const session = $impersonateUser({
        data: {
          userId: userId,
        },
      });
      return session;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
      toast.success("User impersonated successfully.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to impersonate user. Please try again.");
    },
  });
}

export function useStopImpersonatingUserMutation() {
  return useMutation({
    mutationFn: () => {
      return $stopImpersonatingUser();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
      toast.success("Stopped impersonating user successfully.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to stop impersonating user. Please try again.");
    },
  });
}

export function useRevokeInvitationMutation() {
  return useMutation({
    mutationFn: ({ invitationId }: { invitationId: string }) => {
      return $revokeInvitation({
        data: {
          invitationId: invitationId,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizations", "active", "members"],
      });
      toast.success("Invitation revoked successfully.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to revoke invitation. Please try again.");
    },
  });
}
