import { UserRole } from '@prisma/client'
import { db } from './prisma'

export const hasPermissionClientSide = (
  userRole: 'OWNER' | 'EDITOR' | 'AUTHOR',
  roles: UserRole[],
) => {
  return roles.includes(userRole)
}

export const hasPermissionServerSide = async ({
  role,
  blogSlug,
  userId,
}: {
  role: UserRole
  userId: string
  blogSlug: string
}) => {
  const userPermission = await db.blogUser.findFirst({
    where: { blog_slug: blogSlug, user_id: userId },
    select: { role: true },
  })

  return userPermission?.role === role
}
