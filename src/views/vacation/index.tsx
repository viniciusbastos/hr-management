import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import logo from "../assets/profile.png";
import { format, compareAsc, parseISO } from "date-fns";
import fetchVacation from "../../services/fetchVacation";
import VacationList from "../../components/genericList";
import ButtonBack from "../../components/buttonBack";
import GenericList from "../../components/genericList";
import { Card, CardBody, CardHeader, List, ListItem, Typography } from "@material-tailwind/react";

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
    <Card className="m-10 p-2  rounded-2xl shadow-xl bg-gray-50">
    <CardHeader variant="gradient" mt-4 floated={true} className="bg-caqui-700 p-2 grid h-12 mb-4  place-items-center">
    <Typography variant="h5" color="white" className=" mb-2">
       Plano de Férias
    </Typography>
  </CardHeader>
  <CardBody className="p-6">
      <List className="list-outside divide-y divide-gray-100 mt-6">
        <ListItem className=" justify-between gap-x-6 ">
          <GenericList path="./month/1" name="Janeiro" />
        </ListItem>
        <ListItem className=" justify-between gap-x-6">
          <GenericList path="./month/2" name="Fevereiro" />
        </ListItem>
        <ListItem className=" justify-between gap-x-6">
          <GenericList path="./month/3" name="Março" />
        </ListItem>
        <ListItem className=" justify-between gap-x-6">
          <GenericList path="./month/4" name="Abril" />
        </ListItem>
        <ListItem className=" justify-between gap-x-6">
          <GenericList path="./month/5" name="Maio" />
        </ListItem>
        <ListItem className=" justify-between gap-x-6">
          <GenericList path="./month/6" name="Junho" />
        </ListItem>
        <ListItem className=" justify-between gap-x-6">
          <GenericList path="./month/7" name="Julho" />
        </ListItem>
        <ListItem className=" justify-between">
          <GenericList path="./month/8" name="Agosto" />
        </ListItem>
        <ListItem className=" justify-between gap-x-6">
          <GenericList path="./month/9" name="Setembro" />
        </ListItem>
        <ListItem className=" justify-between gap-x-6">
          <GenericList path="./month/10" name="Outubro" />
        </ListItem>
        <ListItem className=" justify-between gap-x-6">
          <GenericList path="./month/11" name="Novembro" />
        </ListItem>
        <ListItem className=" justify-between gap-x-6">
          <GenericList path="./month/12" name="Dezembro" />
        </ListItem>
      </List>
      <ButtonBack />
    </CardBody>
    </Card>

  );
};

export default Vacation;
