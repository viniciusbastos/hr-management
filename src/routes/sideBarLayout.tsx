import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import logo from "../assets/6 CIPM.png";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlightIcon from "@mui/icons-material/Flight";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function SidebarLayout() {
  return (
    <div className="flex flex-row dark:bg-slate-800">
      <Sidebar />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
