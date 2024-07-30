import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format, compareAsc, parseISO } from "date-fns";
import ButtonBack from "../../components/buttonBack";
import fetchCourseId from "../../services/fetchCourseId";
import Loading from "../../components/loading";
import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const results = useQuery(["course", id], fetchCourseId);
  if (results.isLoading) {
    return (
      <Loading />
    );
  }
  const course = results.data.courses[0];

  return (
    <div className="max-w-xl mx-auto my-10 bg-white rounded-lg p-10 shadow-xl">
      <h2 className="text-center text-2xl font-semibold mt-3">Cursos</h2>
      <p className="text-center text-gray-600 mt-1"></p>

      <div className="mt-5 flex-auto">
        <table className="min-w-full ">
          <thead className="text-sm text-gray-700">
            <tr>
              <th className="py-3 px-8 text-left border border-slate-200">#</th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Início
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Término
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Concluído
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Concluído
              </th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-600">
            {results.data.courses.map((course: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; InitialDate: string; FinalDate: string; }) => (
              <tr key={course.id}>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {course.name}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {format(parseISO(course.InitialDate), "dd/MM/yyyy")}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {format(parseISO(course.FinalDate), "dd/MM/yyyy")}
                </td>
                <td className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {format(parseISO(course.FinalDate), "dd/MM/yyyy")}
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
