import { useState } from "react";
import "../main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    axios
      .post(`http://localhost:3001/signin`, {
        email,
        password,
      })
      .then(function (response) {
        const token = response.data;
        localStorage.setItem("authorization", response.data.token);
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      })
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
              method="post"
              className="w-full items-center ml-18"
              onSubmit={(e) => {
                e.preventDefault();
                postData();
              }}
            >
              <div className="flex flex-auto flex-col w-full">
                <label className="block">
                  <span className="text-gray-500 text-sm">email</span>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black mb-4 flex-auto"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-500 text-sm">email</span>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
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

export default SignIn;
