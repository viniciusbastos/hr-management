import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import ButtonBack from '../../components/buttonBack'
import { api } from '../../services/api'
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react'
import Loading from '../../components/loading'
import { exportToCSV, exportToExcel } from '../../utils/exportUtils'
import DeleteModal from '../../components/modalDelete'
import { useState } from 'react'
import fetchVacationsPlan from '../../services/fetchVacationsPlan'

// Define a type for vacation data
type VacationType = {
  id: number
  mat: string
  posto: string
  name: string
  phone: string
  optionOne: string // Assuming date strings are in ISO format
  optionTwo: string // Assuming date strings are in ISO format
}

const VacationsPlan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const queryClient = useQueryClient()

  const {
    data: vacationsplan,
    isError,
    isLoading,
    error,
  } = useQuery(['vacationplan'], fetchVacationsPlan)
  console.log(vacationsplan)
  const openDeleteModal = (id: number) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsModalOpen(false)
    setDeleteId(null)
  }

  const handleDelete = async () => {
    try {
      if (!deleteId) {
        console.error('No deleteId provided')
        return
      }

      // Make the API call
      const response = await api.delete(`/vacations/${deleteId}`)
      console.log('Response', response)
      // Check for a successful response status (e.g., 200, 204)
      if (response.status >= 200 && response.status < 300) {
        console.log('Vacation deleted successfully')
        queryClient.invalidateQueries({
          queryKey: ['vacationplan'],
        })
        closeDeleteModal()
      } else {
        console.error(`Unexpected status code: ${response.status}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting vacation:', error.message)
      } else {
        console.error('An unexpected error occurred:', error)
      }

      // Optionally, you can also check for network errors
      if (!window.navigator.onLine) {
        console.error('Network error: No internet connection')
      }
    }
  }

  if (isLoading) return <Loading /> // Use a dedicated Loading component
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load vacations. Please try again later.
      </div>
    )

  return (
    <Card className="m-10 p-2 rounded-2xl shadow-xl bg-gray-50 dark:bg-gray-700">
      <CardHeader
        variant="gradient"
        floated={true}
        className="bg-caqui-700 dark:bg-gray-600 p-2 grid h-12 mb-4 place-items-center"
      >
        <Typography
          variant="h5"
          color="white"
          className="mb-2 dark:text-gray-300"
        >
          Plano de Férias 2025
        </Typography>
      </CardHeader>
      <CardBody className="p-6">
        <div className="ml-4 mb-4">
          <button
            onClick={() => exportToCSV(vacationsplan, 'vacations.csv')}
            className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg mr-2"
          >
            Export to CSV
          </button>
          <button
            onClick={() => exportToExcel(vacationsplan, 'vacations.xlsx')}
            className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg"
          >
            Export to Excel
          </button>
        </div>
        <table className="table-auto dark:text-gray-300">
          <caption className="caption-bottom mt-5">
            Total de {vacationsplan.length} policiais de Férias no mês
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
              <th className="py-3 px-8 text-left border dark:text-gray-300">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-600 dark:text-gray-300">
            {vacationsplan.map((vacation: any) => (
              <tr key={vacation.id}>
                <td className="py-3 px-4 border border-slate-200">
                  {vacation.mat}
                </td>
                <td className="py-3 px-4 border border-slate-200">
                  {vacation.posto}
                </td>
                <td className="py-3 px-4 border border-slate-200">
                  {vacation.name}
                </td>
                <td className="py-3 px-4 border border-slate-200">
                  {vacation.optionOne}
                </td>
                <td className="py-3 px-4 border border-slate-200">
                  {vacation.optionTwo}
                </td>

                <td className="py-3 px-8 border dark:text-gray-300">
                  <svg
                    onClick={() => openDeleteModal(vacation.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-red-300  hover:fill-red-600 cursor-pointer stroke-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ButtonBack />
      </CardBody>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        tipo="Férias"
      />
    </Card>
  )
}

export default VacationsPlan
