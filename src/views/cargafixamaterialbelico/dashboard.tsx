import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Weapon } from '../../interfaces/Weapon';
import useDebounce from '../../hooks/useDebounce';
import { exportToCSV, exportToExcel } from '../../utils/exportUtils';
import fetchWeaponsInfo from '../../services/fetchWeaponInfo';

const WeaponsDashboard: React.FC = () => {
  const { data: weapons, isLoading, error } = useQuery<Weapon[], Error>({
    queryKey: ['weapons'],
    queryFn: fetchWeaponsInfo,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<'id' | 'model' | 'serialNumber' | 'type' | 'Status' | 'Caliber' | 'location'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const itemsPerPage = 20;

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Failed to load weapons. Please try again later.</div>;

  let filteredWeapons = weapons?.filter(weapon =>
    weapon.model.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    weapon.serialNumber.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    weapon.type.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    weapon.Status.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    weapon.Caliber.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    weapon.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  ) || [];

  // Sorting logic
  filteredWeapons = filteredWeapons.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(filteredWeapons.length / itemsPerPage);
  const currentWeapons = filteredWeapons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalWeapons = weapons?.length || 0;
  const inUseWeapons = weapons?.filter(weapon => weapon.Status === 'EM_CONDICOES_DE_USO').length || 0;
  const inStorageWeapons = weapons?.filter(weapon => weapon.Status === 'DEFEITO').length || 0;
  const damagedWeapons = weapons?.filter(weapon => weapon.location === 'CARGA PESSOAL').length || 0;

  const handleSort = (column: 'id' | 'model' | 'serialNumber' | 'type' | 'Status' | 'Caliber' | 'location') => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <header className="bg-gray-800 dark:bg-gray-900 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Weapons Dashboard</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="ml-4 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <div className="p-4">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-2xl font-bold mb-4">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-500 dark:bg-blue-600 text-white p-4 rounded-lg text-center">
              <h3 className="text-xl font-semibold">Total Weapons</h3>
              <p className="text-3xl">{totalWeapons}</p>
            </div>
            <div className="bg-green-500 dark:bg-green-600 text-white p-4 rounded-lg text-center">
              <h3 className="text-xl font-semibold">In Use</h3>
              <p className="text-3xl">{inUseWeapons}</p>
            </div>
            <div className="bg-yellow-500 dark:bg-yellow-600 text-white p-4 rounded-lg text-center">
              <h3 className="text-xl font-semibold">In Storage</h3>
              <p className="text-3xl">{inStorageWeapons}</p>
            </div>
            <div className="bg-red-500 dark:bg-red-600 text-white p-4 rounded-lg text-center">
              <h3 className="text-xl font-semibold">Carga Pessoal</h3>
              <p className="text-3xl">{damagedWeapons}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search weapons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
          <div className="ml-4">
            <label htmlFor="sort-column" className="mr-2">Sort by:</label>
            <select
              id="sort-column"
              value={sortColumn}
              onChange={(e) => handleSort(e.target.value as 'id' | 'model' | 'serialNumber' | 'type' | 'Status' | 'Caliber' | 'location')}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            >
              <option value="id">ID</option>
              <option value="model">Model</option>
              <option value="serialNumber">Serial Number</option>
              <option value="type">Type</option>
              <option value="Status">Status</option>
              <option value="Caliber">Caliber</option>
              <option value="location">Location</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="ml-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="ml-4">
            <button
              onClick={() => exportToCSV(filteredWeapons, 'weapons.csv')}
              className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg mr-2"
            >
              Export to CSV
            </button>
            <button
              onClick={() => exportToExcel(filteredWeapons, 'weapons.xlsx')}
              className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg"
            >
              Export to Excel
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Weapons List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  className="border p-2 dark:border-gray-700 cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  ID {sortColumn === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="border p-2 dark:border-gray-700 cursor-pointer"
                  onClick={() => handleSort('model')}
                >
                  Model {sortColumn === 'model' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="border p-2 dark:border-gray-700 cursor-pointer"
                  onClick={() => handleSort('serialNumber')}
                >
                  Serial Number {sortColumn === 'serialNumber' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="border p-2 dark:border-gray-700 cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  Type {sortColumn === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="border p-2 dark:border-gray-700 cursor-pointer"
                  onClick={() => handleSort('Status')}
                >
                  Status {sortColumn === 'Status' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="border p-2 dark:border-gray-700 cursor-pointer"
                  onClick={() => handleSort('Caliber')}
                >
                  Caliber {sortColumn === 'Caliber' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="border p-2 dark:border-gray-700 cursor-pointer"
                  onClick={() => handleSort('location')}
                >
                  Location {sortColumn === 'location' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentWeapons.map(weapon => (
                <tr key={weapon.id}>
                  <td className="border p-2 dark:border-gray-700 dark:text-gray-300">{weapon.id}</td>
                  <td className="border p-2 dark:border-gray-700 dark:text-gray-300">{weapon.model}</td>
                  <td className="border p-2 dark:border-gray-700 dark:text-gray-300">{weapon.serialNumber}</td>
                  <td className="border p-2 dark:border-gray-700 dark:text-gray-300">{weapon.type}</td>
                  <td className="border p-2 dark:border-gray-700 dark:text-gray-300">{weapon.Status}</td>
                  <td className="border p-2 dark:border-gray-700 dark:text-gray-300">{weapon.Caliber}</td>
                  <td className="border p-2 dark:border-gray-700 dark:text-gray-300">{weapon.location}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg disabled:bg-gray-400 dark:disabled:bg-gray-700"
            >
              Previous
            </button>
            <span className="text-gray-600 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg disabled:bg-gray-400 dark:disabled:bg-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeaponsDashboard;