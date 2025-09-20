import { useState } from 'react'
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Input,
  Chip,
} from '@material-tailwind/react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../../App'
import Loading from '../../components/loading'
import { FaEdit, FaTrashAlt, FaUserPlus } from 'react-icons/fa'
import DeleteModal from '../../components/modalDelete'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserManagementView = () => {
  const navigate = useNavigate()
  const { data: users, isLoading, isError } = useUsers()
  const [searchTerm, setSearchTerm] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  // Filter users based on search term
  const filteredUsers =
    users?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.posto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.useremail.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

  if (isLoading) return <Loading />

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card className="shadow-xl rounded-xl mb-6">
          <CardBody>
            <Typography color="red" variant="h5">
              Error loading users
            </Typography>
          </CardBody>
        </Card>
      </div>
    )
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/users/${userId}`)
      toast.success('User deleted successfully')
      // In a real app, you'd refresh the user list or invalidate cache
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    }
  }

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      handleDeleteUser(userToDelete)
      setIsDeleteModalOpen(false)
      setUserToDelete(null)
    }
  }

  const cancelDelete = () => {
    setIsDeleteModalOpen(false)
    setUserToDelete(null)
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card className="shadow-xl rounded-xl mb-6">
        <CardHeader
          variant="gradient"
          floated={true}
          className="bg-caqui-700 p-2 grid h-12 mb-4 place-items-center"
        >
          <Typography variant="h5" color="white">
            User Management
          </Typography>
        </CardHeader>

        <CardBody className="p-6 m-4 relative">
          {/* Search and Add User Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="w-full md:w-auto">
              <Input
                crossOrigin={undefined}
                label="Search Users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80"
              />
            </div>

            <Button
              onClick={() => navigate('/formUser')}
              className="flex items-center gap-2 bg-caqui-700 hover:bg-caqui-800"
            >
              <FaUserPlus /> Add New User
            </Button>
          </div>

          {/* Users Table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Posto/Graduação</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="dark:bg-gray-700">
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.posto}</TableCell>
                  <TableCell>{user.useremail}</TableCell>
                  <TableCell>
                    <Chip
                      value={user.role || 'No role'}
                      variant="ghost"
                      size="sm"
                      className="capitalize"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigate(`/user/edit/${user.id}`)}
                        variant="text"
                        color="blue"
                        className="p-2"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(user.id)}
                        variant="text"
                        color="red"
                        className="p-2"
                      >
                        <FaTrashAlt />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        tipo="usuário"
      />
    </div>
  )
}

export default UserManagementView
