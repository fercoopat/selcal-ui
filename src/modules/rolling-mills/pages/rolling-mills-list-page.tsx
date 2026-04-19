import { useTranslation } from "react-i18next";

const RollingMillsListPage = () => {
  const { t } = useTranslation("menu");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{t("general.rollingMills")}</h1>
    </div>
  );
};

export default RollingMillsListPage;
