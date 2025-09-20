import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '../../services/fetchUsers'
import logo from '../../assets/profile.png'
import { format, compareAsc, parseISO } from 'date-fns'
import Icon from '../../components/icon'
import { ImHammer2 } from 'react-icons/im'
import { GiCommercialAirplane } from 'react-icons/gi'
import { FaGun } from 'react-icons/fa6'
import { FaBook } from 'react-icons/fa'
import { FaUserDoctor } from 'react-icons/fa6'
import ButtonBack from '../../components/buttonBack'
import { Breadcrumbs } from '@material-tailwind/react'

const Details = () => {
  const { id } = useParams()
  const results = useQuery(['details', id], () => fetchUser(id))
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    )
  }
  const user = results?.data?.user ?? []
  console.log(user)

  // const serviceTime: any = user.profile[0]?.serviceTime;
  // const data = format(parseISO(serviceTime), "dd/MM/yyyy");

  // const inicio = format(parseISO(user.Vacation[0]?.startAt), "dd/MM/yyyy");
  // const final = format(parseISO(user.Vacation[0]?.finishAt), "dd/MM/yyyy");

  return (
    <>
      <Breadcrumbs>
        <Link to="/dashboard" className="opacity-60">
          Home
        </Link>
        <Link to="/users" className="opacity-60">
          User
        </Link>
        <a href="#">Breadcrumbs</a>
      </Breadcrumbs>
      <div className="max-w-lg mx-auto my-10 bg-gray-50 dark:bg-slate-700 rounded-lg p-10 shadow-xl">
        <img
          className="w-32 border-slate-600 h-32 rounded-full mx-auto shadow-xl"
          src={
            user.profile[6]?.photo?.lenght > 0 ? logo : user?.profile[0]?.photo
          }
          alt="Profile picture"
        />
        <h2 className="text-center text-2xl dark:text-gray-200 font-semibold mt-3">
          {user.name}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-200 mt-1">
          {user.posto}
        </p>
        <div className="justify-center flex flex-row mt-3 ">
          <Icon color="bg-gray-200" path="vacation" id={user.id}>
            <ImHammer2 />
          </Icon>
          <Icon color="bg-blue-300" path="vacation" id={user.id}>
            <GiCommercialAirplane />
          </Icon>
          <Icon color="bg-red-300" path="sicknote" id={user.id}>
            <FaUserDoctor />
          </Icon>
          <Icon color="bg-green-300" path="courses/details" id={user.id}>
            <FaBook />
          </Icon>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://api.whatsapp.com/send?phone=${user.profile[0]?.phone}`}
          >
            <Icon color="bg-green-300" id={user.id}>
              <svg
                fill="#000000"
                height="20px"
                width="20px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 308 308"
              >
                <g id="XMLID_468_">
                  <path
                    id="XMLID_469_"
                    d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
		c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
		c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
		c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
		c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
		c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
		c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
		c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
		c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
		C233.168,179.508,230.845,178.393,227.904,176.981z"
                  />
                  <path
                    id="XMLID_470_"
                    d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
		c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
		c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
		 M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
		l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
		c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
		C276.546,215.678,222.799,268.994,156.734,268.994z"
                  />
                </g>
              </svg>
            </Icon>
          </a>
        </div>
        <div className="flex justify-center mt-5"></div>
        <div className="mt-5 inline-block">
          <h3 className="text-xl dark:text-gray-200 font-semibold">Bio</h3>
          <p className="text-gray-600  dark:text-gray-200 mt-2">
            {user.profile[0]?.bio}
          </p>
        </div>
        <div className="mt-5 inline-block">
          <h3 className="text-sm font-semibold inline-block  dark:text-gray-200">
            Email:{'  '}
          </h3>
          <h3 className="text-gray-600  dark:text-gray-200 mt-2 inline-block ml-1">
            {user.email}
          </h3>
        </div>
        <div className="mt-5 flex-auto">
          <h3 className="text-sm font-semibold inline-block  dark:text-gray-200">
            Matrícula:{'  '}
          </h3>
          <h3 className="text-gray-600  mt-2 inline-block ml-1  dark:text-gray-200">
            {user.mat}
          </h3>
        </div>
        <div className="mt-5 flex-auto">
          {/* <h3 className="text-sm font-semibold inline-block  dark:text-gray-200">
            Admissão:{' '}
            {format(parseISO(user.profile[0]?.serviceTime), 'dd/MM/yyyy')}
          </h3> */}
          <h3 className="text-gray-600  dark:text-gray-200 mt-2 inline-block ml-1">
            {}
          </h3>
        </div>
        <div className="mt-5 flex-auto">
          <h3 className="text-sm font-semibold inline-block  dark:text-gray-200">
            Telefone:{'  '}
          </h3>
          <h3 className="text-gray-600  dark:text-gray-200 mt-2 inline-block ml-1">
            <div className="flex">
              <Link
                to={`https://api.whatsapp.com/send?phone=${user.profile[0]?.phone}`}
              >
                {user.profile[0]?.phone}
              </Link>
            </div>
          </h3>
        </div>
        <div className="mt-5 flex-auto">
          <h3 className="text-sm font-semibold inline-block  dark:text-gray-200">
            Endereço:{'  '}
          </h3>
          <h3 className="text-gray-600  dark:text-gray-200 mt-2 inline-block ml-1">
            {user.profile[0]?.adress}
            {', '} {user.profile[0]?.neighborhood}
            {', '}
            {user.profile[0]?.city}
            {', '}
            {user.profile[0]?.state}
          </h3>
        </div>
        <div className="mt-5">
          <ButtonBack />
        </div>
      </div>
    </>
  )
}

export default Details
