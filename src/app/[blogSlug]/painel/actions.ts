'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

export const getDataBlogFromSlug = async (slug: string) => {
  const currentUser = await auth()

  const blog = await db.blog.findUnique({
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
  return blog
}
