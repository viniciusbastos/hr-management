import { useState } from "react";
import "../main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import config from "../utils/config";
import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react";
import { Alert } from "@material-tailwind/react";
 


const Teste = () => {
  const [vacation, setVacation] = useState({
    period: "",
    finishAt: "",
    startAt: "",
    belongsToId: "",
    year: "",
    month: "",
  });
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [mat, setMat] = useState("");
  const [period, setPeriod] = useState("");
  const [finishAt, setFinishAt] = useState("");
  const [startAt, setStartAt] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const postData = () => {
    api
      .get(`/user/search/${mat}`, config)
      .then(function (response) {
        setUser(response.data.user[0]);
        console.log(response)
        console.log(response.data.user[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fieldStyle = "flex flex-col mb-2";
  return (
    <Card className="m-10 p-2  rounded-2xl shadow-xl bg-gray-50">
        <CardHeader variant="gradient" mt-4 floated={true} className="bg-caqui-700 p-2 grid h-12 mb-4  place-items-center">
        <Typography variant="h5" color="white" className=" mb-2">
          Lançamento de Férias
        </Typography>
      </CardHeader>
      <CardBody className="p-6">
          <div className="m-2 w-10/12 text-xl font-medium text-black">
            <form
              method="post"
              className="w-full items-center flex"
              onSubmit={(e) => {
                e.preventDefault();
                postData();
              }}
            >
              <label className="sr-only">Search</label>
              <div className="relative w-full">
           
                <input
                  type="text"
                  name="mat"
                  onChange={(e) => setMat(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Pesquisar Policial"
                  required
                />
                <button
                  type="button"
                  className="flex absolute inset-y-0 right-0 items-center pr-3"
                >
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="mr-2  w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
          <div className="mb-3 mt-3">
              <Input
                variant="standard" 
                label="Nome" 
                placeholder="Nome"
                size="sm"
                disabled
                name="period"
                value={user.posto + " " + user.name}
              />
            </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const obj = {
                period: period,
                startAt: startAt,
                finishAt: finishAt,
                belongsToId: user.id,
                year: year,
                month: month,
              };
              api
                .post(`/vacation/`, obj, config)
                .then(function (response) {
                  <Alert>A simple alert for showing message.</Alert>;
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            <div className={fieldStyle}>
              <Input
                variant="standard" 
                label="Período" 
                placeholder="período"
                size="md"
                name="period"
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              />
            </div>
            <div className={fieldStyle}>
              <Input
              variant="standard" 
              label="Ano" 
              placeholder="Ano"
              size="md"
                name="year"
                type="int"
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className={fieldStyle}>
              <Input
              variant="standard" 
              label="Mês" 
              placeholder="Mês"
              size="md"
                name="month"
                type="int"
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
            <div className={fieldStyle}>
              <Input
              variant="standard" 
              label="Mês" 
              placeholder="Mês"
              size="md"
                name="startAt"
                type="datetime-local"
                onChange={(e) => setStartAt(e.target.value)}
              />
            </div>
            <div className={fieldStyle}>
              <label>Data do Término</label>
              <input
                name="finishAt"
                type="datetime-local"
                onChange={(e) => setFinishAt(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              
            >
              Enviar
            </Button>
          </form>
          </CardBody>
    </Card>
  );
};

export default Teste;
