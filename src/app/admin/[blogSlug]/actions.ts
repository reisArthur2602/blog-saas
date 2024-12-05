'use server'
import { db } from '@/lib/prisma'

export const getBlogBySlug = async (slug: string) => {
  const blog = await db.blog.findUnique({ where: { slug } })
  return blog
}
