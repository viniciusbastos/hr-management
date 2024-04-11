import { useQuery } from "@tanstack/react-query";
import CardDashboard from "../../components/cardDashboard";
import TableQuantityPosto from "../../components/tableQuantityPosto";
import fetchUsers from "../../services/fetchUsers";
import BarChart from "../../components/barchart";
import BarChartTakeCareGuardian from "../../components/barcharttakingcareofguardian";
import BarChartTakeCareGuardianCategorie from "../../components/barchartCategories";
import fechAppointments from "../../services/fetchAppointments";

const DashboardTakeCareGuardian = () => {
  const appointments = useQuery(["appointments"], fechAppointments);

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
        <div className="p-4 xl:m-auto">
          <div className="mb-12  gap-y-4 gap-x-8 grid-cols-1 grid md:grid-cols-3 xl:grid-cols-3  flex-col ">
            <div className="bg-white">
              <CardDashboard
                link="/home"
                title={'Atendimentos Realizados'}
                quant={appointments.data.length}
                info={'no Ano'}
              />
            </div>
            <div className="    bg-white    ">
              <CardDashboard
                link="/vacation/month/1"
                title={'Especialidades'}
                quant={10}
                info={'Ofertadas aos Policias da 6ªCIPM'}
              />
            </div>
            <div className="    bg-white    ">
              <CardDashboard
                link="/courses"
                title={'Palestras Realizadas'}
                quant={1}
                info={'no último ano'}
              />
            </div>
          </div>
          <div className="h-full">
            <BarChartTakeCareGuardian />
            <BarChartTakeCareGuardianCategorie />
          </div>
        </div>
      </div>
    </>
  )
};

export default DashboardTakeCareGuardian;
