import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format, compareAsc, parseISO } from "date-fns";
import ButtonBack from "../../components/buttonBack";
import fetchCourseId from "../../services/fetchCourseId";
import fetchSickNoteId from "../../services/fetchSickNoteId";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const results = useQuery(["sicknote", id], fetchSickNoteId);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  const sicknote = results.data?.sicknote[0];

  console.log(sicknote);
  return (
    <div className="max-w-xl mx-auto my-10 bg-white rounded-lg p-10 shadow-xl">
      <h2 className="text-center text-2xl font-semibold mt-3">
        Atestados Médicos
      </h2>
      <p className="text-center text-gray-600 mt-1"></p>

      <div className="mt-5 flex-auto">
        <table className="min-w-full ">
          <thead className="text-sm text-gray-700">
            <tr>
              <th className="py-3 px-8 text-left border border-slate-200">
                Início
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Término
              </th>

              <th className="py-3 px-8 text-left border border-slate-200">
                Dias de Afastamento
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Cid
              </th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-600">
            {results.data?.sicknote.map((sicknote: any) => (
              <tr key={sicknote.id}>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {format(parseISO(sicknote.InitialDate), "dd/MM/yyyy")}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {format(parseISO(sicknote.FinalDate), "dd/MM/yyyy")}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {sicknote.Days}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {sicknote.Cid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <ButtonBack />
      </div>
    </div>
  );
};

export default CourseDetails;
