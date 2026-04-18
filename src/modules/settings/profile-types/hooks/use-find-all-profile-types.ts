import { useQuery } from "@tanstack/react-query";

import { PROFILE_TYPES_QUERIES } from "@/modules/settings/profile-types/constants";
import { ProfileTypesService } from "@/modules/settings/profile-types/services";

export const useFindAllProfileTypes = () =>
  useQuery({
    queryKey: PROFILE_TYPES_QUERIES.findAll,
    queryFn: () => ProfileTypesService.findAll(),
    select: (data) => [...data].sort((a, b) => a.sortOrder - b.sortOrder),
  });
