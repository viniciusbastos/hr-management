import { useState } from "react";
import "../main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import config from "../utils/config";
import { useQuery } from "@tanstack/react-query";
import fetchUsers from "../services/fetchUsers";
import Select from "react-select";
import fetchUsersSelect from "../services/fetchUsersSelect";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import {
  Controller,
  type FieldValues,
  useController,
  useForm,
} from "react-hook-form";
import fetchWeaponSelect from "../services/fetchWeaponSelect";

const FormWeapon = () => {
  interface serialNumber {
    value: string;
    label: string;
  }
  interface belongsToId {
    value: string;
    label: string;
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  console.log(errors);
  const navigate = useNavigate();
  const result = useQuery(["users"], fetchUsersSelect);
  const {data: weapon} = useQuery(["weapon"], fetchWeaponSelect);
 console.log(weapon)

  const {
    field: {
      value: belongsToId,
      onChange: belongsToIdOnChange,
      ...restbelongsToId
    },
  } = useController({ name: "belongsToId", control });
  const {
    field: {
      value: serialNumber,
      onChange: serialNumberOnChange,
      ...restserialNumber
    },
  } = useController({ name: "serialNumber", control });

  const onSubmit = async (data: FieldValues) => {
    const id = toast.loading("Please wait...");
    try {
      const response = await api.post(`/weapons/fixed`, data);
      console.log(response);
      toast.update(id, {
        render: "All is good",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      reset();
    } catch (error) {
      console.error(error);
      console.log("erro");
      toast.update(id, {
        render: "Error",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };
  return (
    <Card className="m-10 p-2  rounded-2xl shadow-xl">
      <CardHeader
        variant="gradient"
        mt-4
        floated={true}
        className="bg-caqui-700 p-2 grid h-12 mb-4  place-items-center"
      >
        <Typography variant="h5" color="white" className=" mb-2">
          Cadastrar Carga Fixa
        </Typography>
      </CardHeader>
     <ToastContainer autoClose={3000} hideProgressBar />
      <CardBody className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label>Selecionar Policial</label>
            <Select
              options={result.data}
              value={
                belongsToId
                  ? result.data.find((x) => x.value === belongsToId)
                  : belongsToId
              }
              onChange={(option) =>
                belongsToIdOnChange(option ? option.value : option)
              }
              {...restbelongsToId}
            />
          </div>
          
          <div className="mb-3">
            <label>Selecionar Arma</label>
            <Select
              options={weapon}
              value={
                serialNumber
                  ? weapon.find((x) => x.value === serialNumber)
                  : serialNumber
              }
              onChange={(option) =>
                serialNumberOnChange(option ? option.value : option)
              }
              {...restserialNumber}
            />
          </div>
             
          <div className="mb-6 mt-3">
            <label>Data de Inicio</label>
            <Input
              crossOrigin
              className="block"
              type="datetime-local"
              {...register("InitialDate")}
            />
          </div>
          

          <Button type="submit" color="green">
            Enviar
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default FormWeapon;
