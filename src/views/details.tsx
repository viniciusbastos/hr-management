import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "../services/fetchUser";
import "../main.css";
import logo from "../assets/profile.png";
import { format, compareAsc, parseISO } from "date-fns";
import Icon from "../components/icon";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchUser);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  const user = results.data.user;
  // const serviceTime: any = user.profile[0]?.serviceTime;
  // const data = format(parseISO(serviceTime), "dd/MM/yyyy");

  // const inicio = format(parseISO(user.Vacation[0]?.startAt), "dd/MM/yyyy");
  // const final = format(parseISO(user.Vacation[0]?.finishAt), "dd/MM/yyyy");

  return (
    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg p-10 shadow-xl">
      <img
        className="w-32 h-32 rounded-full mx-auto"
        src={logo}
        alt="Profile picture"
      />
      <h2 className="text-center text-2xl font-semibold mt-3">{user.name}</h2>
      <p className="text-center text-gray-600 mt-1">{user.posto}</p>
      <div className="justify-center flex flex-row mt-3 ">
        <Icon color="indigo" path="vacation" id={user.id} />
        <Icon color="sky" path="vacation" id={user.id} />
        <Icon color="sky" path="vacation" id={user.id} />
        <Icon color="blue" path="details" id={user.id} />
      </div>
      <div className="flex justify-center mt-5"></div>
      <div className="mt-5 inline-block">
        <h3 className="text-xl font-semibold">Bio</h3>
        <p className="text-gray-600 mt-2">{user.profile[0]?.bio}</p>
      </div>
      <div className="mt-5 inline-block">
        <h3 className="text-sm font-semibold inline-block">Email:{"  "}</h3>
        <h3 className="text-gray-600 mt-2 inline-block ml-1">{user.email}</h3>
      </div>
      <div className="mt-5 flex-auto">
        <h3 className="text-sm font-semibold inline-block">Matrícula:{"  "}</h3>
        <h3 className="text-gray-600 mt-2 inline-block ml-1">{user.mat}</h3>
      </div>
      <div className="mt-5 flex-auto">
        <h3 className="text-sm font-semibold inline-block">Admissão:{"  "}</h3>
        <h3 className="text-gray-600 mt-2 inline-block ml-1">{}</h3>
      </div>
      <div className="mt-5 flex-auto">
        <h3 className="text-sm font-semibold inline-block">Telefone:{"  "}</h3>
        <h3 className="text-gray-600 mt-2 inline-block ml-1">
          {user.profile[0]?.phone}
        </h3>
      </div>
      <div className="mt-5 flex-auto">
        <h3 className="text-sm font-semibold inline-block">Endereço:{"  "}</h3>
        <h3 className="text-gray-600 mt-2 inline-block ml-1">
          {user.profile[0]?.adress}
          {", "} {user.profile[0]?.neighborhood}
          {", "}
          {user.profile[0]?.city}
          {", "}
          {user.profile[0]?.state}
        </h3>
      </div>
    </div>
  );
};

export default Details;
