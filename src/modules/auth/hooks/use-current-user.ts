import { useQuery } from "@tanstack/react-query";

import { CookiesService } from "@/lib/cookies";
import { PROFILE_KEY } from "@/modules/auth/constants/auth-queries";
import { AuthService } from "@/modules/auth/services";

export const useCurrentUser = () => {
  const token = CookiesService.getAuthToken();

  const { data, error, isLoading, refetch } = useQuery({
    queryFn: async () => {
      if (!token) {
        throw new Error("No authentication token found");
      }

      const user = await AuthService.getCurrentUser();

      if (user) {
        CookiesService.setUserData(user);
      }

      return user;
    },

    queryKey: [PROFILE_KEY],

    retry: false,

    enabled: !!token,

    // staleTime: timeToMs(5, TIME_UNIT.MINUTES),
  });

  return {
    currentUser: data,
    error,
    isLoading,
    refetch,
    isAuthenticated: !!data && !!token,
  };
};
