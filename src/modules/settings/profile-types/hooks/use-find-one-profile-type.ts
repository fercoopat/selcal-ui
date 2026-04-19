import { useQuery } from "@tanstack/react-query";

import { PROFILE_TYPES_QUERIES } from "@/modules/settings/profile-types/constants";
import { ProfileTypesService } from "@/modules/settings/profile-types/services";

export const useFindOneProfileType = (id: string) =>
  useQuery({
    queryKey: PROFILE_TYPES_QUERIES.findOne(id),
    queryFn: () => ProfileTypesService.findOne(id),
    enabled: !!id,
  });
