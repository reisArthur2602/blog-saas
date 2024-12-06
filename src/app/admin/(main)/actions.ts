'use server'

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { CreateBlog } from './_sessions/create-blog-sheet'
import { auth } from '@/lib/auth'

export const getBlogsUser = async () => {
  const user = await auth()

  const blogsUser = await db.blogUser.findMany({
    where: { user_id: user?.id },
    include: {
      blog: true,
    },
  })

  return blogsUser
}

export const createBlog = async (data: CreateBlog) => {
  const user = await auth()

  const hasBlogwithSlug = await db.blog.findUnique({
    where: { slug: data.slug },
  })

  if (hasBlogwithSlug) throw new Error('Este slug já está em uso')

  await db.blog.create({
    data: {
      ...data,
      users: {
        create: [{ role: 'OWNER', user_id: user!.id }],
      },
    },
  })

  revalidatePath('/admin')
}
