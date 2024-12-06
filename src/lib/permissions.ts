import { UserRole } from '@prisma/client'

export const hasPermission = (UserRole: UserRole, roles: UserRole[]) => {
  return roles.includes(UserRole)
}
