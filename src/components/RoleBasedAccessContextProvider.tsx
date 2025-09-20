// This file is deprecated and can be removed since we're now using RoleBasedAccessProvider directly
// Keeping it for now to prevent breaking changes, but it should be removed in the future

import { ReactNode } from 'react'
import { RoleBasedAccessProvider } from '../contexts/rbac/RoleBasedAccessContext'

interface RoleBasedAccessContextProviderProps {
  children: ReactNode
}

/**
 * @deprecated Use RoleBasedAccessProvider directly from '../contexts/rbac/RoleBasedAccessContext'
 */
export function RoleBasedAccessContextProvider({
  children,
}: RoleBasedAccessContextProviderProps) {
  return <RoleBasedAccessProvider>{children}</RoleBasedAccessProvider>
}
