import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react'
import Chart from 'react-apexcharts'
import { GlobeAmericasIcon } from '@heroicons/react/24/outline'

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartConfig = {
  type: 'bar',
  height: 240,
  series: [
    {
      name: '2024',
      data: [0, 0, 11, 38, 16, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: 'Policiais Militares da 6ªCIPM impactados pelo Projeto 2023 x 2024',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#2ea65e', '#000000'],
    plotOptions: {
      bar: {
        columnWidth: '40%',
        borderRadius: 2,
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
      categories: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: '#dddddd',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: 'dark',
    },
  },
}

export default function BarChartTakeCareGuardian() {
  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center dark:bg-blue-gray-600"
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
      <CardBody className="px-2 pb-0 dark:bg-blue-gray-600">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  )
}
