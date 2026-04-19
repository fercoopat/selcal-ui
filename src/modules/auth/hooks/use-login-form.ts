import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { useAuth } from "@/modules/auth/contexts/auth-context";
import {
  loginSchema,
  type LoginPayload,
} from "@/modules/auth/schemas/login.schema";
import { AuthService } from "@/modules/auth/services";
import { DASHBOARD_PATHS } from "@/modules/dashboard/constants/dashboard-paths";

const defaultValues: LoginPayload = {
  email: "",
  password: "",
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const { error, isPending, mutate } = useMutation({
    mutationFn: (payload: LoginPayload) => AuthService.login(payload),

    onSuccess: async () => {
      await refetchUser();
      navigate(DASHBOARD_PATHS.BASE_PATH, { replace: true });
    },
  });

  const onSubmit = useCallback(
    (payload: LoginPayload) => {
      mutate(payload);
    },
    [mutate],
  );

  return {
    error,
    isLoading: isPending,
    onSubmit,
    ...form,
  };
};
