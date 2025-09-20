import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import {
  Typography,
  Card,
  CardBody,
  Avatar,
  Button,
} from '@material-tailwind/react'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ProfileView = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('ProfileView must be used within an AuthProvider')
  }
  const { user } = context
  const [userData, setUserData] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setUserData(user)
    }
  }, [user])

  const handleEditClick = () => {
    navigate('/profile/edit')
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Typography>Loading...</Typography>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-xl rounded-xl mb-6">
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar
              src="/images/profile.png"
              alt="profile"
              size="xl"
              className="border-2 border-gray-200"
            />
            <div className="flex-1 text-center md:text-left">
              <Typography variant="h4" className="mb-2">
                {userData.name}
              </Typography>
              <Typography color="gray" className="mb-1">
                {userData.posto}
              </Typography>
              <Typography color="gray" className="mb-1">
                {userData.useremail}
              </Typography>
              <Typography color="gray" className="mb-1">
                ID: {userData.id}
              </Typography>
              <div className="mt-4 flex justify-center md:justify-start">
                <Button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 bg-caqui-700 hover:bg-caqui-800"
                >
                  <FaEdit /> Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="shadow-xl rounded-xl">
        <CardBody className="p-6">
          <Typography variant="h5" className="mb-4">
            Profile Details
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography color="gray" className="text-sm">
                Name
              </Typography>
              <Typography>{userData.name}</Typography>
            </div>

            <div>
              <Typography color="gray" className="text-sm">
                Email
              </Typography>
              <Typography>{userData.useremail}</Typography>
            </div>

            <div>
              <Typography color="gray" className="text-sm">
                Rank/Posto
              </Typography>
              <Typography>{userData.posto}</Typography>
            </div>

            <div>
              <Typography color="gray" className="text-sm">
                Role
              </Typography>
              <Typography>{userData.role}</Typography>
            </div>
          </div>

          <div className="mt-6">
            <Typography color="gray" className="text-sm mb-2">
              Additional Information
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography color="gray" className="text-sm">
                  Phone
                </Typography>
                <Typography>Not provided</Typography>
              </div>

              <div>
                <Typography color="gray" className="text-sm">
                  Address
                </Typography>
                <Typography>Not provided</Typography>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default ProfileView
