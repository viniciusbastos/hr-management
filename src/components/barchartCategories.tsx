import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { GlobeAmericasIcon } from "@heroicons/react/24/outline";

const chartConfig = {
  series: [44, 55, 13, 43, 22],
  options: {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};

export default function BarChartTakeCareGuardianCategorie() {
  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg p-5 text-white bg-green-400">
          <GlobeAmericasIcon className="h-6 w-6 bg-green-400" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Policiais Militares da 6ªCIPM impactados pelo Projeto 2023 x 2024
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
