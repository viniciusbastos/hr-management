import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/authContext'
import { useRoleBasedAccess } from '../contexts/rbac/RoleBasedAccessContext'
import type { PermissionType } from '../contexts/rbac/rolePermissions'

/**
 * Props for RoleBasedRoute component
 */
interface RoleBasedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
  minimumRole?: string
  allowedPermissions?: PermissionType[]
  redirectPath?: string
}

/**
 * A route component that protects access based on user roles and permissions
 *
 * @param children - The child components to render if access is granted
 * @param requiredRoles - Array of roles that are allowed to access this route
 * @param minimumRole - Minimum role level required (uses role hierarchy)
 * @param allowedPermissions - Array of permissions that are allowed to access this route
 * @param redirectPath - Path to redirect to if access is denied (defaults to /signin)
 */
export function RoleBasedRoute({
  children,
  requiredRoles,
  minimumRole,
  allowedPermissions,
  redirectPath = '/signin',
}: RoleBasedRouteProps) {
  const { isAuthenticated, user } = useContext(AuthContext)
  const { hasPermission, hasSufficientRole } = useRoleBasedAccess()
  const navigate = useNavigate()

  useEffect(() => {
    // If not authenticated, redirect to sign in
    if (!isAuthenticated) {
      navigate(redirectPath)
      return
    }

    // If authenticated but no user data, redirect to sign in
    if (!user) {
      navigate(redirectPath)
      return
    }

    // Check role requirements
    if (requiredRoles && requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some((role) => user.role === role)
      if (!hasRequiredRole) {
        navigate(redirectPath)
        return
      }
    }

    // Check minimum role requirements using hierarchy
    if (minimumRole) {
      const hasSufficientRoleLevel = hasSufficientRole(minimumRole)
      if (!hasSufficientRoleLevel) {
        navigate(redirectPath)
        return
      }
    }

    // Check permission requirements - Updated to use the RBAC system properly
    if (allowedPermissions && allowedPermissions.length > 0) {
      const hasRequiredPermission = allowedPermissions.some((permission) =>
        hasPermission(permission)
      )
      if (!hasRequiredPermission) {
        navigate(redirectPath)
        return
      }
    }

    // If all checks pass, allow the route to render
  }, [
    isAuthenticated,
    user,
    navigate,
    redirectPath,
    requiredRoles,
    minimumRole,
    allowedPermissions,
  ])

  // If authentication check is still in progress or access is granted, render children
  if (!isAuthenticated || !user) {
    return null // Or a loading indicator
  }

  return <>{children}</>
}
