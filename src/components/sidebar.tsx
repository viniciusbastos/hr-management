import logo from '../assets/pmbawhite.png'
import logodark from '../assets/pmba.png'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  GlobeAmericasIcon,
  AcademicCapIcon,
  PowerIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'
import {
  ChevronRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ToggleTheme from './toggletheme'
import { useTheme } from '../contexts/themeDark'

export default function SidebarWithContentSeparator() {
  const [open, setOpen] = useState(0)
  const navigate = useNavigate()
  const { theme } = useTheme()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value)
  }

  return (
    <>
      <div className="hidden sm:block md:block xl:block  h-[calc(100vh)] dark:bg-slate-800 bg-caqui-200 sticky top-0 w-full max-w-[17rem]  p-4  ">
        <div className="mb-2 p-4">
          <div className="mb-2 flex items-center  p-4">
            {theme === 'light' ? (
              <img
                src={logodark}
                alt="brand"
                className="mx-auto"
                height={120}
                width={120}
              />
            ) : (
              <img
                src={logo}
                alt="brand"
                className="mx-auto"
                height={120}
                width={120}
              />
            )}
          </div>

          <div className="p-2" />
          <ToggleTheme />
        </div>
        <hr className="my-2 border-caqui-700" />
        <List>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                stroke="#FFFFFF"
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? 'rotate-180' : ''
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5 text-white" />
                </ListItemPrefix>
                <Typography
                  color="white"
                  className="mr-auto font-normal text-white"
                >
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to="/dashboard">
                  <ListItem className="mr-auto font-normal text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon
                        stroke="#FFFFFF"
                        strokeWidth={3}
                        className="h-3 w-5 text-white"
                      />
                    </ListItemPrefix>
                    Efetivo
                  </ListItem>
                </Link>
                <Link to="/process">
                  <ListItem className="mr-auto font-normal text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon
                        stroke="#FFFFFF"
                        strokeWidth={3}
                        className="h-3 w-5 text-white"
                      />
                    </ListItemPrefix>
                    Inventário de Processos
                  </ListItem>
                </Link>

                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  ...
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                stroke="#FFFFFF"
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? 'rotate-180' : ''
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5 text-white" />
                </ListItemPrefix>
                <Typography
                  color="white"
                  className="mr-auto font-normal text-white"
                >
                  Gestão
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to="/process">
                  <ListItem className="mr-auto font-normal text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Processos
                  </ListItem>
                </Link>
                <Link to="/sicknote">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Atestados Médicos
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 3}
            icon={
              <ChevronDownIcon
                stroke="#FFFFFF"
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? 'rotate-180' : ''
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 3}>
              <AccordionHeader
                onClick={() => handleOpen(3)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <svg
                    fill="#FFFFFF"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M160-80q-33 0-56.5-23.5T80-160v-480q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v480q0 33-23.5 56.5T800-80H160Zm0-80h640v-480H160v480Zm240-560h160v-80H400v80ZM160-160v-480 480Zm280-200v120h80v-120h120v-80H520v-120h-80v120H320v80h120Z" />
                  </svg>{' '}
                </ListItemPrefix>
                <Typography
                  color="white"
                  className="mr-auto font-normal text-white"
                >
                  Cuidando do Cuidador
                </Typography>
              </AccordionHeader>
            </ListItem>

            <AccordionBody className="py-1">
              <List className="p-0 text-white">
                <Link to="/dashboadtakecareguardians">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Dashboard
                  </ListItem>
                </Link>

                <Link to="/takingcareguardian/list">
                  <ListItem className="text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5 text-white"
                      />
                    </ListItemPrefix>
                    Policiais Atendidos
                  </ListItem>
                </Link>
                <Link to="/appointment">
                  <ListItem className="text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5 text-white"
                      />
                    </ListItemPrefix>
                    Cadastrar Atendimentos
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 4}
            icon={
              <ChevronDownIcon
                stroke="#FFFFFF"
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? 'rotate-180' : ''
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 4}>
              <AccordionHeader
                onClick={() => handleOpen(4)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FFFFFF"
                    height="24px"
                    width="24px"
                    version="1.1"
                    id="Layer_1"
                    viewBox="0 0 512.003 512.003"
                    xml:space="preserve"
                  >
                    <g>
                      <g>
                        <path d="M486.403,64.001h-12.8c7.074,0,12.8-5.726,12.8-12.8c0-7.074-5.726-12.8-12.8-12.8h-51.2c-7.074,0-12.8,5.726-12.8,12.8    c0,7.074,5.726,12.8,12.8,12.8h-371.2v-12.8c0-7.074-5.726-12.8-12.8-12.8c-7.074,0-12.8,5.726-12.8,12.8v12.8    c-14.14,0-25.6,11.46-25.6,25.6v128c0,13.133,9.882,23.953,22.613,25.429L0.156,445.177c-0.802,7.236,1.51,14.473,6.366,19.9    c4.864,5.427,11.802,8.525,19.081,8.525h102.4c13.047,0,24.004-9.813,25.446-22.775l11.691-105.225h116.463    c12.834,0,23.68-9.498,25.378-22.221l10.24-76.8c0.154-1.143-0.265-2.236-0.273-3.379h169.455c14.14,0,25.6-11.46,25.6-25.6v-128    C512.003,75.462,500.542,64.001,486.403,64.001z M179.203,89.601h102.4v25.6h-102.4V89.601z M281.603,320.001H167.981    l5.837-52.565c14.302,23.305,46.43,39.765,69.385,39.765c7.074,0,12.8-5.726,12.8-12.8c0-7.074-5.726-12.8-12.8-12.8    c-19.746,0-51.2-20.966-51.2-38.4h99.84L281.603,320.001z M486.403,217.601h-194.56H158.407h-4.804l-25.6,230.4h-102.4l2.842-25.6    h61.158c7.074,0,12.8-5.726,12.8-12.8c0-7.074-5.726-12.8-12.8-12.8H31.294l2.842-25.6h63.147c7.074,0,12.8-5.726,12.8-12.8    s-5.726-12.8-12.8-12.8H36.977l2.842-25.6h65.143c7.074,0,12.8-5.726,12.8-12.8s-5.726-12.8-12.8-12.8H42.669l8.533-76.8h-25.6    v-25.6h460.8V217.601z M486.403,166.401h-460.8v-76.8h128v25.6c0,14.14,11.46,25.6,25.6,25.6h102.4c14.14,0,25.6-11.46,25.6-25.6    v-25.6h179.2V166.401z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M115.203,115.201h-51.2c-7.074,0-12.8,5.726-12.8,12.8c0,7.074,5.726,12.8,12.8,12.8h51.2c7.074,0,12.8-5.726,12.8-12.8    C128.003,120.927,122.277,115.201,115.203,115.201z" />
                      </g>
                    </g>
                  </svg>{' '}
                </ListItemPrefix>
                <Typography
                  color="white"
                  className="mr-auto font-normal text-white"
                >
                  Gestão de Material Bélico
                </Typography>
              </AccordionHeader>
            </ListItem>

            <AccordionBody className="py-1">
              <List className="p-0 text-white">
                <Link to="/weapons">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Carga Fixa
                  </ListItem>
                </Link>

                <Link to="/weaponscontrol">
                  <ListItem className="text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5 text-white"
                      />
                    </ListItemPrefix>
                    Controle de Armas
                  </ListItem>
                </Link>
                <Link to="/appointment">
                  <ListItem className="text-white">
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5 text-white"
                      />
                    </ListItemPrefix>
                    Cadastrar Atendimentos
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          <hr className="my-2 border-caqui-700" />
          <Link to="/users">
            <ListItem>
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                color="white"
                className="mr-auto font-normal text-white"
              >
                Efetivo
              </Typography>

              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          </Link>
          <Link to="vacation">
            <ListItem>
              <ListItemPrefix>
                <GlobeAmericasIcon className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                color="white"
                className="mr-auto font-normal text-white"
              >
                Férias
              </Typography>
            </ListItem>
          </Link>
          <Link to={'/courses'}>
            <ListItem>
              <ListItemPrefix>
                <AcademicCapIcon className="h-5 w-5 text-white" />
              </ListItemPrefix>
              <Typography
                color="white"
                className="mr-auto font-normal text-white"
              >
                Cursos
              </Typography>
            </ListItem>
          </Link>
          <hr className="my-2 border-caqui-700 " />
          <ListItem onClick={handleLogout} className="">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            <Typography
              color="white"
              className="mr-auto font-normal text-white"
            >
              Log Out
            </Typography>
          </ListItem>
        </List>
      </div>
    </>
  )
}
