import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-tailwind/react'
import foto from '../assets/profile.png'
import { useNavigate } from 'react-router-dom'
import fetchUsers from '../services/fetchUsers'
import { SetStateAction, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

interface User {
  id: string
  name: string
  posto: string
  mat: string
  email: string
}
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import Loading from './loading'
import DefaultLayout from '../routes/sideBarLayout'

const TABS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Monitored',
    value: 'monitored',
  },
  {
    label: 'Unmonitored',
    value: 'unmonitored',
  },
]

const TABLE_HEAD = ['Nome', 'Posto/Grad', 'Status', 'Matrícula', '']

export default function MembersTable() {
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useQuery(['vacation'], fetchUsers)
  const [filteredUsers, setFilteredUsers] = useState(data)
  const [searchItem, setSearchItem] = useState('')
  const [page, setPage] = useState(0)
  if (isLoading) {
    return <Loading />
  }
  if (isError) return <p>Error: {isError}</p>
  if (!data) return <p>No data available</p>

  const handleInputChange = (e) => {
    const searchTerm = e.target.value
    setSearchItem(searchTerm)
    const qtdpm = data.length
    const filteredItems = data.filter(
      (user: User) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.posto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mat.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setFilteredUsers(filteredItems)
  }

  const filteredData = filteredUsers ?? data

  return (
    <>
      <div className="p-10">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Quantidade de Policiais: {data.length}
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" size="sm">
                  view all
                </Button>
                <Button
                  className="flex items-center gap-3"
                  size="sm"
                  onClick={() => navigate('/formUser')}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Cadastrar
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value="all" className="w-full md:w-max">
                <TabsHeader className="dark:bg-gray-700">
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <div className="w-full md:w-72">
                <Input
                  value={searchItem}
                  onChange={handleInputChange}
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  crossOrigin={undefined}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <Table className="mt-4 w-full min-w-max table-auto text-left font-mono">
              <TableHead>
                <TableRow>
                  {TABLE_HEAD.map((head) => (
                    <TableCell
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-700 dark:text-gray-300 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData?.map((user) => (
                  <TableRow key={user.id} className="dark:bg-gray-700">
                    <TableCell className="px-6 py-4 whitespace-nowrap dark:bg-gray-700">
                      <div className="flex items-center">
                        <div
                          className="flex-shrink-0 h-10 w-10"
                          onClick={() => {
                            navigate(`./details/${user.id}`)
                          }}
                        >
                          <img
                            src={foto}
                            className="h-15 w-15 rounded-full"
                            alt=""
                          />
                        </div>
                        <div
                          className="ml-4"
                          onClick={() => {
                            navigate(`./details/${user.id}`)
                          }}
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-200">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap dark:bg-gray-700">
                      <div className="text-sm text-gray-900 dark:text-white dark:bg-gray-700">
                        {user.posto}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap dark:bg-gray-700">
                      <span
                        className="px-2 inline-flex text-xs leading-5
                          font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        Active
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 dark:bg-gray-700 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                      {user.mat}
                    </TableCell>
                    {/* <td>
                  <button
                    type="button"
                    className="px-2  bg-red-600  py-1 border hover:bg-red-400 rounded-full"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td> */}
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableFooter>
              <TablePagination 
              count={data.lenght}
              onPageChange={(e, newPage) => setPage(newPage) }
              page={page}
              rowsPerPage={10}>

              </TablePagination>
            </TableFooter> */}
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
