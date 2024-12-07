'use server'

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import { BlogInput } from '@/schemas/Blog'

export const getBlogsForLoggedUser = async () => {
  const currentUser = await auth()

  const blogs = await db.blog.findMany({
    where: { users: { some: { user_id: currentUser?.id } } },
  })

  return blogs
}

export const createBlog = async (data: BlogInput) => {
  const currentUser = await auth()

  const hasBlogwithSlug = await db.blog.findUnique({
    where: { slug: data.slug },
  })

  if (hasBlogwithSlug) return { error: 'Este slug já esta em uso' }

  await db.blog.create({
    data: {
      ...data,
      users: {
        create: [{ role: 'OWNER', user_id: currentUser!.id }],
      },
    },
  })

  revalidatePath('/admin')
}
