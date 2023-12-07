import { useState } from "react";
import "../main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mat, setMat] = useState("");
  const [posto, setPosto] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const postData = () => {
    axios
      .post(`http://localhost:3001/api/product`, {
        name,
        mat,
        posto,
        username,
        email,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="bg-gray-50">
      <div className="p-8 mr-32 ml-32 mt-8  bg-white rounded-xl shadow-lg">
        <div className="w-10/12">
          <div className="w-10/12 text-xl font-medium text-black">
            <form
              className="w-full items-center ml-18"
              onSubmit={(e) => {
                e.preventDefault();
                postData();
                navigate("/home");
              }}
            >
              <div className="flex flex-auto flex-col w-full">
                <div className="w-full">
                  <span className="text-gray-500 text-sm">Nome</span>

                  <input
                    className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 mb-4shadow form-input appearance-none  rounded  py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    id="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <span className="text-gray-500 text-sm">Matrícula</span>

                <input
                  className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 mb-4shadow form-input appearance-none  rounded  py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                  id="mat"
                  type="text"
                  onChange={(e) => setMat(e.target.value)}
                />
                <span className="text-gray-500 text-sm">Posto/Grad</span>

                <input
                  className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 mb-4shadow form-input appearance-none  rounded  py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                  id="posto"
                  type="text"
                  onChange={(e) => setPosto(e.target.value)}
                />
                <span className="text-gray-500 text-sm">Nome de Guerra</span>

                <input
                  type="text"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 mb-4"
                />
                <label className="block">
                  <span className="text-gray-500 text-sm">email</span>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black mb-4 flex-auto"
                  />
                </label>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUser;
