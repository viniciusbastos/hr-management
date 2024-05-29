import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format, compareAsc, parseISO } from "date-fns";
import ButtonBack from "../../components/buttonBack";
import fetchCourse from "../../services/fetchCourse";
import Loading from "../../components/loading";

const CourseName = () => {
  const { name } = useParams();
  const results = useQuery(["course", name], fetchCourse);
  if (results.isLoading) {
    return (
      <Loading />
    );
  }

  console.log(name);

  return (
    <div className=" bg-white rounded-lg p-10 ">
      <h2 className="text-center text-2xl font-semibold mt-3">{name}</h2>
      <p className="text-center text-gray-600 mt-1"></p>

      <div className="mt-5 flex-auto">
        <table className="min-w-full ">
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
                Concluído
              </th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-600">
            {results.data.courses.map((course: any) => (
              <tr key={course.id}>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {course.mat}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {course.posto}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {course.nome}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {format(parseISO(course.InitialDate), "dd/MM/yyyy")}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {format(parseISO(course.FinalDate), "dd/MM/yyyy")}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {course.progress ? "Concluído" : "Em Andamento"}
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

export default CourseName;
