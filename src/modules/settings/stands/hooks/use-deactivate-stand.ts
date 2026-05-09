import type { Stand } from "@/modules/settings/stands/interfaces";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { STANDS_QUERIES } from "@/modules/settings/stands/constants/stands.queries";
import { StandsService } from "@/modules/settings/stands/services";

export const useDeactivateStand = ({
  onSuccess,
}: {
  onSuccess?: (stand: Stand) => void;
} = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (standId: string | undefined) => {
      return StandsService.delete(standId);
    },
    onSuccess: async (stand) => {
      await queryClient.invalidateQueries({
        queryKey: STANDS_QUERIES.all,
      });
      toast.success("stands:toast.deleted");
      onSuccess?.(stand);
    },
  });

  return {
    deactivateStand: mutation.mutate,
    isPending: mutation.isPending,
  };
};
