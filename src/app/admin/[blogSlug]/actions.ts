'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

export const getBlogBySlug = async (slug: string) => {
  const user = await auth()
  const blog = await db.blog.findUnique({
    where: { slug, users: { some: { user_id: user?.id } } },
    include: { users: true },
  })
  return blog
}
