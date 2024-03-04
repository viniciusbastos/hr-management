import { FormEvent, useContext, useState } from "react";
import "../main.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import loginImage from "../assets/login.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    await signIn(data);
  }

  return (
    <div className="bg-gray-800 flex justify-center items-center h-screen">
      <div className="w-4/5 h-screen hidden lg:block">
        <img
          src={loginImage}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4 text-gray-200">Login</h1>
        <form
          method="post"
          className="w-full items-center ml-18"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-auto flex-col w-full">
            <label className="block">
              <span className="text-gray-200 text-sm">email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black mb-4 flex-auto"
              />
            </label>
            <label className="block">
              <span className="text-gray-200 text-sm">senha</span>
              <input
                required
                type="password"
                value={password}
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
  );
};

export default SignIn;
