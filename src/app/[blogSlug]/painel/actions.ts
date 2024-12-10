'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

export const getBlogFromSlug = async (slug: string) => {
  const currentUser = await auth()

  return await db.blog.findUnique({
    where: { slug },
    select: {
      slug: true,
      users: {
        where: { user_id: currentUser?.id },
        select: {
          id: true,
          role: true,
          user: { select: { id: true, name: true, email: true } },
        },
      },
    },
  })
}
