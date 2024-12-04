'use server'

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { CreateBlog } from './_sessions/create-blog-sheet'

export const getBlogs = async (userId: string) => {
  const blogs = await db.blog.findMany({ where: { owner_id: userId } })
  return blogs
}
export const createBlog = async ({
  data,
  ownerId,
}: {
  data: CreateBlog
  ownerId: string
}) => {
  const { mainColor, name, secondColor, slug, description } = data
  const hasBlogwithSlug = await db.blog.findUnique({
    where: { slug },
  })

  if (hasBlogwithSlug) throw new Error('Este slug já está em uso')

  await db.blog.create({
    data: {
      name,
      slug,
      mainColor,
      secondColor,
      description,
      User: { connect: { id: ownerId } },
    },
  })

  revalidatePath('/admin')
}
