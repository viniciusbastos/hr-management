import { useQuery, useQueryClient } from '@tanstack/react-query'
import Select from 'react-select'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Typography,
} from '@material-tailwind/react'
import { ToastContainer, toast } from 'react-toastify'
import {
  Controller,
  useForm,
  useController,
  type FieldValues,
} from 'react-hook-form'

import { api } from '../../services/api'
import { AuthContext, useRoleBasedAccess } from '../../contexts/rbac'
import { useContext, useEffect, useState } from 'react'

const locationOptions = [
  { value: 1, label: 'CARGA PESSOAL' },
  { value: 2, label: 'DISPONIVEL PARA CARGA' },
  { value: 3, label: 'EXTRAVIADA' },
  { value: 4, label: 'SALA DE MEIOS' },
  { value: 6, label: 'SOB APURAÇÃO' },
  { value: 7, label: '1PEL - RIO REAL' },
  { value: 8, label: '1PEL - LORETO' },
  { value: 9, label: '1PEL - JANDAÍRA' },
  { value: 10, label: '2PEL - ACAJUTIBA' },
  { value: 11, label: '2PEL - APORÁ' },
  { value: 12, label: '3PEL - CRISOPÓLIS' },
  { value: 13, label: '4PEL - ITAPICURU' },
  { value: 14, label: '5PEL - OLINDINA' },
  { value: 15, label: '6PEL - PETO' },
  { value: 16, label: 'SOINT' },
]

const statusOptions = [
  { value: 1, label: 'EM_CONDICOES_DE_USO' },
  { value: 2, label: 'DEFEITO' },
  { value: 3, label: 'EM_MANUTENCAO' },
  { value: 4, label: 'INSERVIVEL' },
  { value: 5, label: 'NAO_LOCALIZADA' },
  { value: 6, label: 'A_DISPOSICAO_DA_JUSTICA' },
]
const caliberOptions = [
  { value: 1, label: 'CALIBRE_40' },
  { value: 2, label: 'CALIBRE_12' },
  { value: 3, label: 'CALIBRE_38' },
  { value: 4, label: 'CALIBRE_380' },
  { value: 5, label: 'CALIBRE_762' },
  { value: 9, label: 'CALIBRE_556' },
  { value: 10, label: 'CALIBRE_9MM' },
]

const brandOptions = [
  { value: 1, label: 'TAURUS' },
  { value: 2, label: 'GLOCK' },
  { value: 3, label: 'IMBEL' },
  { value: 4, label: 'IWI' },
  { value: 5, label: 'BERETTA' },
]

const typeOptions = [
  { value: 1, label: 'Carabina' },
  { value: 2, label: 'Pistola' },
  { value: 3, label: 'Metralhadora' },
  { value: 4, label: 'Fuzil' },
  { value: 5, label: 'Revolver' },
]
const FormNewWeapon = () => {
  const { userRole, permissions, hasPermission, hasSufficientRole } =
    useRoleBasedAccess()
  const { user } = useContext(AuthContext)
  const [roleInfo, setRoleInfo] = useState<string | null>(null)
  const [permissionInfo, setPermissionInfo] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      // Check role level
      const requiredRole = 'ADMIN'
      const hasSufficient = hasSufficientRole(requiredRole)

      // Check permissions
      const requiredPermission = 'manage_users'
      const hasPermissionCheck = hasPermission(requiredPermission)

      setRoleInfo(
        hasSufficient ? 'Sufficient role level' : 'Insufficient role level'
      )
      setPermissionInfo(
        hasPermissionCheck
          ? 'Sufficient permissions'
          : 'Missing required permission'
      )
    }
  }, [user, hasPermission, hasSufficientRole])
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm()

  const onSubmit = async (data: FieldValues) => {
    const id = toast.loading('Please wait...')
    try {
      const response = await api.post(`/newWeapons`, data)
      toast.update(id, {
        render: 'All is good',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })
      queryClient.invalidateQueries({
        queryKey: ['vacation'],
      }) // Invalidate the query
      reset()
    } catch (error) {
      console.error(error)
      console.log('erro')
      toast.update(id, {
        render: 'Error',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }
  return (
    <Card className="m-10 p-2  rounded-2xl shadow-xl dark:bg-slate-600">
      <CardHeader
        variant="gradient"
        mt-4
        floated={true}
        className="bg-caqui-700 dark:bg-slate-800 p-2 grid h-12 mb-4  place-items-center"
      >
        <Typography variant="h5" color="white" className=" mb-2">
          Cadastro de Armas
        </Typography>
      </CardHeader>
      <ToastContainer autoClose={3000} hideProgressBar />
      <CardBody className="p-6 m-4 relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Input
              crossOrigin
              label="Modelo da Arma"
              className="mb-3"
              {...register('model', { required: true })}
            />
            {/* { errors.name?.type === "required" && <p className="text-sm">The period is required</p>} */}
          </div>
          <div className="mb-3">
            <Input
              crossOrigin
              label="Número de Série"
              className="mb-3"
              {...register('serialNumber', { required: true })}
            />
            {/* { errors.name?.type === "required" && <p className="text-sm">The period is required</p>} */}
          </div>

          <div className="mb-6 mt-3">
            <select
              id="location"
              className="w-full p-2 border rounded"
              {...register('location', { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
                Localização
              </option>
              {locationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="text-sm text-red-500">Localização é obrigatória</p>
            )}
          </div>

          <div className="mb-6 mt-3">
            <select
              id="status"
              className="w-full p-2 border rounded"
              {...register('status', { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
                Status
              </option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-sm text-red-500">Status é obrigatório</p>
            )}
          </div>

          <div className="mb-6 mt-3">
            <select
              id="caliber"
              className="w-full p-2 border rounded"
              {...register('caliber', { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
                Calibre
              </option>
              {caliberOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.caliber && (
              <p className="text-sm text-red-500">Calibre é obrigatório</p>
            )}
          </div>

          <div className="mb-6 mt-3">
            <select
              id="brand"
              className="w-full p-2 border rounded"
              {...register('brand', { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
                Marca
              </option>
              {brandOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.brand && (
              <p className="text-sm text-red-500">Marca é obrigatória</p>
            )}
          </div>

          <div className="mb-6 mt-3">
            <select
              id="type"
              className="w-full p-2 border rounded"
              {...register('type', { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
                Tipo
              </option>
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-sm text-red-500">Tipo é obrigatório</p>
            )}
          </div>

          <div className="mt-3 mb-6 relative bottom-0 right-0 ">
            <Button disabled={!isValid} type="submit" color="green">
              Enviar
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default FormNewWeapon
