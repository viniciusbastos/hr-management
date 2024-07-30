import { useState } from "react";
import "../main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import config from "../utils/config";
import { format, compareAsc, parseISO } from "date-fns";

const VacationCheck = () => {
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
      .then((response) => {
        setUser(response.data.user[0]);
        console.log(response);
        console.log(response.data.user[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fieldStyle = "flex flex-col mb-2";
  return (
    <div className="bg-gray-50">
      <div className="p-8 mr-32 ml-32 mt-8  bg-white rounded-xl shadow-lg ">
        <div className="w-10/12">
          <div className="w-10/12 text-xl font-medium text-black">
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
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="mat"
                  maxLength={8}
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
          <label className="block"></label>
          <div>
            <h2>Consultar Ferias</h2>
            <p>
              Mat:{user.mat} {"    "}{" "}
            </p>
            <p>
              Nome:{user.posto} {"  "} {user.name}
            </p>
            <p>
              Férias: {"  "} {user.aproved}
              {user.month} {" / "} {user.year}
            </p>
            <p>Período aquisitivo: {user.period}</p>
            <p>Nome:{user.startAt}</p>

            <p>{user.finishAt} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationCheck;
