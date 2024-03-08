import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "../services/fetchUser";
import "../main.css";
import logo from "../assets/profile.png";
import { format, compareAsc, parseISO } from "date-fns";
import Icon from "../components/icon";
import { ImHammer2 } from "react-icons/im";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaGun } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

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
  const user = results?.data?.user ?? [];

  // const serviceTime: any = user.profile[0]?.serviceTime;
  // const data = format(parseISO(serviceTime), "dd/MM/yyyy");

  // const inicio = format(parseISO(user.Vacation[0]?.startAt), "dd/MM/yyyy");
  // const final = format(parseISO(user.Vacation[0]?.finishAt), "dd/MM/yyyy");
  console.log(user?.profile[0]?.photo.length > 0);

  return (
    <div className="max-w-lg mx-auto my-10 bg-gray-50 dark:bg-slate-700 rounded-lg p-10 shadow-xl">
      <img
        className="w-32 border-slate-600 h-32 rounded-full mx-auto shadow-xl"
        src={
          user.profile[0]?.photo?.lenght > 0 ? logo : user?.profile[0]?.photo
        }
        alt="Profile picture"
      />
      <h2 className="text-center text-2xl dark:text-gray-200 font-semibold mt-3">
        {user.name}
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-200 mt-1">
        {user.posto}
      </p>
      <div className="justify-center flex flex-row mt-3 ">
        <Icon color="bg-gray-200" path="vacation" id={user.id}>
          <ImHammer2 />
        </Icon>
        <Icon color="bg-blue-300" path="vacation" id={user.id}>
          <GiCommercialAirplane />
        </Icon>
        <Icon color="bg-red-300" path="sicknote" id={user.id}>
          <FaUserDoctor />
        </Icon>
        <Icon color="bg-green-300" path="courses/details" id={user.id}>
          <FaBook />
        </Icon>
      </div>
      <div className="flex justify-center mt-5"></div>
      <div className="mt-5 inline-block">
        <h3 className="text-xl dark:text-gray-200 font-semibold">Bio</h3>
        <p className="text-gray-600  dark:text-gray-200 mt-2">
          {user.profile[0]?.bio}
        </p>
      </div>
      <div className="mt-5 inline-block">
        <h3 className="text-sm font-semibold inline-block  dark:text-gray-200">
          Email:{"  "}
        </h3>
        <h3 className="text-gray-600  dark:text-gray-200 mt-2 inline-block ml-1">
          {user.email}
        </h3>
      </div>
      <div className="mt-5 flex-auto">
        <h3 className="text-sm font-semibold inline-block  dark:text-gray-200">
          Matrícula:{"  "}
        </h3>
        <h3 className="text-gray-600  mt-2 inline-block ml-1  dark:text-gray-200">
          {user.mat}
        </h3>
      </div>
      <div className="mt-5 flex-auto">
        <h3 className="text-sm font-semibold inline-block  dark:text-gray-200">
          Admissão:{user.profile[0]?.serviceTime}
        </h3>
        <h3 className="text-gray-600  dark:text-gray-200 mt-2 inline-block ml-1">
          {}
        </h3>
      </div>
      <div className="mt-5 flex-auto">
        <h3 className="text-sm font-semibold inline-block  dark:text-gray-200">
          Telefone:{"  "}
        </h3>
        <h3 className="text-gray-600  dark:text-gray-200 mt-2 inline-block ml-1">
          {user.profile[0]?.phone}
        </h3>
      </div>
      <div className="mt-5 flex-auto">
        <h3 className="text-sm font-semibold inline-block  dark:text-gray-200">
          Endereço:{"  "}
        </h3>
        <h3 className="text-gray-600  dark:text-gray-200 mt-2 inline-block ml-1">
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
