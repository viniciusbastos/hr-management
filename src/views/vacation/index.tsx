import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import logo from "../assets/profile.png";
import { format, compareAsc, parseISO } from "date-fns";
import fetchVacation from "../../services/fetchVacation";
import VacationList from "../../components/genericList";
import ButtonBack from "../../components/buttonBack";
import GenericList from "../../components/genericList";

const Vacation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const results = useQuery(["vacation", id], fetchVacation);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto my-10 bg-white rounded-lg p-10 shadow-xl">
      <h2 className="text-center text-2xl font-semibold mt-3">Férias</h2>

      <p className="text-center text-gray-600 mt-1"></p>
      <ul className="list-outside divide-y divide-gray-100 mt-6">
        <li className=" justify-between gap-x-6 ">
          <GenericList path="./month/1" name="Janeiro" />
        </li>
        <li className=" justify-between gap-x-6">
          <GenericList path="./month/2" name="Fevereiro" />
        </li>
        <li className=" justify-between gap-x-6">
          <GenericList path="./month/3" name="Março" />
        </li>
        <li className=" justify-between gap-x-6">
          <GenericList path="./month/4" name="Abril" />
        </li>
      </ul>
      <ButtonBack />
    </div>
  );
};

export default Vacation;
