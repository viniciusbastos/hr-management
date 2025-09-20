// Enhanced authentication context with RBAC integration
// This file provides a clean integration between auth and RBAC systems

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router-dom'
import { jwtDecode, JwtPayload } from 'jwt-decode'

type SignInCredentials = {
  email: string
  password: string
}
type User = {
  id: string
  useremail: string
  name: string
  posto: string
  role: string
  permissions?: string[]
}
interface CustomJwtPayload {
  id: string
  useremail: string
  role: string
  name: string
  posto: string
  permissions?: string[]
}
type AuthContextData = {
  signIn(credetials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  Logout(): void
  user?: User
  refreshAuth(): Promise<void>
  hasPermission(permission: string): boolean
  hasRole(role: string): boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()

  // Check if user has specific permission
  const hasPermission = useCallback(
    (permission: string): boolean => {
      return user?.permissions?.includes(permission) || false
    },
    [user]
  )

  // Check if user has specific role
  const hasRole = useCallback(
    (role: string): boolean => {
      return user?.role === role || false
    },
    [user]
  )

  // Refresh authentication token
  const refreshAuth = useCallback(async (): Promise<void> => {
    try {
      const token = Cookies.get('token')
      if (token) {
        const decodedToken: CustomJwtPayload = jwtDecode(token)
        setUser({
          id: decodedToken.id,
          useremail: decodedToken.useremail,
          role: decodedToken.role,
          name: decodedToken.name,
          posto: decodedToken.posto,
          permissions: decodedToken.permissions,
        })
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        setUser(undefined)
      }
    } catch (error) {
      console.error('Failed to refresh authentication:', error)
      setIsAuthenticated(false)
      setUser(undefined)
    }
  }, [])

  function Logout() {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(undefined)
    // Note: Navigation should be handled by the calling component or route
    // This avoids the context error in some scenarios
  }

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      refreshAuth()
    } else {
      setIsAuthenticated(false)
      setUser(undefined)
    }
  }, [refreshAuth])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_API_URL + '/api/signin',
        {
          email,
          password,
        }
      )
      const token = response.data.token
      // Set secure cookie with proper attributes for JWT
      Cookies.set('token', token, {
        expires: 30,
        secure: import.meta.env.PROD,
        sameSite: 'strict',
      })

      const decodedToken: CustomJwtPayload = jwtDecode(token)
      setUser({
        id: decodedToken.id,
        useremail: decodedToken.useremail,
        role: decodedToken.role,
        name: decodedToken.name,
        posto: decodedToken.posto,
        permissions: decodedToken.permissions,
      })
      setIsAuthenticated(true)
    } catch (err) {
      console.error('Sign in error:', err)
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        Logout,
        signIn,
        refreshAuth,
        hasPermission,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
