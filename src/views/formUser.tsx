import { useState } from "react";
import '../main.css'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { ToastContainer, toast } from 'react-toastify'
import { useForm, useController, type FieldValues } from 'react-hook-form'
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
} from '@material-tailwind/react'

const FormUser = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm()
  const [name, setName] = useState('')
  const [mat, setMat] = useState('')
  const [posto, setPosto] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const onSubmit = async (data: FieldValues) => {
    const id = toast.loading('Please wait...')

    try {
      const response = await api.post(`/user`, {
        name,
        mat,
        posto,
        email,
      })
      console.log(response)
      toast.update(id, {
        render: 'All is good',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })
      reset()
    } catch {
      console.error(errors)
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
          Cadastrar novo PM
        </Typography>
      </CardHeader>
      <ToastContainer autoClose={3000} hideProgressBar />
      <CardBody className="p-6 m-4 relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-auto flex-col w-full">
            <div className="w-full">
              <span className="text-gray-500 text-sm">Nome</span>

              <input
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 mb-4shadow form-input appearance-none  rounded  py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                type="text"
                {...register('name', { required: true })}
              />
            </div>

            <span className="text-gray-500 text-sm">Matrícula</span>

            <input
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 mb-4shadow form-input appearance-none  rounded  py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="text"
              {...register('mat', { required: true })}
            />
            <span className="text-gray-500 text-sm">Posto/Grad</span>

            <input
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 mb-4shadow form-input appearance-none  rounded  py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="text"
              {...register('posto', { required: true })}
            />

            <label className="block">
              <span className="text-gray-500 text-sm">email</span>
              <input
                type="email"
                {...register('name', { required: true })}
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black mb-4 flex-auto"
              />
            </label>
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={!isValid}
            >
              Submit
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default FormUser


