import type React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'

import SignRoutes from './SignRoutes'
import OtherRoutes from './OtherRoutes'

const RouteTest: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)
  return isAuthenticated ? <OtherRoutes /> : <SignRoutes />
}

export default RouteTest
