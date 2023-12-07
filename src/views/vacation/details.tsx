import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import logo from "../assets/profile.png";
import { format, compareAsc, parseISO } from "date-fns";
import fetchVacation from "../../services/fetchVacation";

const VacationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const results = useQuery(["vacation", id], fetchVacation);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  const vacation = results.data.vacation[0];
  return (
    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg p-10 shadow-xl">
      <h2 className="text-center text-2xl font-semibold mt-3">Férias</h2>
      <p className="text-center text-gray-600 mt-1"></p>

      <div className="mt-5 flex-auto">
        <h3 className="text-sm font-semibold inline-block">
          Período Aquisitivo:{"  "}
        </h3>
        <h3 className="text-gray-600 mt-2 inline-block ml-1">
          {vacation.period}
        </h3>
      </div>
      <div className="mt-5 flex-auto">
        <h3 className="text-sm font-semibold inline-block">Inicio:{"  "}</h3>
        <h3 className="text-gray-600 mt-2 inline-block ml-1">
          {vacation.startAt}
        </h3>
      </div>
      <div className="flex flex-row-reverse mt-6">
        <button
          className="bg-stone-400 text-white rounded-2xl p-3 align-"
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default VacationDetails;
