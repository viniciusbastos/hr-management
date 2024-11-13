import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import ButtonBack from "../../components/buttonBack";
import fetchWeapons from "../../services/fetchWeapons";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react'
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from '@mui/material'
import Loading from "../../components/loading";

const WeaponsList = () => {
  interface Weapons {
    id: number
    name: string
    InitialDate: string
    valid: boolean
    posto: string
    mat: string
    serialNumber: string
    model: string
  }
  const navigate = useNavigate();
  const results = useQuery(["weapons"], fetchWeapons);
  if (results.isLoading) {
    return (
      <Loading />
    );
  }
  const weapons = results.data;
  

  return (
    <Card className="m-10 p-2  rounded-2xl shadow-xl bg-gray-50">
      <CardHeader
        variant="gradient"
        mt-4
        shadow={true}
        floated={true}
        className="bg-caqui-700 p-2 grid h-12 mb-4  place-items-center"
      >
        <Typography variant="h5" color="white" className=" mb-2">
          Policiais com Carga Fixa
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
                Serviço
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
            {weapons.map((weapons: Weapons) => (
              <tr  className="even:bg-blue-gray-100/50">
                <TableCell className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {weapons.mat}
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {weapons.posto}
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {weapons.name}
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {weapons.model}
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {weapons.serialNumber}
                </TableCell>
                <TableCell className="whitespace-nowrap py-3 px-4 border border-slate-200">
                  {format(parseISO(weapons.InitialDate), 'dd/MM/yyyy')}
                </TableCell>
              </tr>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>

        <div className="mt-5">
          <ButtonBack />
        </div>
      </CardBody>
    </Card>
  )
};

export default WeaponsList;
