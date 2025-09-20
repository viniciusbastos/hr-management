import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { addDays, format, isAfter, parseISO } from 'date-fns'
import ButtonBack from '../../components/buttonBack'
import { fetchWeapons } from '../../services/fetchWeapons'
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
import WeaponsPDF from './weaponChargePdf'
import CardDashboard from '../../components/cardDashboard'
import ResponsabilityTermPDF from './termoResponsabilidade'
import { useUsers } from '../../App'
import { saveAs } from 'file-saver'

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
const DashboardWeaponsCharge = () => {
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
  const [isSubmitting, setIsSubmitting] = useState(false)
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
  const quantityWeaponsType840 =
    weapons?.filter((weapon: Weapon) => weapon.model === 'PT840').length ?? 0
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
    if (isSubmitting) return // Prevent further submits

    setIsSubmitting(true)
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
      setIsSubmitting(false)
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
            <h3 className="text-xl font-bold text-color-white dark:text-slate-200 dark:bg-slate-600 mb-2">
              CONTROLE DE CARGA FIXA
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
                    title={'Armas Cargueadas'}
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
                    quant={
                      qtdWeaponsExpired ||
                      (qtdWeaponsExpired / weapons.length) * 100
                    }
                    color="bg-white"
                    darkColor="bg-slate-600"
                    info={'Acaf'}
                  />
                </div>
                <div className="rounded-xl shadow-xl flex-row w-1/4 ml-2">
                  <CardDashboard
                    link="/weaponsdashboard"
                    title={'Carga Fixa'}
                    quant={individualWeponsCharge}
                    color="bg-white"
                    darkColor="bg-slate-600"
                    info={'Policiais Militares'}
                  />
                </div>
                <div className="rounded-xl shadow-xl flex-row w-1/4 ml-2">
                  <CardDashboard
                    link="/weaponsdashboard"
                    title={'PT100 Cargueadas'}
                    quant={quantityWeaponsTypePT100}
                    color="bg-white"
                    darkColor="bg-slate-600"
                    info={'Pistolas'}
                  />
                </div>
                <div className="rounded-xl shadow-xl flex-row w-1/4 ml-2">
                  <CardDashboard
                    link="/weaponsdashboard"
                    title={'PT840 Cargueadas'}
                    quant={quantityWeaponsType840}
                    color="bg-white"
                    darkColor="bg-slate-600"
                    info={'Pistolas'}
                  />
                </div>
              </div>
            </div>
            <div className="flex px-4 mx-4 mt-8"></div>
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
export default DashboardWeaponsCharge
