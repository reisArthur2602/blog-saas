'use server'

import { db } from '@/lib/prisma'
import { Prisma, UserRole } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'Usuário não encontrado',
  BLOG_USER_NOT_FOUND: 'Usuário do blog não encontrado ',
}

type Filters = {
  name?: string
  role?: UserRole
}

const revalidateUsersPath = (blogSlug: string) =>
  revalidatePath(`/${blogSlug}/painel/users`)

export const createBlogUser = async ({
  email,
  blogSlug,
  role,
}: {
  email: string
  blogSlug: string
  role: UserRole
}) => {
  const existingUser = await db.user.findUnique({ where: { email } })

  if (!existingUser) {
    return { error: ERROR_MESSAGES.USER_NOT_FOUND }
  }

  await db.blogUser.create({
    data: {
      blog_slug: blogSlug,
      user_id: existingUser.id,
      role,
    },
  })

  revalidateUsersPath(`/${blogSlug}/painel/users`)
}

export const getUsersForBlog = async ({
  slug,
  filters,
}: {
  slug: string
  filters: Filters
}) => {
  const blogUserFilters: Prisma.BlogUserWhereInput = {
    blog_slug: slug,
    user: filters.name
      ? { name: { contains: filters.name, mode: 'insensitive' } }
      : undefined,
    role: filters.role ?? undefined,
  }

  return await db.blogUser.findMany({
    where: blogUserFilters,
    select: {
      id: true,
      role: true,
      blog_slug: true,
      created_at: true,
      user: { select: { id: true, email: true, name: true } },
    },
    orderBy: { created_at: 'asc' },
  })
}

export const editBlogUser = async ({
  id,
  role,
}: {
  id: string
  role: UserRole
}) => {
  const blogUser = await db.blogUser.findUnique({ where: { id } })

  if (!blogUser) {
    return { error: ERROR_MESSAGES.BLOG_USER_NOT_FOUND }
  }

  await db.blogUser.update({
    where: { id },
    data: { role },
  })

  revalidateUsersPath(`/${blogUser.blog_slug}/painel/users`)
}

export const deleteBlogUser = async ({ id }: { id: string }) => {
  try {
    const deletedBlogUser = await db.blogUser.delete({ where: { id } })
    revalidateUsersPath(`/${deletedBlogUser.blog_slug}/painel/users`)
  } catch {
    return { error: 'Erro ao remover o usuário. Ele pode não existir.' }
  }
}
