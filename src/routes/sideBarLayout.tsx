import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import { NavbarDefault } from '../components/navbarmaterial'

export default function SidebarLayout() {
  return (
    <div id="test" className="flex flex-row dark:bg-slate-700 min-h-screen">
      <div className="hidden sm:block flex-shrink-0 w-64 dark:bg-slate-800 bg-caqui-200 min-h-screen overflow-y-auto fixed left-0">
        <Sidebar />
      </div>

      {/* Main Content - Adjusted margin to account for fixed sidebar */}
      <div className="flex flex-col flex-1 w-full md:ml-64 transition-all duration-300">
        {/* Navbar - Fixed at top */}
        <div className="fixed top-0 left-0 right-0 z-50 md:left-64">
          <NavbarDefault />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 mt-16">
          <main className="p-4 dark:bg-slate-700 min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
