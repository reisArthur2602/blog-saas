'use server'

import { db } from '@/lib/prisma'

export const getUsersBlog = async (slug: string) => {
  const users = await db.blogUser.findMany({
    where: { blog_slug: slug },
    include: { user: { select: { id: true, email: true, name: true } } },
  })

  return users
}
