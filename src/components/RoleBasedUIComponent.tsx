// UI Component for Role-Based Access Control
// This component provides a way to conditionally render UI elements based on user roles and permissions

import { ReactNode } from 'react'
import { useRoleBasedAccess } from '../contexts/rbac/RoleBasedAccessContext'
import { PermissionType } from '../contexts/rbac/rolePermissions'

/**
 * Props for RoleBasedUIComponent
 */
interface RoleBasedUIComponentProps {
  children: ReactNode
  requiredRoles?: string[]
  minimumRole?: string
  allowedPermissions?: PermissionType[]
  renderWhenDenied?: ReactNode
  fallback?: ReactNode
}

/**
 * A UI component that conditionally renders content based on user roles and permissions
 *
 * @param children - The child components to render if access is granted
 * @param requiredRoles - Array of roles that are allowed to see this component
 * @param minimumRole - Minimum role level required (uses role hierarchy)
 * @param allowedPermissions - Array of permissions that are allowed to see this component
 * @param renderWhenDenied - Optional content to render when access is denied
 * @param fallback - Optional fallback content (defaults to null)
 */
export function RoleBasedUIComponent({
  children,
  requiredRoles,
  minimumRole,
  allowedPermissions,
  renderWhenDenied,
  fallback,
}: RoleBasedUIComponentProps) {
  const { userRole, permissions, hasPermission, hasSufficientRole } =
    useRoleBasedAccess()

  // Check if user has required roles
  const hasRequiredRole =
    !requiredRoles ||
    requiredRoles.length === 0 ||
    (userRole && requiredRoles.includes(userRole))

  // Check if user has sufficient role level
  const hasSufficientRoleLevel =
    !minimumRole || (userRole && hasSufficientRole(minimumRole))

  // Check if user has required permissions
  const hasRequiredPermission =
    !allowedPermissions ||
    allowedPermissions.length === 0 ||
    (permissions &&
      permissions.some((permission) => allowedPermissions.includes(permission)))

  // If all checks pass, render the children
  if (hasRequiredRole && hasSufficientRoleLevel && hasRequiredPermission) {
    return <>{children}</>
  }

  // If access is denied, return fallback or renderWhenDenied
  if (renderWhenDenied) {
    return <>{renderWhenDenied}</>
  }

  return fallback || null
}

/**
 * Permission-based UI component
 */
interface PermissionUIComponentProps {
  children: ReactNode
  requiredPermission: PermissionType
  renderWhenDenied?: ReactNode
  fallback?: ReactNode
}

export function PermissionUIComponent({
  children,
  requiredPermission,
  renderWhenDenied,
  fallback,
}: PermissionUIComponentProps) {
  const { hasPermission } = useRoleBasedAccess()

  // Check if user has the required permission
  const hasRequiredPermission = hasPermission(requiredPermission)

  // If user has permission, render the children
  if (hasRequiredPermission) {
    return <>{children}</>
  }

  // If access is denied, return fallback or renderWhenDenied
  if (renderWhenDenied) {
    return <>{renderWhenDenied}</>
  }

  return fallback || null
}

/**
 * Role-based UI component with hierarchical checking
 */
interface HierarchicalRoleUIComponentProps {
  children: ReactNode
  minimumRole: string
  renderWhenDenied?: ReactNode
  fallback?: ReactNode
}

export function HierarchicalRoleUIComponent({
  children,
  minimumRole,
  renderWhenDenied,
  fallback,
}: HierarchicalRoleUIComponentProps) {
  const { userRole, hasSufficientRole } = useRoleBasedAccess()

  // Check if user has sufficient role level
  const hasSufficientRoleLevel = userRole && hasSufficientRole(minimumRole)

  // If user has sufficient role, render the children
  if (hasSufficientRoleLevel) {
    return <>{children}</>
  }

  // If access is denied, return fallback or renderWhenDenied
  if (renderWhenDenied) {
    return <>{renderWhenDenied}</>
  }

  return fallback || null
}
