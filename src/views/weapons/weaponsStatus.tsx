import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import fetchWeaponsInfo from '../../services/fetchWeaponInfo'

interface Weapon {
  category: string
  id: number
  model: string
  serialNumber: string
  type: string
  Status: string
  Caliber: string
  location: string
}

const WeaponControlDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    'Revolver' | 'Pistola' | 'Carabina' | 'Metralhadora' | 'Fuzil'
  >('Revolver')
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [locationClickCount, setLocationClickCount] = useState<number>(0)

  // Tanstack Query to fetch weapons
  const {
    data: weapons,
    isLoading,
    isError,
  } = useQuery<Weapon[]>(['weaponsinfo'], fetchWeaponsInfo)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">Unable to fetch weapons data.</span>
      </div>
    )
  }

  // Calculate category-specific statistics
  // Calculate category-specific statistics
  const calculateCategoryStatistics = (
    weaponData: Weapon[]
  ): OverviewStatistics => {
    const categories: Array<
      'Revolver' | 'Pistola' | 'Carabina' | 'Metralhadora' | 'Fuzil'
    > = ['Revolver', 'Pistola', 'Carabina', 'Metralhadora', 'Fuzil']
    const totalWeaponsall = weaponData.length
    return categories.reduce((acc, category) => {
      const categoryWeapons = weaponData.filter((w) => w.type === category)
      const totalWeapons = categoryWeapons.length
      const emcargaWeapons = categoryWeapons.filter(
        (w) => w.location === 'CARGA PESSOAL'
      ).length
      const operationalWeapons = categoryWeapons.filter(
        (w) => w.Status === 'EM_CONDICOES_DE_USO'
      ).length
      const disponibleWeapons = operationalWeapons - emcargaWeapons
      const operationalPercentage =
        totalWeapons > 0
          ? Math.round((disponibleWeapons / totalWeapons) * 100)
          : 0
      const emcargaPercentage =
        operationalWeapons > 0
          ? Math.round((emcargaWeapons / operationalWeapons) * 100)
          : 0

      acc[category] = {
        totalWeapons,
        operationalWeapons,
        emcargaWeapons,
        emcargaPercentage,
        disponibleWeapons,
        operationalPercentage,
      }

      return acc
    }, {} as OverviewStatistics)
  }

  const overviewStats = calculateCategoryStatistics(weapons)

  let filteredWeapons = weapons.filter(
    (weapon) => weapon.type === selectedCategory
  )

  if (selectedLocation) {
    filteredWeapons = filteredWeapons.filter(
      (weapon) => weapon.location === selectedLocation
    )
  }

  const handleLocationClick = (location: string) => {
    if (selectedLocation === location) {
      setSelectedLocation(null)
      setLocationClickCount(0)
    } else {
      setSelectedLocation(location)
      setLocationClickCount(locationClickCount + 1)
    }
  }
  return (
    <div className="bg-gray-50 dark:bg-inherit min-h-screen p-6">
      <div className="container mx-auto">
        {/* Category-Specific Overview Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['Revolver', 'Pistola', 'Carabina', 'Metralhadora', 'Fuzil'].map(
            (category) => {
              const stats = overviewStats[category]
              return (
                <div
                  key={category}
                  className={`
                      bg-white dark:bg-slate-600 dark:text-slate-200 shadow rounded-lg p-4 hover:shadow-md transition-shadow
                      ${selectedCategory === category ? 'border-2 border-blue-500' : ''}
                    `}
                >
                  <h3 className="text-gray-500 dark:text-slate-200 text-sm mb-2 uppercase">
                    Visão Geral - {category}S
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-slate-200 ">
                        Total
                      </p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {stats.totalWeapons}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-slate-200 ">
                        Carga Fixa
                      </p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {stats.emcargaWeapons}
                        {' - '}
                        <span className="text-sm dark:text-slate-200 ">
                          {stats.emcargaPercentage}%
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-slate-200 ">
                        Disp. Sala de Meios
                      </p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {stats.disponibleWeapons}
                      </p>
                      <p
                        className={`
                          text-xl font-bold 
                          ${
                            stats.operationalPercentage > 50
                              ? ' text-green-600'
                              : ' text-red-600 dark:text-red-400'
                          }
                        `}
                      >
                        {stats.operationalPercentage}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 dark:text-slate-200 ">
                        Operational Count
                      </p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {stats.operationalWeapons}
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
          )}
        </div>
        {/* Category Selection */}
        <div className="flex space-x-4 mb-6 ">
          {['Revolver', 'Pistola', 'Carabina', 'Metralhadora', 'Fuzil'].map(
            (category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category as
                      | 'Revolver'
                      | 'Pistola'
                      | 'Carabina'
                      | 'Metralhadora'
                      | 'Fuzil'
                  )
                }
                className={`
                    px-4 py-2 rounded-lg dark:bg-slate-600 dark:text-slate-200 transition-all uppercase text-sm font-semibold
                    ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white dark:text-blue-400'
                        : 'bg-white text-gray-700 hover:bg-blue-100 border'
                    }
                  `}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Location Selection */}
        <div className="flex space-x-4 mb-6">
          {['CARGA PESSOAL', 'SALA DE MEIOS', 'EXTRAVIADA', 'PAIOL'].map(
            (location) => (
              <button
                key={location}
                onClick={() => handleLocationClick(location)}
                className={`
                    px-2 py-2 rounded-lg dark:bg-slate-600 dark:text-slate-200 transition-all uppercase text-xs font-semibold
                    ${
                      selectedLocation === location
                        ? 'bg-blue-600 text-white dark:text-blue-400'
                        : 'bg-white text-gray-700 hover:bg-blue-100 border'
                    }
                  `}
              >
                {location}
              </button>
            )
          )}
        </div>

        {/* Weapons Table */}
        <div className="bg-white dark:bg-slate-600 dark:text-slate-200 shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200 dark:bg-slate-700 dark:text-slate-200">
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
                  <td className="px-4 py-3 font-medium">{weapon.Caliber}</td>
                  <td className="px-4 py-3 font-medium">{weapon.model}</td>
                  <td className="px-4 py-3 text-center">
                    {weapon.serialNumber}
                  </td>
                  <td className="px-4 py-3 text-center">{weapon.location}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`
                          px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            weapon.Status === 'EM_CONDICOES_DE_USO'
                              ? 'bg-green-100 text-green-800'
                              : weapon.Status === 'DEFEITO'
                                ? 'bg-yellow-100 text-yellow-800'
                                : weapon.Status === 'EXTRAVIADA'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-red-100 text-red-800'
                          }
                        `}
                    >
                      {weapon.Status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default WeaponControlDashboard
