import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addDays, format, isAfter, parseISO } from "date-fns";
import ButtonBack from "../../components/buttonBack";
import fetchWeapons from "../../services/fetchWeapons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
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
import DeleteModal from "../../components/modalDelete";
import { SetStateAction, useState } from "react";
import { api } from "../../services/api";
import FormWeapon from "../../components/formWeapon";

const WeaponsList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  interface Weapon {
    id: number
    name: string
    InitialDate: string
    valid: boolean
    posto: string
    mat: string
    serialNumber: string
    model: string
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {data: weapons, isLoading, isError} = useQuery(["weapons"], fetchWeapons,  {
    onSuccess: (data) => {
      // Handle the updated data if needed
      console.log("Data refetched:", weapons);
    },
  });
 
  const openDeleteModal = (id: any) => {
    console.log(id)
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };
  const handleDelete = async () => {
    try {

      await api.delete(`/weapons/${deleteId}`); // Adjust the API endpoint as needed
      queryClient.invalidateQueries(["weapons"]); // Invalidate the query      
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting weapons:', error);
      // Handle error (e.g., show an error message to the user)
    }
  }; 
  
  // Set weapons to an empty array if results.data is not an array
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">Unable to fetch weapons data.</span>
      </div>
    );
  }
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
      <Button
           className="flex items-left gap-3 dark:bg-blue-gray-700 mb-5"
           size="xl"
           onClick={handleOpen}
            >
              Adicionar Carga
        </Button>
        <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <FormWeapon />
      </Dialog>
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
                Tipo
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Número de Serie
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Data da Carga
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Data do Vencimento da Carga
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Situação
              </th>
              <th className="py-3 px-8 text-left border border-slate-200">
                Ação
              </th>
            </tr>
          </TableHead>

          <TableBody className="text-sm text-gray-600">
            {weapons.map((weapon: Weapon) => (
              <tr key={weapon.id} className="even:bg-blue-gray-100/50">
                <TableCell>{weapon.mat}</TableCell>
                <TableCell>{weapon.posto}</TableCell>
                <TableCell>{weapon.name}</TableCell>
                <TableCell>{weapon.model}</TableCell>
                <TableCell>{weapon.serialNumber}</TableCell>
                {/* <TableCell>{weapon.InitialDate ? format(parseISO(weapon.InitialDate), 'dd/MM/yyyy') : ''}</TableCell> */}
                <TableCell>{format(addDays(parseISO(weapon.InitialDate), 365), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                {isAfter(addDays(parseISO(weapon.InitialDate), 365), new Date()) ? 
                <span
                    className="px-2 inline-flex text-xs leading-5
                          font-semibold rounded-full bg-green-300 text-green-800"
                  >
                    Valid
                  </span> : 
                  <span
                    className="px-2 inline-flex text-xs leading-5
                          font-semibold rounded-full bg-red-400 text-red-800"
                  >
                    Not Valid
                  </span>
                  }
              </TableCell>
              <td className="whitespace-nowrap py-2 px-2 md:py-3 md:px-4 border border-slate-200">
              <button
                  onClick={() => openDeleteModal(weapon.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                   <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
              </button>
            </td>
              </tr>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        tipo="Carga de Arma de Fogo"
      />

        <div className="mt-5">
          <ButtonBack />
        </div>
      </CardBody>
    </Card>
  )
};

export default WeaponsList;
