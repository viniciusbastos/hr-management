
import React from 'react';
import { LineChart, PieChart, BarChart } from 'recharts'; // For charts
import { IoEyeOutline, IoCartOutline, IoBagOutline, IoPeopleOutline } from 'react-icons/io5';

const DashboardTeste = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1f37] text-gray-300 p-4">
        <div className="flex items-center mb-8">
          <img src="/logo.svg" alt="TailAdmin" className="h-8" />
          <span className="ml-2 text-xl font-semibold">TailAdmin</span>
        </div>
        
        <nav>
          <div className="text-xs text-gray-500 mb-4">MENU</div>
          <ul>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 bg-blue-600 rounded">
                <span>Dashboard</span>
              </a>
            </li>
            {/* Add other menu items */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatsCard 
            icon={<IoEyeOutline />}
            title="Total views"
            value="$3.456K"
            change="+0.43%"
            changeType="increase"
          />
          {/* Add other stats cards */}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
            {/* Revenue & Sales Chart */}
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            {/* Weekly Profit Chart */}
          </div>
        </div>
      </main>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon, title, value, change, changeType }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg p-6 m-4 w-64 text-white">
  <div className="flex items-center mb-4">
    <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <h2 className="text-xl font-semibold">Revenue</h2>
  </div>
  <p className="text-3xl font-bold mb-2">$54,321</p>
  <p className="text-sm opacity-80">15% increase from last month</p>
</div>
  );
};

export default DashboardTeste