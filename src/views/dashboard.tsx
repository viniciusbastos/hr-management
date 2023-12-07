import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "../services/fetchUser";
import "../main.css";
import CardDashboard from "../components/cardDashboard";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import TableQuantityPosto from "../components/tableQuantityPosto";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authorization")}`,
    },
  };
  useEffect(() => {
    api.get("/user", config).then((response) => {
      setUsers(response.data);
      console.log();
    });
  }, []);

  return (
    <>
      <div className="bg-stone-200 h-full ">
        <div className="flex flex-row">
          <div className="flex-auto mr-6 ml-6">
            <CardDashboard
              title={"Total"}
              quant={users.length}
              info={"Policiais Militares"}
            />
          </div>
          <div className="flex-auto mr-6 ml-6">
            <CardDashboard
              title={"Férias"}
              quant={20}
              info={"Policiais Militares"}
            />
          </div>
          <div className="flex-auto mr-6 ml-6">
            <CardDashboard
              title={"Cursos"}
              quant={3}
              info={"Policiais Militares"}
            />
          </div>
        </div>
        <TableQuantityPosto />
      </div>
    </>
  );
};

export default Dashboard;
