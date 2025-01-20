import { useQuery } from '@tanstack/react-query'
import '../main.css'
import CardDashboard from '../components/cardDashboard'
import TableQuantityPosto from '../components/tableQuantityPosto'
import fetchUsers from '../services/fetchUsers'
import BarChart from '../components/barchart'
import Loading from '../components/loading'
import { useEffect, useState } from 'react'
import { useUsers } from '../components/tablematerial'

const Dashboard = () => {
  const { data: users, isLoading, isError, error } = useUsers()

  if (isLoading) {
    const token = localStorage.getItem('token')

    return <Loading />
  }
  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-700   h-full ">
        <div className="p-4 xl:m-auto">
          <div className="mb-12  gap-y-4 gap-x-8 grid-cols-1 grid md:grid-cols-2 xl:grid-cols-4  flex-col ">
            <div className=" rounded-xl shadow-xl">
              <CardDashboard
                link="/users"
                title={'Efetivo'}
                quant={users?.length}
                color="bg-white"
                darkColor="bg-slate-600"
                info={'Policiais Militares'}
              />
            </div>
            <div className=" rounded-xl shadow-xl">
              <CardDashboard
                link="/vacation/month/1/2025"
                title={'Férias'}
                quant={10}
                color="bg-white"
                darkColor="bg-slate-600"
                info={'Policiais Militares'}
              />
            </div>
            <div className=" rounded-xl shadow-xl">
              <CardDashboard
                link="/courses"
                title={'Cursos'}
                quant={2}
                color="bg-white"
                darkColor="bg-slate-600"
                info={'Policiais Militares'}
              />
            </div>
            <div className=" rounded-xl shadow-xl">
              <CardDashboard
                link="/courses"
                title={'Licenças'}
                quant={2}
                color="bg-white"
                darkColor="bg-slate-600"
                info={'Policiais Militares'}
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
  )
}

export default Dashboard
