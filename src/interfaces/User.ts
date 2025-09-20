/**
 * User interface for HR Management System
 */

export interface User {
  id: string
  useremail: string
  name: string
  posto: string
  role: string
  permissions?: string[]
  createdAt?: string
  updatedAt?: string
  isActive?: boolean
}

export interface UserProfile {
  id: string
  useremail: string
  name: string
  posto: string
  role: string
  permissions?: string
  createdAt?: string
  updatedAt?: string
  isActive?: boolean
  // Additional user profile fields

  phone?: string
  address?: string
}

export interface UserCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface Permission {
  id: string
  name: string
  description: string
  resource?: string
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
}
