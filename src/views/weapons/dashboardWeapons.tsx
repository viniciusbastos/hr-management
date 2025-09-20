import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Typography } from '@material-tailwind/react'
import { fetchWeapons } from '../../services/fetchWeapons'
import { Weapon } from '../../interfaces/Weapon'
import Loading from '../../components/loading'

const DashboardWeapons = () => {
  const navigate = useNavigate()
  const { data: weapons, isLoading, isError } = useQuery({
    queryKey: ['weapons'],
    queryFn: fetchWeapons,
  })

  if (isLoading) {
    return <Loading />
  }
  if (isError) return <p>Error loading weapons</p>
  if (!weapons) return <p>No weapons data available</p>

  const handleEdit = (weaponId: string) => {
    navigate(`/weapons/edit/${weaponId}`)
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-700 h-full">
      <div className="p-4 xl:m-auto">
        <div className="mb-8">
          <Typography variant="h4" color="blue-gray" className="mb-4">
            Weapons Dashboard
          </Typography>
        </div>

        <Card className="shadow-xl rounded-xl mb-6">
          <div className="p-6">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Weapons List
            </Typography>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-caqui-800 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                      Serial Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {weapons.map((weapon: Weapon) => (
                    <tr key={weapon.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {weapon.model}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {weapon.serialNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {weapon.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {weapon.Status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          size="sm"
                          color="blue"
                          onClick={() => handleEdit(weapon.id.toString())}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardWeapons
