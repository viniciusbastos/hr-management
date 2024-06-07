
import logo from "../assets/pmba.png";
import logodark from "../assets/pmbadark.png";
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
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  GlobeAmericasIcon,
  AcademicCapIcon,
  PowerIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ToggleTheme from "./toggletheme";
import { useTheme } from "../contexts/themeDark";

export default function SidebarWithContentSeparator() {
  const [open, setOpen] = useState(0)
  const navigate = useNavigate()
  const { theme } = useTheme();

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value)
  }

  return (
    <>
    <div className="hidden sm:block md:block xl:block  h-[calc(100vh)] dark:bg-slate-800 bg-caqui-200 sticky top-0 w-full max-w-[17rem]  p-4 shadow-xl shadow-blue-gray-900/5 ">
      <div className="mb-2 p-4">
        <div className="mb-2 flex items-center  p-4">
        {theme === 'light' ? (
        <img src={logodark} alt="brand" className="mx-auto" height={120} width={120} />
      ) : (
        <img src={logo} alt="brand" className="mx-auto" height={120} width={120} />
      )}
      </div>
   
      
      <div className="p-2">
      </div>
        <ToggleTheme />

        <Typography variant="h5" color="blue-gray">
        </Typography>
      </div>
      <hr className="my-2 border-caqui-700" />
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
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
                color="blue-gray"
                className="mr-auto font-normal text-white"
              >
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link to="/dashboard">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon
                      strokeWidth={3}
                      className="h-3 w-5 text-white"
                    />
                  </ListItemPrefix>
                  Efetivo
                </ListItem>
              </Link>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon
                    strokeWidth={3}
                    className="h-3 w-5 text-white"
                  />
                </ListItemPrefix>
                ...
              </ListItem>
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
                color="blue-gray"
                className="mr-auto font-normal text-white"
              >
                Teste
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                ...
              </ListItem>
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
          open={open === 3}
          icon={
            <ChevronDownIcon
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
                  className="bg-white"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M160-80q-33 0-56.5-23.5T80-160v-480q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v480q0 33-23.5 56.5T800-80H160Zm0-80h640v-480H160v480Zm240-560h160v-80H400v80ZM160-160v-480 480Zm280-200v120h80v-120h120v-80H520v-120h-80v120H320v80h120Z" />
                </svg>{' '}
              </ListItemPrefix>
              <Typography
                color="blue-gray"
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

        <hr className="my-2 border-caqui-700" />
        <Link to="/users">
          <ListItem>
            <ListItemPrefix>
              <UserGroupIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
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
              color="blue-gray"
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
              color="blue-gray"
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
            color="blue-gray"
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
