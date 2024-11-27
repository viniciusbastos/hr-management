import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { api } from '../../services/api';
import fetchWeaponsInfo from '../../services/fetchWeaponInfo';

interface Weapon {
    category: string;
    id: number;
    model: string;
    serialNumber: string;
    type: string;
    Status: string;
    Caliber: string;
    location: string;
  }
  interface CategoryStats {
    totalWeapons: number;
    operationalPercentage: number;
    operationalWeapons: number;
  }
  interface OverviewStatistics {
    Revolver: CategoryStats;
    Pistola: CategoryStats;
    Carabina: CategoryStats;
    Metralhadora: CategoryStats
    Fuzil: CategoryStats;
  }
  
const WeaponControlDashboard = () => {
    const [selectedCategory, setSelectedCategory] = useState<'Revolver' | 'Pistola' | 'Carabina' | 'Metralhadora' | 'Fuzil' >('Revolver');

    // Tanstack Query to fetch weapons
  const { 
    data: weapons = [], 
    isLoading, 
    isError 
  } = useQuery<Weapon[]>({
    queryKey: ['weapons'],
    queryFn: fetchWeaponsInfo,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000 // 10 minutes
  });
     // Calculate category-specific statistics
  const calculateCategoryStatistics = (weaponData: Weapon[]): OverviewStatistics => {
    const categories: Array<'Revolver' | 'Pistola' | 'Carabina' | 'Metralhadora' | 'Fuzil'> = ['Revolver', 'Pistola', 'Carabina', 'Metralhadora', 'Fuzil'];

    return categories.reduce((acc, category) => {
      const categoryWeapons = weaponData.filter(w => w.type === category);
      const totalWeapons = categoryWeapons.length;
      const operationalWeapons = categoryWeapons.filter(w => w.Status === 'EM_CONDICOES_DE_USO').length;
      const operationalPercentage = totalWeapons > 0 
        ? Math.round((operationalWeapons / totalWeapons) * 100) 
        : 0;

      acc[category] = {
        totalWeapons,
        operationalWeapons,
        operationalPercentage
        
      };

      return acc;
    }, {} as OverviewStatistics);
  };

  const overviewStats = calculateCategoryStatistics(weapons);

  const filteredWeapons = weapons.filter(weapon => weapon.type === selectedCategory);

      
    
      if (isLoading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        );
      }
    
      if (isError) {
        return (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">Unable to fetch weapons data.</span>
          </div>
        );
      }

 
  

      return (
        <div className="bg-gray-50 min-h-screen p-6">
          <div className="container mx-auto">
            {/* Category-Specific Overview Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {(['Revolver', 'Pistola', 'Carabina', 'Metralhadora', 'Fuzil'] as const).map((category) => {
                const stats = overviewStats[category];
                return (
                  <div 
                    key={category} 
                    className={`
                      bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow
                      ${selectedCategory === category ? 'border-2 border-blue-500' : ''}
                    `}
                  >
                    <h3 className="text-gray-500 text-sm mb-2 uppercase">{category} Overview</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-600">Total Systems</p>
                        <p className="text-xl font-bold text-blue-600">{stats.totalWeapons}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Em Condições de Uso</p>
                        <p className={`
                          text-xl font-bold 
                          ${stats.operationalPercentage > 50 
                            ? ' text-green-600' 
                            : ' text-red-600' 
                            }
                        `}>{stats.operationalPercentage}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Operational Count</p>
                        <p className="text-xl font-bold text-blue-600">{stats.operationalWeapons}</p>
                      </div>
                      
                    </div>
                  </div>
                );
              })}
            </div>
    
            {/* Category Selection */}
            <div className="flex space-x-4 mb-6">
              {['Revolver', 'Pistola', 'Carabina', 'Metralhadora', 'Fuzil'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as any)}
                  className={`
                    px-4 py-2 rounded-lg transition-all uppercase text-sm font-semibold
                    ${selectedCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-blue-100 border'}
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
    
            {/* Weapons Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Tipo</th>
                    <th className="px-4 py-3 text-center">Caliber</th>
                    <th className="px-4 py-3 text-center">Modelo</th>
                    <th className="px-4 py-3 text-center">Número de Série</th>
                    <th className="px-4 py-3 text-center">Localização</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWeapons.map((weapon) => (
                    <tr key={weapon.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{weapon.id}</td>
                      <td className="px-4 py-3 font-medium">{weapon.type}</td>
                      <td className="px-4 py-3 font-medium">{weapon.model}</td>
                      <td className="px-4 py-3 font-medium">{weapon.Caliber}</td>
                      <td className="px-4 py-3 text-center">{weapon.serialNumber}</td>
                      <td className="px-4 py-3 text-center">{weapon.location}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-semibold
                          ${weapon.Status === 'EM_CONDICOES_DE_USO' 
                            ? 'bg-green-100 text-green-800' 
                            : weapon.Status === 'DEFEITO'
                            ? 'bg-yellow-100 text-yellow-800'
                            : weapon.Status === 'EXTRAVIADA'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-red-100 text-red-800'}
                        `}>
                          {weapon.Status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    
            {/* Low Inventory Warning */}
            {overviewStats[selectedCategory].lowInventoryCount > 0 && (
              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-700 font-semibold">
                  ⚠️ Warning: {overviewStats[selectedCategory].lowInventoryCount} {selectedCategory} weapon systems have low inventory. Immediate restocking recommended.
                </p>
              </div>
            )}
          </div>
        </div>
      );
    };
    

export default WeaponControlDashboard;