import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { addDays, format, isAfter, parseISO } from 'date-fns'
import ButtonBack from '../../components/buttonBack'
import fetchWeapons from '../../services/fetchWeapons'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  Input,
  Typography,
} from '@material-tailwind/react'
import { Table, TableHead, TableBody, TableFooter } from '@mui/material'
import DeleteModal from '../../components/modalDelete'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import FormWeapon from '../../components/formWeapon'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const WeaponsList = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen((cur) => !cur)
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

  const queryClient = useQueryClient()
  const {
    data: weapons,
    isLoading,
    isError,
    isFetching,
    status,
    refetch,
  } = useQuery(['weapons'], fetchWeapons, {
    onSuccess: (data) => {
      // Handle the updated data if needed
      console.log('Data refetched:', weapons)
    },
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [showLoading, setShowLoading] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(weapons)
  const openDeleteModal = (id: any) => {
    console.log(id)
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsModalOpen(false)
    setDeleteId(null)
  }
  const handleDelete = async () => {
    try {
      await api.delete(`/weapons/${deleteId}`) // Adjust the API endpoint as needed
      queryClient.invalidateQueries(['weapons']) // Invalidate the query
      closeDeleteModal()
    } catch (error) {
      console.error('Error deleting weapons:', error)
      // Handle error (e.g., show an error message to the user)
    }
  }
  const handleInputChange = (e) => {
    const searchTerm = e.target.value
    setSearchItem(searchTerm)

    const filteredItems = weapons.filter(
      (weapons: Weapon) =>
        weapons.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        weapons.posto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        weapons.mat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        weapons.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        weapons.InitialDate.includes(searchTerm.toLowerCase())
    )

    setFilteredUsers(filteredItems)
  }

  const filteredData = filteredUsers ?? weapons

  // Set weapons to an empty array if results.data is not an array
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">Unable to fetch weapons data.</span>
      </div>
    )
  }

  const handleUpdate = async (id: number) => {
    console.log(id)
    try {
      await api.put(`/weaponsfixed/${id}`) // Adjust the API endpoint as needed
      queryClient.invalidateQueries(['weapons']) // Invalidate the query
      closeDeleteModal()
    } catch (error) {
      console.error('Error deleting weapons:', error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <Card className="m-10 p-2  rounded-2xl shadow-xl bg-gray-50 dark:bg-gray-700">
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
          Carga Fixa
        </Button>
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <FormWeapon refetch={refetch} />
        </Dialog>
        {isFetching && <div className="refresh-indicator">Refreshing...</div>}
        <div className="w-full md:w-72 mb-3 flex justify-end">
          <Input
            value={searchItem}
            onChange={handleInputChange}
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            crossOrigin={undefined}
          />
        </div>

        <table className="w-full">
          <thead className="border bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
            <tr className="border">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Mat</th>
              <th className="px-4 py-3 text-left">Posto</th>
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-left">Tipo</th>
              <th className="px-4 py-3 text-left">Número de Serie</th>
              <th className="px-4 py-3 text-left">Data da Carga</th>
              <th className="px-4 py-3 text-left">
                Data do Vencimento da Carga
              </th>
              <th className="px-4 py-3 text-left">Situação</th>
              <th className="px-4 py-3 text-left">Renovar</th>
              <th className="px-4 py-3 text-left">Excluir</th>
            </tr>
          </thead>

          <tbody>
            {filteredData?.map((weapon: Weapon) => (
              <tr
                key={weapon.id}
                className="border hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              >
                <td className="px-4 py-3 font-medium">{weapon.id}</td>
                <td className="px-4 py-3 font-medium">{weapon.mat}</td>
                <td className="px-4 py-3 font-medium">{weapon.posto}</td>
                <td className="py-3 px-8 text-left border w-full  md:w-fit">
                  {weapon.name}
                </td>
                <td className="px-4 py-3 font-medium">{weapon.model}</td>
                <td className="px-4 py-3 font-medium">{weapon.serialNumber}</td>
                <td className="py-3 px-8 text-left border">
                  {format(parseISO(weapon.InitialDate), 'dd/MM/yyyy')}
                </td>
                <td className="py-3 px-8 text-left border">
                  {format(
                    addDays(parseISO(weapon.InitialDate), 365),
                    'dd/MM/yyyy'
                  )}
                </td>
                <td className="py-3 px-8 text-left border">
                  {isAfter(
                    addDays(parseISO(weapon.InitialDate), 365),
                    new Date()
                  ) ? (
                    <span
                      className="px-2 inline-flex text-xs leading-5
                          font-semibold rounded-full bg-green-300 text-green-800"
                    >
                      Valid
                    </span>
                  ) : (
                    <span
                      className="px-2 inline-flex text-xs leading-5
                          font-semibold rounded-full bg-red-400 text-red-800"
                    >
                      Not Valid
                    </span>
                  )}
                </td>
                <td className="py-3 px-8 text-left border">
                  <button
                    onClick={() => handleUpdate(weapon.id)}
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
                <td className="py-3 px-8 text-left border">
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
          </tbody>
        </table>
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
}
export default WeaponsList
