'use server'

import { db } from '@/lib/prisma'
import { UserRole } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const getUsersBlog = async (slug: string) => {
  const users = await db.blogUser.findMany({
    where: { blog_slug: slug },
    include: { user: { select: { id: true, email: true, name: true } } },
  })

  return users
}

export const createBlogUser = async ({
  blogSlug,
  email,
  role,
}: {
  email: string
  blogSlug: string
  role: UserRole
}) => {
  const user = await db.user.findUnique({ where: { email } })
  if (!user) throw new Error('O usuário não foi encontrado')

  await db.blogUser.create({
    data: {
      blog_slug: blogSlug,
      user_id: user.id,
      role,
    },
  })

  revalidatePath('/admin')
}
