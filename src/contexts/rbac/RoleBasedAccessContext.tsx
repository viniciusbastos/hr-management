import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import {
  ROLE_HIERARCHY,
  ROLE_PERMISSIONS,
  PermissionType,
  hasPermission,
  hasAnyPermission,
  hasSufficientRole,
} from './rolePermissions'
import { AuthContext } from '../authContext'

// Define the context type
interface RoleBasedAccessContextType {
  userRole: string | null
  permissions: PermissionType[]
  hasPermission: (permission: PermissionType) => boolean
  hasAnyPermission: (permissions: PermissionType[]) => boolean
  hasSufficientRole: (requiredRole: string) => boolean
  getAllRoles: () => string[]
  getAllPermissionsForRole: (role: string) => PermissionType[]
}

// Create the context with default values
const RoleBasedAccessContext = createContext<
  RoleBasedAccessContextType | undefined
>(undefined)

export const useRoleBasedAccess = () => {
  const context = useContext(RoleBasedAccessContext)
  if (!context) {
    throw new Error(
      'useRoleBasedAccess must be used within a RoleBasedAccessProvider'
    )
  }
  return context
}

interface RoleBasedAccessProviderProps {
  children: ReactNode
}

export const RoleBasedAccessProvider = ({
  children,
}: RoleBasedAccessProviderProps) => {
  const { user, isAuthenticated } = useContext(AuthContext)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [permissions, setPermissions] = useState<PermissionType[]>([])

  // Initialize permissions based on user role
  useEffect(() => {
    if (isAuthenticated && user) {
      // Set the user's role
      setUserRole(user.role || null)

      // Get permissions for the user's role
      const userPermissions = ROLE_PERMISSIONS[user.role] || []
      console.log('User Permissions:', userPermissions)
      setPermissions(userPermissions)
    } else {
      setUserRole(null)
      setPermissions([])
    }
  }, [isAuthenticated, user])

  // Check if user has specific permission
  const checkPermission = useCallback(
    (permission: PermissionType): boolean => {
      return hasPermission(user, permission)
    },
    [user]
  )

  // Check if user has any of the required permissions
  const checkAnyPermission = useCallback(
    (permissionsToCheck: PermissionType[]): boolean => {
      return hasAnyPermission(user, permissionsToCheck)
    },
    [user]
  )

  // Check if user has sufficient role level
  const checkSufficientRole = useCallback(
    (requiredRole: string): boolean => {
      if (!user || !user.role) return false
      return hasSufficientRole(user.role, requiredRole)
    },
    [user]
  )

  // Get all available roles
  const getAllRoles = useCallback((): string[] => {
    return [...ROLE_HIERARCHY]
  }, [])

  // Get all permissions for a specific role
  const getAllPermissionsForRole = useCallback(
    (role: string): PermissionType[] => {
      return ROLE_PERMISSIONS[role] || []
    },
    []
  )

  // Provide the context value
  const contextValue: RoleBasedAccessContextType = {
    userRole,
    permissions,
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    hasSufficientRole: checkSufficientRole,
    getAllRoles,
    getAllPermissionsForRole,
  }

  return (
    <RoleBasedAccessContext.Provider value={contextValue}>
      {children}
    </RoleBasedAccessContext.Provider>
  )
}
