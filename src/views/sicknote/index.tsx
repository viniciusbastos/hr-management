import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import logo from "../assets/profile.png";
import { format, compareAsc, parseISO } from "date-fns";
import fetchSickNote from "../../services/fetchSickNote";
import ButtonBack from "../../components/buttonBack";
import GenericList from "../../components/genericList";

const Courses = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const results = useQuery(["sicknote", id], fetchSickNote);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto my-10 bg-white rounded-lg p-10 shadow-xl">
      <h2 className="text-center text-2xl font-semibold mt-3">Cursos</h2>

      <p className="text-center text-gray-600 mt-1"></p>
      <ul className="list-outside divide-y divide-gray-100 mt-6">
        <li className="justify-between gap-x-6 ">
          <GenericList
            path="/courses/CAS"
            name="Curso de Aperfeiçamento de Sargento"
          />
        </li>
        <li className="justify-between gap-x-6 ">
          <GenericList
            path="/courses/CEFC"
            name="Curso Especial de Formação de Cabos"
          />
        </li>
      </ul>
      <ButtonBack />
    </div>
  );
};

export default Courses;
