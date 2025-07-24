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
  Spinner,
  Typography,
} from '@material-tailwind/react'
import { Table, TableHead, TableBody, TableFooter } from '@mui/material'
import DeleteModal from '../../components/modalDelete'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import FormWeapon from '../../components/formWeapon'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { toast, ToastContainer } from 'react-toastify'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import WeaponsPDF from './weaponChargePdf'
import CardDashboard from '../../components/cardDashboard'
import ResponsabilityTermPDF from './termoResponsabilidade'
import { useUsers } from '../../App'

/**
 * Component for displaying and managing a list of weapons.
 *
 * Features:
 * - Displays weapons data in a tabular format
 * - Search functionality to filter weapons
 * - Actions for each weapon:
 *   - Discharge weapon
 *   - Renovate weapon registration
 *   - Delete weapon
 *   - Download weapon PDF report
 * - Loading states and error handling
 * - Modal confirmation for deletions
 *
 * @component
 * @example
 * ```tsx
 * <WeaponsList />
 * ```
 *
 * @returns A card containing the weapons list table with search and action buttons
 *
 * State:
 * - open: Controls add weapon form modal
 * - isModalOpen: Controls delete confirmation modal
 * - deleteId: Stores ID of weapon to be deleted
 * - showLoading: Loading indicator state
 * - searchItem: Search input value
 * - filteredUsers: Filtered weapons based on search
 *
 * Data:
 * Uses React Query to fetch and manage weapons data with automatic background updates
 */
