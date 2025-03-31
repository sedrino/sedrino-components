import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/query/client";
import {
  $forgetPassword,
  $resetPassword,
  $setActiveOrganization,
  $signIn,
  $signUp,
} from "@/server/functions/core/auth";

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

export function useSignInMutation() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return $signIn({
        data: {
          email: email,
          password: password,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useSignUpMutation() {
  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
      callbackURL,
    }: {
      name: string;
      email: string;
      password: string;
      callbackURL: string;
    }) => {
      console.log({ name, email, password, callbackURL });
      return $signUp({
        data: {
          name: name,
          email: email,
          password: password,
          callbackURL: callbackURL,
        },
      });
    },
    onSuccess: () => {
      toast.success("Account Created, Please verify your Email!");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useForgetPasswordMutation() {
  return useMutation({
    mutationFn: ({
      email,
      redirectTo,
    }: {
      email: string;
      redirectTo: string;
    }) => {
      return $forgetPassword({
        data: {
          email: email,
          redirectTo: redirectTo,
        },
      });
    },
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: ({
      newPassword,
      token,
    }: {
      newPassword: string;
      token: string;
    }) => {
      return $resetPassword({
        data: {
          newPassword: newPassword,
          token: token,
        },
      });
    },
    onSuccess: () => {
      toast.success("Password has been reset successfully!");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
