import { useQuery } from "@tanstack/react-query";
import "../main.css";
import CardDashboard from "../components/cardDashboard";
import TableQuantityPosto from "../components/tableQuantityPosto";
import fetchUsers from "../services/fetchUsers";

const Dashboard = () => {
  const results = useQuery(["vacation"], fetchUsers);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-700   h-full ">
        <div className="p-4 xl:ml-40">
          <div className="mb-12  gap-y-4 gap-x-8 md:grid-cols-2 xl:grid-cols-4 flex flex-row ">
            <div className="    bg-white    ">
              <CardDashboard
                link="/home"
                title={"Total"}
                quant={results.data.length}
                info={"Policiais Militares"}
              />
            </div>
            <div className="    bg-white    ">
              <CardDashboard
                link="/vacation/month/1"
                title={"Férias"}
                quant={9}
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
          </div>
          <TableQuantityPosto />
          
        </div>
      </div>
    </>
  );
};

export default Dashboard;
