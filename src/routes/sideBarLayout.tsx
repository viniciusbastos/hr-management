import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { NavbarDefault } from "../components/navbarmaterial";

export default function SidebarLayout() {
  return (
    <>
      <NavbarDefault />
      <div id="test" className="flex flex-row dark:bg-slate-700">
        <Sidebar />
        <main className="w-full h-full dark:bg-slate-700" >
          <Outlet />
        </main>
      </div>
    </>
  )
}
