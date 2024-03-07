import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format, compareAsc, parseISO } from "date-fns";
import fetchVacationMonth from "../../services/fetchVacationMonth";
import ButtonBack from "../../components/buttonBack";
import { api } from "../../services/api";
import config from "../../utils/config";

const VacationMonth = () => {
  const { month } = useParams();
  const results = useQuery(["vacation", month], fetchVacationMonth);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }


  function handleDelete(id: any) {
    api.delete(`/vacation/${id}`, config).then(() => {
    });
  } 

  return (
    <div className=" mx-auto my-10 bg-white rounded-lg p-10 shadow-xl">
      <h2 className="text-center text-2xl font-semibold mt-3">
        Férias do mês {month}/{results.data.vacation[0].year}
      </h2>
      <p className="text-center text-gray-600 mt-1"></p>

      <div className="mt-5 flex-auto">
        <table className="min-w-full ">
          <caption className="caption-bottom">
            Total de {results.data.vacation.length} de Férias no mês 
            
          </caption>
          <thead className="text-sm text-gray-700">
            <tr>
              <th className="py-3 px-8 text-left border border-slate-200">
                Mat
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Posto/Grad
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Nome
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Início
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Término
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Período
              </th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-600">
            {results.data.vacation.map((vacation: any) => (
              <tr key={vacation.id}>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {vacation.mat}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {vacation.posto}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {vacation.name}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {format(parseISO(vacation.startAt), "dd/MM/yyyy")}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {format(parseISO(vacation.finishAt), "dd/MM/yyyy")}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {vacation.period}
                </td>
                <td>
                  <button
                    type="button"
                    className="px-2  bg-red-600  py-1 border hover:bg-red-400 rounded-full"
                    onClick={() => handleDelete(vacation.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ButtonBack />
    </div>
  );
};

export default VacationMonth;
