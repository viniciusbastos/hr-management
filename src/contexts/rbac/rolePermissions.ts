// Role-based permissions mapping for HR Management System
// This file defines the role hierarchy and permission structure

/**
 * User roles with hierarchical levels
 * Lower indices represent lower privilege levels
 */
export const ROLE_HIERARCHY = [
  'military_personnel',
  'manager',
  'hr_administrator',
  'ADMIN',
] as const

/**
 * Permission types that can be assigned to roles
 */
export type PermissionType =
  | 'view_users'
  | 'manage_users'
  | 'view_vacations'
  | 'request_vacations'
  | 'approve_vacations'
  | 'view_weapons'
  | 'manage_weapons'
  | 'view_courses'
  | 'manage_courses'
  | 'view_sick_notes'
  | 'create_sick_notes'
  | 'approve_sick_notes'
  | 'view_dashboard'
  | 'manage_system_settings'
  | 'view_reports'
  | 'export_data'

/**
 * Role-to-permissions mapping
 */
export const ROLE_PERMISSIONS: Record<string, PermissionType[]> = {
  // Military Personnel - lowest privilege
  military_personnel: [
    'view_dashboard',
    'request_vacations',
    'view_weapons',
    'view_courses',
    'create_sick_notes',
    'view_sick_notes',
  ],

  // Manager - can manage team members and approve requests
  manager: [
    'view_dashboard',
    'view_users',
    'request_vacations',
    'approve_vacations',
    'view_weapons',
    'view_courses',
    'create_sick_notes',
    'approve_sick_notes',
    'view_sick_notes',
  ],

  // HR Administrator - can manage users and system
  hr_administrator: [
    'view_dashboard',
    'view_users',
    'manage_users',
    'request_vacations',
    'approve_vacations',
    'view_weapons',
    'manage_weapons',
    'view_courses',
    'manage_courses',
    'create_sick_notes',
    'approve_sick_notes',
    'view_sick_notes',
    'view_reports',
    'export_data',
  ],

  // System Administrator - full system access
  ADMIN: [
    'view_dashboard',
    'view_users',
    'manage_users',
    'request_vacations',
    'approve_vacations',
    'view_weapons',
    'manage_weapons',
    'view_courses',
    'manage_courses',
    'create_sick_notes',
    'approve_sick_notes',
    'view_sick_notes',
    'manage_system_settings',
    'view_reports',
    'export_data',
  ],
}

/**
 * Check if user has sufficient role level (hierarchical access)
 */
export function hasSufficientRole(
  userRole: string,
  requiredRole: string
): boolean {
  const userIndex = ROLE_HIERARCHY.indexOf(userRole as any)
  const requiredIndex = ROLE_HIERARCHY.indexOf(requiredRole as any)

  return userIndex >= requiredIndex
}

/**
 * Check if user has specific permission
 */
export function hasPermission(
  user: any,
  requiredPermission: PermissionType
): boolean {
  if (!user || !user.role) return false

  const permissions = ROLE_PERMISSIONS[user.role] || []
  return permissions.includes(requiredPermission)
}

/**
 * Check if user has any of the required permissions
 */
export function hasAnyPermission(
  user: any,
  requiredPermissions: PermissionType[]
): boolean {
  if (!user || !user.role) return false

  const permissions = ROLE_PERMISSIONS[user.role] || []
  return requiredPermissions.some((permission) =>
    permissions.includes(permission)
  )
}

/**
 * Get all permissions for a specific role
 */
export function getPermissionsForRole(role: string): PermissionType[] {
  return ROLE_PERMISSIONS[role] || []
}

/**
 * Get all available roles
 */
export function getAllRoles(): string[] {
  return [...ROLE_HIERARCHY]
}
