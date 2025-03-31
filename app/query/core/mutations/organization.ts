import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/query/client";
import {
  $changeMemberRole,
  $createOrganization,
  $organizationInviteMember,
  $removeMember,
  $revokeInvitation,
} from "@/server/functions/core/organization";

export function useCreateOrganizationMutation() {
  return useMutation({
    mutationFn: (data: { name: string; slug: string; logo?: string }) =>
      $createOrganization({ data }),
  });
}
export function useOrganizationInviteMemberMutation() {
  return useMutation({
    mutationFn: (data: { email: string; role: "member" | "owner" | "admin" }) =>
      $organizationInviteMember({ data }),
    onSuccess: () => {
      toast.success("Member invited successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to invite member. Please try again.");
    },
  });
}

export function useChangeMemberRoleMutation() {
  return useMutation({
    mutationFn: (data: {
      memberId: string;
      newRole: "member" | "owner" | "admin";
    }) => $changeMemberRole({ data }),
    onSuccess: () => {
      toast.success("Member role changed successfully!");
      queryClient.invalidateQueries({
        queryKey: ["organizations", "active", "members"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to change member role. Please try again.");
    },
  });
}

export function useRemoveMemberMutation() {
  return useMutation({
    mutationFn: (data: { memberId: string }) => $removeMember({ data }),
    onSuccess: () => {
      toast.success("Member removed successfully!");
      queryClient.invalidateQueries({
        queryKey: ["organizations", "active", "members"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to remove member. Please try again.");
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
