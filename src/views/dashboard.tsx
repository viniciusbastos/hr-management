import { useQuery } from "@tanstack/react-query";
import "../main.css";
import CardDashboard from "../components/cardDashboard";
import TableQuantityPosto from "../components/tableQuantityPosto";
import fetchUsers from "../services/fetchUsers";
import BarChart from "../components/barchart";
import { Spinner } from "@material-tailwind/react";

const Dashboard = () => {
  const results = useQuery(["vacation"], fetchUsers);
  if (results.isLoading) {
    return (
      <div className="loading-pane"> 
         <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-700   h-full ">
        <div className="p-4 xl:m-auto">
          <div className="mb-12  gap-y-4 gap-x-8 grid-cols-1 grid md:grid-cols-2 xl:grid-cols-4  flex-col ">
            <div className="bg-white">
              <CardDashboard
                link="/home"
                title={"Efetivo"}
                quant={results.data.length}
                info={"Policiais Militares"}
              />
            </div>
            <div className="    bg-white    ">
              <CardDashboard
                link="/vacation/month/1"
                title={"Férias"}
                quant={8}
                info={"Policiais Militares"}
              />
            </div>
            <div className="    bg-white    ">
              <CardDashboard
                link="/courses"
                title={"Cursos"}
                quant={0}
                info={"Policiais Militares"}
              />
            </div>
            <div className="    bg-white    ">
              <CardDashboard
                link="/courses"
                title={"Licenças"}
                quant={0}
                info={"Policiais Militares"}
              />
            </div>
          </div>
          <TableQuantityPosto />
          <div className="h-full">

          <BarChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
