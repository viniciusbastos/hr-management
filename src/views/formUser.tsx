import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import config from '../utils/config'
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
import { useForm, useController, type FieldValues } from 'react-hook-form'
import { FaCopy } from 'react-icons/fa6'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

const FormUser = () => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm()
  const {
    field: {
      value: belongsToId,
      onChange: belongsToIdOnChange,
      ...restbelongsToId
    },
  } = useController({ name: 'belongsToId', control })

  const onSubmit = async (data: FieldValues) => {
    const id = toast.loading('Please wait...')
    try {
      const response = await api.post(`/user/`, data)
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
    <Card className="m-10 p-2  rounded-2xl shadow-xl">
      <CardHeader
        variant="gradient"
        mt-4
        floated={true}
        className="bg-caqui-700 p-2 grid h-12 mb-4  place-items-center"
      >
        <Typography variant="h5" color="white" className=" mb-2">
          Cadastro de Novos Usuários
        </Typography>
      </CardHeader>
      <ToastContainer autoClose={3000} hideProgressBar />
      <CardBody className="p-6 m-4 relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Input
              crossOrigin
              label="Nome Completo"
              className="mb-3"
              {...register('name', { required: true })}
            />
            {/* { errors.name?.type === "required" && <p className="text-sm">The period is required</p>} */}
          </div>

          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="matricula"
              className="mb-6"
              type="text"
              {...register('mat', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="Posto/Graduação"
              className="mb-6"
              type="text"
              {...register('posto', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="email"
              className="mb-6"
              type="email"
              {...register('useremail', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="phone"
              className="mb-6"
              type="phone"
              {...register('phone', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="address"
              className="mb-6"
              type="address"
              {...register('address', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="city"
              className="mb-6"
              type="city"
              {...register('city', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="city"
              className="mb-6"
              type="city"
              {...register('city', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="state"
              className="mb-6"
              type="state"
              {...register('state', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="cpf"
              className="mb-6"
              type="cpf"
              {...register('cpf', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="serviceTime"
              className="mb-6"
              type="serviceTime"
              {...register('serviceTime', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="birthDate"
              className="mb-6"
              type="birthDate"
              {...register('birthDate', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="workPlace"
              className="mb-6"
              type="workPlace"
              {...register('workPlace', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="neighborhood"
              className="mb-6"
              type="neighborhood"
              {...register('neighborhood', { required: true })}
            />
          </div>

          <div className="mt-3 mb-6 relative bottom-0 right-0 ">
            <Button disabled={!isValid} type="submit" color="green">
              Enviar
            </Button>
          </div>
        </form>
      </CardBody>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="space-x-4">
          {/* Update Button */}
          <button className="relative px-6 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-500 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 group flex items-center">
            <FaEdit className="mr-2" />
            <span className="invisible group-hover:visible">Update</span>
          </button>

          {/* Delete Button */}
          <button className="relative px-6 py-2 text-sm font-medium text-red-700 bg-white border border-red-500 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 group flex items-center">
            <FaTrashAlt className="mr-2" />
            <span className="invisible group-hover:visible">Delete</span>
          </button>

          {/* Copy Button */}
          <button className="relative px-6 py-2 text-sm font-medium text-green-700 bg-white border border-green-500 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300 group flex items-center">
            <FaCopy className="mr-2" />
            <span className="invisible group-hover:visible">Copy</span>
          </button>
        </div>
      </div>
    </Card>
  )
}

export default FormUser
