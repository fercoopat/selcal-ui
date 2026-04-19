import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { CookiesService } from "@/lib/cookies";
import { AuthService } from "@/modules/auth/services";
import { PROFILE_KEY } from "@/modules/auth/constants/auth.queries";

type Params = {
  onSuccess?: () => void;
};

export const useLogout = ({ onSuccess }: Params = {}) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { error, isPending, mutate } = useMutation({
    mutationFn: () => AuthService.logout(),

    onSuccess: async () => {
      CookiesService.removeAuthToken();
      CookiesService.removeUserData();
      CookiesService.clearAll();

      await queryClient.invalidateQueries({ queryKey: [PROFILE_KEY] });

      toast.success(t("auth:logout.successMessage"));

      onSuccess?.();
    },
  });

  return {
    error,
    isLoading: isPending,
    logout: mutate,
  };
};
