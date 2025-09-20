/**
 * Permission and role utility functions for HR Management System
 */

/**
 * Check if user has required permission
 * @param user - The authenticated user object
 * @param requiredPermission - The permission to check for
 * @returns boolean indicating if user has permission
 */
export function hasPermission(user: any, requiredPermission: string): boolean {
  if (!user || !user.permissions) return false
  return user.permissions.includes(requiredPermission)
}

/**
 * Check if user has required role
 * @param user - The authenticated user object
 * @param requiredRole - The role to check for
 * @returns boolean indicating if user has role
 */
export function hasRole(user: any, requiredRole: string): boolean {
  if (!user || !user.role) return false
  return user.role === requiredRole
}

/**
 * Check if user has any of the required permissions
 * @param user - The authenticated user object
 * @param requiredPermissions - Array of permissions to check for
 * @returns boolean indicating if user has any of the required permissions
 */
export function hasAnyPermission(user: any, requiredPermissions: string[]): boolean {
  if (!user || !user.permissions) return false
  return requiredPermissions.some(permission => user.permissions.includes(permission))
}

/**
 * Check if user has any of the required roles
 * @param user - The authenticated user object
 * @param requiredRoles - Array of roles to check for
 * @returns boolean indicating if user has any of the required roles
 */
export function hasAnyRole(user: any, requiredRoles: string[]): boolean {
  if (!user || !user.role) return false
  return requiredRoles.includes(user.role)
}

/**
 * Role-based access control helper for UI components
 */
export function canAccessResource(user: any, resourcePermissions: string[]): boolean {
  if (!user || !user.permissions) return false
  return resourcePermissions.some(permission => user.permissions.includes(permission))
}

/**
 * User role hierarchy - from lowest to highest
 */
export const ROLE_HIERARCHY = [
  'military_personnel',
  'manager',
  'hr_administrator',
  'system_admin'
]

/**
 * Check if user role has sufficient access level
 * @param userRole - Current user role
 * @param requiredRole - Required role level
 * @returns boolean indicating if user has sufficient access
 */
export function hasSufficientRole(userRole: string, requiredRole: string): boolean {
  const userIndex = ROLE_HIERARCHY.indexOf(userRole)
  const requiredIndex = ROLE_HIERARCHY.indexOf(requiredRole)
  
  return userIndex >= requiredIndex
}

/**
 * Updated permission utilities using the new RBAC system
 */
export { 
  hasPermission as hasPermissionRBAC,
  hasAnyPermission as hasAnyPermissionRBAC,
  hasSufficientRole as hasSufficientRoleRBAC,
  ROLE_HIERARCHY as ROLE_HIERARCHY_RBAC
} from '../contexts/rbac/rolePermissions'
