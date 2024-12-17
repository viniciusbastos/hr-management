import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import logo from "../assets/profile.png";
import { format, compareAsc, parseISO } from "date-fns";
import fetchVacation from "../../services/fetchVacation";
import ButtonBack from "../../components/buttonBack";
import GenericList from "../../components/genericList";
import {
  Card,
  Chip,
  List,
  ListItem,
  ListItemSuffix,
} from "@material-tailwind/react";
import Loading from "../../components/loading";

const Courses = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const results = useQuery({
    queryKey: ["vacation", id],
    ...fetchVacation
  });
  if (results.isLoading) {
    return (
      <Loading />
    );
  }
  return (
    <div className="max-w-2xl mx-auto my-10 bg-white dark:bg-blue-gray-700 rounded-lg p-10 shadow-xl">
      <h2 className="text-center text-2xl font-semibold mt-3">Cursos</h2>

      <List>
        <Link to={"/courses/CAS"}>
          <ListItem>
            Curso de Aperfeiçamento de Sargentos
            <ListItemSuffix>
              <Chip
                value="4"
                variant="ghost"
                size="sm"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
        </Link>
        <Link to={"/courses/CEFS"}>
          <ListItem>
            Curso Especial de Formação de Sargentos
            <ListItemSuffix>
              <Chip
                value="1"
                variant="ghost"
                size="sm"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
        </Link>
        <Link to={"/courses/CEFC"}>
          <ListItem>
            Curso Especial de Formação de Cabos
            <ListItemSuffix>
              <Chip
                value="1"
                variant="ghost"
                size="sm"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
        </Link>
        <Link to={"/courses/CVE"}>
          <ListItem>
            Curso de Condutores de Veículos
            <ListItemSuffix>
              <Chip
                value="2"
                variant="ghost"
                size="sm"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
        </Link>
        <Link to={"/courses/CGQ"}>
          <ListItem>
            Curso de Gestão da Qualidade
            <ListItemSuffix>
              <Chip
                value="3"
                variant="ghost"
                size="sm"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
        </Link>
      </List>
      <ButtonBack />
    </div>
  );
};

export default Courses;
