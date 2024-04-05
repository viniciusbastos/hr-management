import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import config from "../../utils/config";
import { useQuery } from "@tanstack/react-query";
import fetchUsers from "../../services/fetchUsers";
import fetchHealthProfessional from "../../services/fetchHealthProfessional";
import Select from 'react-select'

import { Button, Card, CardBody, CardHeader, Checkbox, Input, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { useForm, useController, FieldValues } from "react-hook-form";
import fetchUsersSelect from "../../services/fetchUsersSelect";

const Appointment = () => {
  

  const { register, handleSubmit, control, formState: { errors, isValid } } = useForm();
  const result = useQuery(["users"], fetchUsersSelect);
  const { field: { value: belongsToId, onChange: belongsToIdOnChange, ...restbelongsToId } } = useController({ name: 'belongsToId', control });

  
  //  const onSubmit = (data: FieldValues) => {
  //         console.log(data)
  //         const id = toast.loading("Please wait...")            
  //         try {
         
  //           // const response = await api.post(`/vacation/`, obj);
  //           // console.log(response)
  //           // toast.update(id, { render: "All is good", type: "success", isLoading: false, autoClose: 5000 });
  //           }
             
  //        catch (error) {
  //               console.error(error);
  //               console.log('erro')
  //               toast.update(id, { render: "Error", type: "error", isLoading: false, autoClose: 5000 });

  //           }
              
              
  // }
  return (
    <Card className="m-10 p-2  rounded-2xl shadow-xl">
    <CardHeader variant="gradient" mt-4 floated={true} className="bg-caqui-700 p-2 grid h-12 mb-4  place-items-center">
    <Typography variant="h5" color="white" className=" mb-2">
       Lançamento de Férias
    </Typography>
  </CardHeader>
    <ToastContainer  autoClose={3000} hideProgressBar />
    <CardBody className="p-6">
          <form
            onSubmit={handleSubmit(data => console.log(data))}
          >
            <div className="mb-3">
            <label>Selecionar Policial</label>
            <Select  
              options={result.data}
              value={belongsToId ? result.data.find(x => x.value === belongsToId) : belongsToId}
             onChange={option => belongsToIdOnChange(option ? option.value : option)}
             {...restbelongsToId}
              />
            </div>
            <div className="mb-3">
              <Input
                crossOrigin
                label="Serviço"
                className="mb-3"
                {...register('service', {required: true})}
              />
              {/* { errors.name?.type === "required" && <p className="text-sm">The period is required</p>} */}
            </div>
            <div className="mb-3">

              <Checkbox
              crossOrigin
                label="Serviço Realizado?"
                {...register('progress')}

              />
            
            </div>
              <Input
                crossOrigin
                label="Mês"
                className="mb-6"
                type="int"
                {...register('month')}

              />
            <div className="mb-6 mt-3">
              <label>Data de Inicio</label>
              <Input
              crossOrigin
                className="block"  
                type="datetime-local"
                {...register('startAt')}
              />
            </div>
            <div className="mb-3 mt-3">
              <label>Data do Término</label>
              <Input
              crossOrigin
              className="block"  
                type="datetime-local"
                {...register('finishAt')}
              />
            </div>

            <Button
              disabled={!isValid}
              type="submit"
              color="green">
              
              Enviar
            </Button>
          </form>
      </CardBody>
    </Card>
  );
};


export default Appointment;
