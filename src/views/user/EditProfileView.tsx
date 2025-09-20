import { useEffect, useContext } from 'react'
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
import { AuthContext } from '../../contexts/authContext'
import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '../../services/fetchUsers'
import { api } from '../../services/api'
import axios from 'axios'

const EditProfileView = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('EditProfileView must be used within an AuthProvider')
  }
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id!),
    enabled: !!id,
    select: (data) => data.user,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      posto: '',
      phone: '',
      role: '',
      address: '',
    },
  })

  useEffect(() => {
    if (user) {
      setValue('name', user.name || '')
      setValue('email', user.email || '')
      setValue('posto', user.posto || '')
      setValue('phone', user.profile[0].phone || '')
      setValue('role', user.role || '')
      setValue('address', user.address || '')
    }
  }, [user, setValue])

  const onSubmit = async (data: any) => {
    if (!id) return

    try {
      await api.put(`/edituser/${id}`, data)
      toast.success('Profile updated successfully!')
      navigate('/usermanager')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    }
  }

  const handleCancel = () => {
    navigate('/usermanager')
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
            Edit Profile
          </Typography>
        </CardHeader>

        <ToastContainer autoClose={3000} hideProgressBar />

        <CardBody className="p-6 m-4 relative">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Typography color="gray" className="text-sm mb-2">
                  Name
                </Typography>
                <Input
                  crossOrigin=""
                  {...register('name', { required: true })}
                  label="Full Name"
                  className="mb-3"
                  defaultValue={user?.name}
                />
                {errors.name && (
                  <Typography color="red" className="text-sm mt-1">
                    Name is required
                  </Typography>
                )}
              </div>

              <div>
                <Typography color="gray" className="text-sm mb-2">
                  Email
                </Typography>
                <Input
                  crossOrigin=""
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  label="Email Address"
                  type="email"
                  className="mb-3"
                  defaultValue={user?.email}
                />
                {errors.email && (
                  <Typography color="red" className="text-sm mt-1">
                    {errors.email.message || 'Email is required'}
                  </Typography>
                )}
              </div>

              <div>
                <Typography color="gray" className="text-sm mb-2">
                  Rank/Posto
                </Typography>
                <Controller
                  name="posto"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={user?.posto}
                  render={({ field }) => (
                    <Select {...field} label="Rank or Posto">
                      <Option value="MAJ PM">MAJ PM</Option>
                      <Option value="CAP PM">CAP PM</Option>
                      <Option value="TEN PM">TEN PM</Option>
                      <Option value="ST PM">ST PM</Option>
                      <Option value="SGT PM">SGT PM</Option>
                      <Option value="CB PM">CB PM</Option>
                      <Option value="SD PM">SD PM</Option>
                    </Select>
                  )}
                />
                {errors.posto && (
                  <Typography color="red" className="text-sm mt-1">
                    Rank/Posto is required
                  </Typography>
                )}
              </div>

              <div>
                <Typography color="gray" className="text-sm mb-2">
                  Phone
                </Typography>
                <Input
                  crossOrigin=""
                  {...register('phone')}
                  label="Phone Number"
                  className="mb-3"
                  defaultValue={user?.profile[0].phone}
                />
              </div>

              <div>
                <Typography color="gray" className="text-sm mb-2">
                  Role
                </Typography>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={user?.role}
                  render={({ field }) => (
                    <Select {...field} label="Role">
                      <Option value="ADMIN">ADMIN</Option>
                      <Option value="USER">USER</Option>
                      <Option value="USER_ALMOX">USER_ALMOX</Option>
                    </Select>
                  )}
                />
                {errors.role && (
                  <Typography color="red" className="text-sm mt-1">
                    Role is required
                  </Typography>
                )}
              </div>

              <div className="md:col-span-2">
                <Typography color="gray" className="text-sm mb-2">
                  Address
                </Typography>
                <Input
                  crossOrigin=""
                  {...register('address')}
                  label="Address"
                  className="mb-3"
                  defaultValue={user?.address}
                />
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

export default EditProfileView
