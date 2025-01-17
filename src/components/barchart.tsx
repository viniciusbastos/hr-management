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
      data: [15, 6, 14, 8, 7, 12, 13, 7, 8, 12, 18, 22],
    },
    {
      name: '2023',
      data: [0, 0, 0, 0, 9, 10, 13, 7, 8, 12, 18, 22],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: 'Policiais Militares de Férias por mês',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#5d5953', '#000000'],
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
      show: false,
      borderColor: '#dddddd',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
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

export default function BarChart() {
  return (
    <Card className="dark:bg-slate-600">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <GlobeAmericasIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="dark:text-slate-300 "
          >
            Policiais Militares de Férias por mês no ano de 2024
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0 dark:text-slate-200">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  )
}
