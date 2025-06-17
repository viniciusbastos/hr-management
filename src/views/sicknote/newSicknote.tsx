import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import config from '../../utils/config'
import { useQuery } from '@tanstack/react-query'
import fetchUsers from '../../services/fetchUsers'
import fetchHealthProfessional from '../../services/fetchHealthProfessional'
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
import fetchUsersSelect from '../../services/fetchUsersSelect'

const SicknoteForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm()
  const {
    data: selectuser,
    isLoading,
    isError,
  } = useQuery(['selectuser'], fetchUsersSelect)

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
      const response = await api.post(`/sicknote/`, data)
      toast.update(id, {
        render: 'All is good',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })
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
          Atestados Médicos
        </Typography>
      </CardHeader>
      <ToastContainer autoClose={3000} hideProgressBar />
      <CardBody className="p-6 m-4 relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label>Selecionar Policial</label>
            <Select
              options={selectuser}
              value={
                belongsToId
                  ? selectuser.find((x) => x.value === belongsToId)
                  : belongsToId
              }
              onChange={(option) =>
                belongsToIdOnChange(option ? option.value : option)
              }
              {...restbelongsToId}
            />
          </div>
          <div className="mb-3">
            <Input
              crossOrigin
              label="Quantidade de Dias"
              type="number"
              className="mb-3"
              {...register('Days', { required: true })}
            />
            {/* { errors.name?.type === "required" && <p className="text-sm">The period is required</p>} */}
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="Cid"
              className="mb-6"
              type="text"
              {...register('Cid', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="Nome do Médico/Dentista"
              className="mb-6"
              type="text"
              {...register('DoctorName', { required: true })}
            />
          </div>
          <div className="mb-6 mt-3">
            <Input
              crossOrigin
              label="CRM/CRO"
              className="mb-6"
              type="text"
              {...register('crm', { required: true })}
            />
          </div>
          <input hidden />
          <div className="mb-6 mt-3">
            <label>Data de Início</label>
            <Input
              crossOrigin
              className="block"
              type="datetime-local"
              {...register('InitialDate', { required: true })}
            />
          </div>

          <input hidden />

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

export default SicknoteForm
