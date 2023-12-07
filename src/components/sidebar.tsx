import { Link } from "react-router-dom";
import logo from "../assets/6 CIPM.png";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlightIcon from "@mui/icons-material/Flight";

export default function SideBar() {
  return (
    <>
      <aside className="bg-gray-800 text-white w-64 min-h-screen p-4 h-screen sticky top-0">
        <div className="object-center">
          <img className="mx-auto" src={logo} height={65} width={65} />
        </div>
        <ul className="flex flex-col mx-auto">
          <li className="ml-6 mt-4">
            <Link
              className="text-base hover:text-stone-400 mt-3 text-stone-200	 font-sans"
              to="/home"
            >
              <div className="flex ">
                <HomeIcon />
                <p className="ml-2">Home</p>
              </div>
            </Link>
          </li>
          <li className="ml-6 mt-4">
            <Link
              className="text-base hover:text-stone-400 mt-3 text-stone-200	 font-bold"
              to="/home"
            >
              <div className="flex">
                <PeopleAltIcon /> <p className="ml-2">Efetivo</p>
              </div>
            </Link>
          </li>
          <li className="ml-6 mt-4">
            <Link
              className="text-base hover:text-stone-400 mt-3 text-gray-200	 font-bold"
              to="/dashboard"
            >
              <div className="flex">
                <DashboardIcon />
                <p className="ml-2">Dashboard </p>
              </div>
            </Link>
          </li>
          <li className="ml-6 mt-4">
            <Link
              className="text-base hover:text-stone-400 mt-3 text-gray-200	 font-bold"
              to="/vacation"
            >
              <div className="flex">
                <FlightIcon />
                <p className="ml-2">Férias </p>
              </div>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
