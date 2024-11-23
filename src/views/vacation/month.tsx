import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format, compareAsc, parseISO } from "date-fns";
import fetchVacationMonth from "../../services/fetchVacationMonth";
import ButtonBack from "../../components/buttonBack";
import { api } from "../../services/api";
import config from "../../utils/config";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Loading from "../../components/loading";

const VacationMonth = () => {
  const { month } = useParams();
  const results = useQuery(["vacation", month], fetchVacationMonth, {
    onSuccess: (data) => {
      console.log("Data refetched:", data);
    },
  });
  if (results.isLoading) {
    return (
      <Loading />
    );
  }

  function handleDelete(id: any) {
    api.delete(`/vacation/${id}`, config).then(() => {});
  }

  return (
    <Card className="m-10 p-2  rounded-2xl shadow-xl bg-gray-50 dark:bg-gray-700">
    <CardHeader
      variant="gradient"
      mt-4
      floated={true}
      className="bg-caqui-700 dark:bg-gray-600 p-2 grid h-12 mb-4  place-items-center"
    >
      <Typography variant="h5" color="white" className=" mb-2 dark:text-gray-300">
      Férias do mês {month}/{results.data.vacation[0].year}
      </Typography>
    </CardHeader>
    <CardBody className="p-6">
        <table className="table-auto dark:text-gray-300">
          <caption className="caption-bottom mt-5">
            Total de {results.data.vacation.length} policiais de Férias no mês
          </caption>
          <thead className="text-sm text-gray-700 dark:text-gray-300">
            <tr>
              <th className="py-3 px-4 text-left border border-slate-200 dark:text-gray-300">
                Mat
              </th>
              <th className="py-3 px-4 text-left border border-slate-200 dark:text-gray-300">
                Posto/Grad
              </th>
              <th className="py-3 px-4 text-left border border-slate-200 dark:text-gray-300">
                Nome
              </th>
              <th className="py-3 px-4 text-left border border-slate-200 dark:text-gray-300">
                Início
              </th>
              <th className="py-3 px-4 text-left border border-slate-200">
                Término
              </th>
              <th className="py-3 px-4 text-left border border-slate-200">
                Período
              </th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-600 dark:text-gray-300">
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
                {/* <td>
                  <button
                    type="button"
                    className="px-2  bg-red-600  py-1 border hover:bg-red-400 rounded-full"
                    onClick={() => handleDelete(vacation.id)}
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <ButtonBack />
        </CardBody>
    </Card>
  );
};

export default VacationMonth;
