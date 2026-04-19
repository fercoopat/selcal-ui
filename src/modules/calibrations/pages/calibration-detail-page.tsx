import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

const CalibrationDetailPage = () => {
  const { t } = useTranslation("calibrations");
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{t("detail.title", { id })}</h1>
    </div>
  );
};

export default CalibrationDetailPage;