const WeaponsList = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen((cur) => !cur)
  interface UsePDFInstance {
    loading: boolean
    blob: Blob | null
    url: string | null
    error: string | null
  }
  interface Weapon {
    id: number
    name: string
    InitialDate: string
    valid: boolean
    posto: string
    mat: string
    serialNumber: string
    model: string
    weaponType: string
    caliber: string
  }
  const users = useUsers()
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
  const qtdWeaponsExpired = weapons?.filter?.((weapon: Weapon) => {
    const initialDate = parseISO(weapon.InitialDate)
    const currentDate = new Date()
    const expirationDate = addDays(initialDate, 365)
    return isAfter(currentDate, expirationDate)
  }).length
  const individualWeponsCharge =
    new Set(weapons?.map((weapon: Weapon) => weapon.mat)).size ?? 0
  const quantityWeaponsTypePT100 =
    weapons?.filter((weapon: Weapon) => weapon.model === 'PT100').length ?? 0

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

  const handleDischarge = async (id: number) => {
    const toastId = toast.loading('Atualizando...')
    try {
      const response = await api.put(`/weaponsfixed/${id}`) // Adjust the API endpoint as needed

      toast.update(toastId, {
        render: 'Arma Descargueada',
        type: 'warning',
        isLoading: false,
        autoClose: 5000,
      })
      queryClient.invalidateQueries(['weapons']) // Invalidate the query
      closeDeleteModal()
    } catch (error) {
      console.error('Error deleting weapons:', error)
      // Handle error (e.g., show an error message to the user)
    }
  }
  const handleRenovate = async (weaponId: string | number) => {
    const toastId = toast.loading('Renovando Carga...')
    try {
      const response = await api.post(`/weapons/copy/${weaponId}`) // Adjust the API endpoint as needed
      // Invalidate the query
      toast.update(toastId, {
        render: response.data.message,
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })
      queryClient.invalidateQueries(['weapons'])
      // renovation logic
    } catch (error) {
      console.error('Error renovating weapon:', error)
    } finally {
      setShowLoading(false)
    }
  }
  const handleDownload = async (id: number) => {
    try {
      const response = await api.post(`/generate-pdf/${id}`, {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `weapon-${id}-document.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error downloading weapon document:', error)
      toast.error('Failed to download document')
    }
  }

  return (
    <>
      {isFetching && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <Spinner className="h-12 w-12" />
        </div>
      )}
      {
        <Card className="mt-5  rounded-2xl shadow-xl bg-gray-50 dark:bg-slate-800">
          <ToastContainer autoClose={3000} hideProgressBar />

          <CardHeader
            variant="gradient"
            mt-4
            shadow={true}
            floated={true}
            className="bg-caqui-700 dark:bg-slate-600 p-2 grid h-12 mb-4  place-items-center"
          >
            <h3 className="text-xl text-color-white dark:text-slate-200 dark:bg-slate-600 mb-2">
              Policiais com Carga Fixa
            </h3>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <Button
              className="flex items-left gap-3 dark:bg-slate-700 mb-5 ml-4"
              size="xl"
              onClick={handleOpen}
            >
              Nova Carga Fixa
            </Button>
            <Dialog
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <FormWeapon refetch={refetch} />
            </Dialog>
            {isFetching && (
              <div className="refresh-indicator">Refreshing...</div>
            )}
            <div className="w-full md:w-72 mb-3 ml-4 flex justify-end">
              <Input
                value={searchItem}
                onChange={handleInputChange}
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                crossOrigin={undefined}
              />
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-row">
                <div className="rounded-xl shadow-xl flex-row w-1/4 ml-8">
                  <CardDashboard
                    link="/weaponsdashboard"
                    title={'QTD Armas Cargueadas'}
                    quant={weapons.length}
                    color="bg-white"
                    darkColor="bg-slate-600"
                    info={'Armas de Fogo'}
                  />
                </div>
                <div className="rounded-xl shadow-xl flex-row w-1/4 ml-2">
                  <CardDashboard
                    link="/weaponsdashboard"
                    title={'Carga Fixa Vencida'}
                    quant={qtdWeaponsExpired}
                    color="bg-white"
                    darkColor="bg-slate-600"
                    info={'Acaf'}
                  />
                </div>
                <div className="rounded-xl shadow-xl flex-row w-1/4 ml-2">
                  <CardDashboard
                    link="/weaponsdashboard"
                    title={'QTD PM com Carga Fixa'}
                    quant={individualWeponsCharge}
                    color="bg-white"
                    darkColor="bg-slate-600"
                    info={'Policiais Militares'}
                  />
                </div>
                <div className="rounded-xl shadow-xl flex-row w-1/4 ml-2">
                  <CardDashboard
                    link="/weaponsdashboard"
                    title={'Qtd de Pistolas PT100 Cargueadas'}
                    quant={quantityWeaponsTypePT100}
                    color="bg-white"
                    darkColor="bg-slate-600"
                    info={'Policiais Militares'}
                  />
                </div>
              </div>
            </div>
            <div className="flex px-4 mx-4 mt-4">
              <table className="w-full  min-w-full divide-y divide-gray-200 dark:divide-gray-700 dark:border-gray-700">
                <thead className="border bg-gray-200 dark:bg-slate-700 dark:text-gray-200">
                  <tr className="border">
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Mat</th>
                    <th className="px-4 py-3 text-left">Posto</th>
                    <th className="px-4 py-3 text-left">Nome</th>
                    <th className="px-4 py-3 text-left">Tipo</th>
                    <th className="px-4 py-3 text-left">Número de Serie</th>
                    <th className="px-4 py-3 text-left">Data da Carga</th>
                    <th className="px-4 py-3 text-left">Vencimento da Carga</th>
                    <th className="px-4 py-3 text-left">Situação</th>
                    <th className="px-4 py-3 text-left">Renovar</th>
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
                      <td className="px-4 py-3 font-medium">
                        {weapon.serialNumber}
                      </td>
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
                            Válido
                          </span>
                        ) : (
                          <span
                            className="px-2 inline-flex text-xs leading-5
                          font-semibold rounded-full bg-red-400 text-red-800"
                          >
                            Vencido
                          </span>
                        )}
                      </td>

                      <button
                        onClick={() => handleDischarge(weapon.id)}
                        className="bg-red-500 hover:bg-red-700 m-2 text-white font-bold py-1 px-2 rounded"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleRenovate(weapon.id)}
                        className="bg-green-500 hover:bg-green-700 m-2 text-white font-bold py-1 px-2 rounded"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => openDeleteModal(weapon.id)}
                        className="bg-red-500 hover:bg-red-700 text-white m-1 font-bold py-1 px-2 rounded"
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

                      <PDFDownloadLink
                        document={<WeaponsPDF weapon={weapon} />}
                        fileName={`requerimento-${weapon.id}.pdf`}
                      >
                        {({
                          url,
                          loading,
                          error,
                        }: {
                          url: string | null
                          loading: boolean
                          error: Error | null
                        }) => (
                          <button disabled={loading || error}>
                            {loading
                              ? 'Creating PDF…'
                              : error
                                ? 'Failed to create PDF'
                                : 'Download PDF'}
                            {error && console.error('PDF error:', error)}{' '}
                          </button>
                        )}
                      </PDFDownloadLink>

                      <PDFDownloadLink
                        document={<ResponsabilityTermPDF weapon={weapon} />}
                        fileName={`termo-responsabilidade-${weapon.id}.pdf`}
                      >
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ">
                          <>
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                            </svg>
                          </>
                        </button>
                      </PDFDownloadLink>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
      }
    </>
  )
}
export default WeaponsList
