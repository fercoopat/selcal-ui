import { EditIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { IconButton } from "@/components/buttons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUserDetails } from "@/modules/security/users/contexts/user-details-context";
import { joinText } from "@/shared/utils/text.utils";

const UserDetailsSummary = () => {
  const { t } = useTranslation();

  const { user } = useUserDetails();

  return (
    <Card className="w-full max-w-sm md:max-w-full lg:max-w-sm">
      <CardHeader>
        <CardTitle>{joinText([user?.firstName, user?.lastName])}</CardTitle>

        <CardDescription>{user?.email}</CardDescription>

        <CardAction>
          <Badge variant={!user?.isActive ? "destructive" : "default"}>
            {t(`common:isActive.${String(user?.isActive)}`)}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4"></div>
      </CardContent>

      <CardFooter className="flex-col justify-between gap-2">
        <Separator className="mb-4" />

        <div className="flex w-full justify-between gap-4">
          <p className="w-full">{user?.role.name}</p>

          <div className="w-full max-w-fit">
            <IconButton tooltip="common:edit" size={"icon-sm"}>
              <EditIcon />
            </IconButton>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default UserDetailsSummary;
