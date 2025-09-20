import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react'
import { useForm, Controller } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchWeaponById } from '../../services/fetchWeapons'
import { api } from '../../services/api'
import { Weapon } from '../../interfaces/Weapon'

// Define weapon type/location options as a constant for better maintainability

const EditWeapon = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { data: weapon, isLoading } = useQuery({
    queryKey: ['weapon', id],
    queryFn: () => fetchWeaponById(id!),
    enabled: !!id,
    select: (data) => data.weapon,
  })
  console.log(weapon)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Weapon>({
    defaultValues: {
      model: '',
      serialNumber: '',
      type: '',
      Status: '',
      Caliber: '',
      location: '',
    },
  })

  useEffect(() => {
    if (weapon) {
      setValue('model', weapon.model || '')
      setValue('serialNumber', weapon.serialNumber || '')
      setValue('type', String(weapon.type) || '')
      setValue('Status', String(weapon.status) || '')
      setValue('Caliber', String(weapon.caliber) || '')
      setValue('location', String(weapon.location) || '')
    }
  }, [weapon, setValue])

  const onSubmit = async (data: Weapon) => {
    if (!id) return
    const toastId = toast.loading('Updating weapon...')

    try {
      await api.put(`/editweapon/${id}`, data)
      toast.update(toastId, {
        render: 'Weapon updated successfully',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })
      queryClient.invalidateQueries({
        queryKey: ['weaponsinfo'],
      })
      navigate('/weaponscontrol')
    } catch (error) {
      console.error('Error updating weapon:', error)
      toast.update(toastId, {
        render: 'Failed to update weapon',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }

  const handleCancel = () => {
    navigate('/weapons')
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-xl rounded-xl mb-6">
        <CardHeader
          variant="gradient"
          floated={true}
          className="bg-caqui-700 p-2 grid h-12 place-items-center"
        >
          <Typography variant="h5" color="white">
            Edit Weapon
          </Typography>
        </CardHeader>

        <ToastContainer autoClose={3000} hideProgressBar />

        <CardBody className="p-6 m-4 relative">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Typography color="gray" className="text-sm mb-2">
                  Model
                </Typography>
                <Input
                  crossOrigin=""
                  {...register('model', { required: true })}
                  label="Weapon Model"
                  className="mb-3"
                />
                {errors.model && (
                  <Typography color="red" className="text-sm mt-1">
                    Model is required
                  </Typography>
                )}
              </div>

              <div>
                <Typography color="gray" className="text-sm mb-2">
                  Serial Number
                </Typography>
                <Input
                  crossOrigin=""
                  {...register('serialNumber', { required: true })}
                  label="Serial Number"
                  className="mb-3"
                />
                {errors.serialNumber && (
                  <Typography color="red" className="text-sm mt-1">
                    Serial Number is required
                  </Typography>
                )}
              </div>

              <div>
                <Typography color="gray" className="text-sm mb-2">
                  Type
                </Typography>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      key={field.value}
                      value={field.value}
                      onChange={field.onChange}
                      label="type"
                      placeholder="Select a type"
                    >
                      <Option value="1">Carabina</Option>
                      <Option value="2">Pistola</Option>
                      <Option value="3">Metralhadora</Option>
                      <Option value="4">Fuzil</Option>
                      <Option value="5">Revólver</Option>
                    </Select>
                  )}
                />
                {errors.type && (
                  <Typography color="red" className="text-sm mt-1">
                    Type is required
                  </Typography>
                )}
              </div>

              <div>
                <Typography color="gray" className="text-sm mb-2">
                  Status
                </Typography>
                <Controller
                  name="Status"
                  control={control}
                  defaultValue={String(weapon?.status)}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select {...field} label="Status">
                      <Option value="1">EM_CONDICOES_DE_USO</Option>
                      <Option value="2">DEFEITO</Option>
                      <Option value="3">EM_MANUTENCAO</Option>
                      <Option value="4">INSERVIVEL</Option>
                      <Option value="5">NAO_LOCALIZADA</Option>
                      <Option value="6">A_DISPOSICAO_DA_JUSTICA</Option>
                    </Select>
                  )}
                />
                {errors.Status && (
                  <Typography color="red" className="text-sm mt-1">
                    Status is required
                  </Typography>
                )}
              </div>

              <div>
                <Typography color="gray" className="text-sm mb-2">
                  Caliber
                </Typography>
                <Controller
                  name="Caliber"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select {...field} label="caliber">
                      <Option value="1">CALIBRE_40</Option>
                      <Option value="2">CALIBRE_12</Option>
                      <Option value="3">CALIBRE_38</Option>
                      <Option value="4">CALIBRE_380</Option>
                      <Option value="5">CALIBRE_762</Option>
                      <Option value="9">CALIBRE_556</Option>
                      <Option value="10">CALIBRE_9MM</Option>
                    </Select>
                  )}
                />

                {errors.Caliber && (
                  <Typography color="red" className="text-sm mt-1">
                    Caliber is required
                  </Typography>
                )}
              </div>
              <div className="md:col-span-2">
                <Typography color="gray" className="text-sm mb-2">
                  Location
                </Typography>
                <Controller
                  name="location"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select {...field} label="Location">
                      <Option value="1">CARGA PESSOAL</Option>
                      <Option value="2">DISPONIVEL PARA CARGA</Option>
                      <Option value="3">EXTRAVIADA</Option>
                      <Option value="4">SALA DE MEIOS</Option>
                      <Option value="6">SOB APURAÇÃO</Option>
                      <Option value="7">1PEL - RIO REAL</Option>
                      <Option value="8">1PEL - LORETO</Option>
                      <Option value="9">1PEL - JANDAÍRA</Option>
                      <Option value="10">2PEL - ACAJUTIBA</Option>
                      <Option value="11">2PEL - APORÁ</Option>
                      <Option value="12">3PEL - CRISOPÓLIS</Option>
                      <Option value="13">4PEL - ITAPICURU</Option>
                      <Option value="14">5PEL - OLINDINA</Option>
                      <Option value="15">6PEL - PETO</Option>
                      <Option value="16">SOINT</Option>
                    </Select>
                  )}
                />
                {errors.location && (
                  <Typography color="red" className="text-sm mt-1">
                    Location is required
                  </Typography>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                onClick={handleCancel}
                variant="outlined"
                color="gray"
              >
                Cancel
              </Button>
              <Button type="submit" color="green" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default EditWeapon
