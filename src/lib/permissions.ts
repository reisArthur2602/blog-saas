import { UserRole } from '@prisma/client'

export const hasPermission = (
  userRole: 'OWNER' | 'EDITOR' | 'AUTHOR',
  roles: UserRole[],
) => {
  return roles.includes(userRole)
}
