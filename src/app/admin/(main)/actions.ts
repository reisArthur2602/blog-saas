'use server'

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { Prisma } from '@prisma/client'

const ERROR_MESSAGES = {
  SLUG_IN_USE: 'Este slug já está em uso',
}

type CreateBlogInput = Prisma.BlogUncheckedCreateInput
const fetchBlogsForUser = async (userId: string) => {
  return await db.blog.findMany({
    where: { users: { some: { user_id: userId } } },
  })
}

const checkBlogWithSlug = async (slug: string) => {
  return await db.blog.findUnique({ where: { slug } })
}

const createNewBlog = async (input: CreateBlogInput, userId: string) => {
  return await db.blog.create({
    data: {
      ...input,
      users: {
        create: [{ role: 'OWNER', user_id: userId }],
      },
    },
  })
}

export const getBlogs = async () => {
  const currentUser = await auth()

  return await fetchBlogsForUser(currentUser!.id)
}

export const createBlog = async (input: CreateBlogInput) => {
  const currentUser = await auth()

  const existingBlog = await checkBlogWithSlug(input.slug)
  if (existingBlog) return { error: ERROR_MESSAGES.SLUG_IN_USE }

  await createNewBlog(input, currentUser!.id)

  revalidatePath('/admin')
}
