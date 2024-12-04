'use server'

import { db } from '@/lib/prisma'

export const getBlogs = async (userId: string) => {
  const blogs = await db.blog.findMany({ where: { userId } })
  return blogs
}
