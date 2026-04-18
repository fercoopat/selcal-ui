import { useTranslation } from "react-i18next";

const CalibrationsListPage = () => {
  const { t } = useTranslation("calibrations");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
    </div>
  );
};

export default CalibrationsListPage;
