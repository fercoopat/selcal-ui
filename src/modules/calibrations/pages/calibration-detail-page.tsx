import { useParams } from "react-router";

const CalibrationDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Calibración {id}</h1>
    </div>
  );
};

export default CalibrationDetailPage;
