'use server'

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { CreateBlog } from './_sessions/create-blog-sheet'
import { auth } from '@/lib/auth'

export const getBlogs = async () => {
  const { id } = await auth()
  const blogs = await db.blog.findMany({ where: { owner_id: id } })
  return blogs
}

export const createBlog = async (data: CreateBlog) => {
  const { id } = await auth()

  const hasBlogwithSlug = await db.blog.findUnique({
    where: { slug: data.slug },
  })

  if (hasBlogwithSlug) throw new Error('Este slug já está em uso')

  await db.blog.create({
    data: {
      ...data,
      User: { connect: { id } },
    },
  })

  revalidatePath('/admin')
}
