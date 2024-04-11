import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { NavbarDefault } from "../components/navbarmaterial";

export default function SidebarLayout() {
  return (
    <>
      <NavbarDefault />
      <div className="flex flex-row dark:bg-slate-800">
        <Sidebar />
        <main className="w-full h-full">
          <Outlet />
        </main>
      </div>
    </>
  );
}
