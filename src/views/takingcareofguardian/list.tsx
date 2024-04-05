import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format, compareAsc, parseISO } from "date-fns";
import ButtonBack from "../../components/buttonBack";
import fechAppointments from "../../services/fetchAppointments";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Table, TableHead, TableBody, TableCell, TableFooter } from "@mui/material";


const TakingCareGuardianList = () => {
  interface Appointment {
    id: number
    name: string
    Date: string
    progress: boolean
    posto: string
    mat: string
    Service: string
  }
  const navigate = useNavigate();
  const results = useQuery(["appointments"], fechAppointments);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  const appointments = results.data;
  console.log(appointments)

  return (
    <Card className="m-10 p-2  rounded-2xl shadow-xl bg-gray-50">
    <CardHeader variant="gradient" mt-4 shadow={true} floated={true} className="bg-caqui-700 p-2 grid h-12 mb-4  place-items-center">
    <Typography variant="h5" color="white" className=" mb-2">
       Atendimentos Cuidando do Cuidador
    </Typography>
  </CardHeader>
  <CardBody className="overflow-scroll px-0">
        <Table className="w-full min-w-max table-auto text-left">
          <TableHead className="text-sm text-gray-700">
            <tr>
           
              <th className="py-3 px-8 text-left border border-slate-200">
                Mat
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Posto
              </th>

              <th className="py-3 px-8 text-left border border-slate-200">
              Nome
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Especialidade
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Data
              </th>
            </tr>
          </TableHead>

          <TableBody className="text-sm text-gray-600">
            {appointments.map((appointment: Appointment) => (
              <tr key={appointment.id} className="even:bg-blue-gray-100/50">
                
                <TableCell className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {appointment.mat}
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {appointment.posto}
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {appointment.name}
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {appointment.Service}
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 px-4 border border-slate-200">
                {format(parseISO(appointment.Date), "dd/MM/yyyy")}
                </TableCell>
              </tr>
            ))}
          </TableBody>
          <TableFooter>

          </TableFooter>

        </Table>
     
      <div className="mt-5">
        <ButtonBack />
      </div>
      </CardBody>
      </Card>
  );
};

export default TakingCareGuardianList;
