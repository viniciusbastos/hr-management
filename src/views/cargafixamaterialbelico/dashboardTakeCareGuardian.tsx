import { useQuery } from "@tanstack/react-query";
import CardDashboard from "../../components/cardDashboard";
import fetchUsers from "../../services/fetchUsers";
import BarChartTakeCareGuardian from "../../components/barcharttakingcareofguardian";
import BarChartTakeCareGuardianCategorie from "../../components/barchartCategories";
import fechAppointments from "../../services/fetchAppointments";
import Loading from "../../components/loading";

const DashboardTakeCareGuardian = () => {
  const appointments = useQuery(["appointments"], fechAppointments);

  const results = useQuery(["vacation"], fetchUsers);
  console.log(results)
  if (appointments.isLoading) {
    return (
      <Loading />
    );
  }
  if (appointments.isError) return <p>Error: {appointments.isError}</p>;
  if (!appointments.data) return <p>No data available</p>;
  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-700   h-full ">
        <div className="p-4 xl:m-auto">
          <div className="mb-12  gap-y-4 gap-x-8 grid-cols-1 grid md:grid-cols-3 xl:grid-cols-3  flex-col ">
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-xl">
              <CardDashboard
                link="/home"
                title={'Atendimentos Realizados'}
                quant={appointments.data.length}
                info={'no Ano'}
              />
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-xl">
              <CardDashboard
                link="/vacation/month/1"
                title={'Especialidades'}
                quant={10}
                info={'Ofertadas aos Policias da 6ªCIPM'}
              />
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-xl">
              <CardDashboard
                link="/courses"
                title={'Palestras Realizadas'}
                quant={1}
                info={'no último ano'}
              />
            </div>
          </div>
          <div className="h-full bg-white dark:bg-gray-700 rounded-xl shadow-xl">
            <BarChartTakeCareGuardian />
          </div>
        </div>
      </div>
    </>
  )
};

export default DashboardTakeCareGuardian;
