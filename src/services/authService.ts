/**
 * Authentication service for HR Management System
 * Handles all authentication-related API calls and token management
 */

import axios from 'axios'
import { UserCredentials, AuthResponse } from '../interfaces/User'
import Cookies from 'js-cookie'

// Create axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Set up request interceptor to include JWT token in all requests
 */
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Set up response interceptor to handle token refresh and authentication errors
 */
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    // If the error is 401 (Unauthorized) and it's not a refresh token request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        // Attempt to refresh the token
        const refreshToken = Cookies.get('refreshToken')
        if (refreshToken) {
          // This would be implemented based on your backend's refresh token endpoint
          // For now, we'll just clear the session
          Cookies.remove('token')
          window.location.href = '/signin'
        } else {
          // No refresh token available, redirect to login
          Cookies.remove('token')
          window.location.href = '/signin'
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        Cookies.remove('token')
        window.location.href = '/signin'
      }
    }
    
    return Promise.reject(error)
  }
)

/**
 * Login user with email and password
 * @param credentials - User login credentials
 * @returns Promise with authentication response
 */
export async function login(credentials: UserCredentials): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>('/api/signin', {
      email: credentials.email,
      password: credentials.password,
    })
    
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Authentication failed')
    }
    throw new Error('An unexpected error occurred during login')
  }
}

/**
 * Logout user and clear session
 * @returns Promise that resolves when logout is complete
 */
export async function logout(): Promise<void> {
  try {
    // Optionally call backend to invalidate token
    // await api.post('/api/logout')
    
    // Clear all authentication cookies
    Cookies.remove('token')
    Cookies.remove('refreshToken')
    
    // Redirect to login page
    window.location.href = '/signin'
  } catch (error) {
    console.error('Logout error:', error)
    // Even if there's an error, clear local cookies and redirect
    Cookies.remove('token')
    Cookies.remove('refreshToken')
    window.location.href = '/signin'
  }
}

/**
 * Get current authenticated user profile
 * @returns Promise with user data
 */
export async function getCurrentUser(): Promise<any> {
  try {
    const response = await api.get('/api/user/profile')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile')
    }
    throw new Error('An unexpected error occurred while fetching user profile')
  }
}

/**
 * Refresh authentication token
 * @returns Promise with new token
 */
export async function refreshToken(): Promise<string> {
  try {
    const refreshToken = Cookies.get('refreshToken')
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }
    
    const response = await api.post('/api/auth/refresh', {
      refreshToken,
    })
    
    return response.data.token
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Token refresh failed')
    }
    throw new Error('An unexpected error occurred during token refresh')
  }
}

/**
 * Request password reset
 * @param email - User's email address
 * @returns Promise that resolves when reset request is sent
 */
export async function requestPasswordReset(email: string): Promise<void> {
  try {
    await api.post('/api/auth/reset-password', { email })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Password reset request failed')
    }
    throw new Error('An unexpected error occurred during password reset request')
  }
}

/**
 * Reset user password
 * @param token - Reset token from email
 * @param newPassword - New password to set
 * @returns Promise that resolves when password is reset
 */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
  try {
    await api.post('/api/auth/reset-password/confirm', {
      token,
      newPassword,
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Password reset failed')
    }
    throw new Error('An unexpected error occurred during password reset')
  }
}

/**
 * Change user password
 * @param currentPassword - Current password
 * @param newPassword - New password to set
 * @returns Promise that resolves when password is changed
 */
export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  try {
    await api.post('/api/auth/change-password', {
      currentPassword,
      newPassword,
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Password change failed')
    }
    throw new Error('An unexpected error occurred during password change')
  }
}

/**
 * Verify email address
 * @param token - Verification token from email
 * @returns Promise that resolves when email is verified
 */
export async function verifyEmail(token: string): Promise<void> {
  try {
    await api.post('/api/auth/verify-email', { token })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Email verification failed')
    }
    throw new Error('An unexpected error occurred during email verification')
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  refreshToken,
  requestPasswordReset,
  resetPassword,
  changePassword,
  verifyEmail,
}
