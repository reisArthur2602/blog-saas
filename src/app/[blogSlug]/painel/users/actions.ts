'use server'

import { db } from '@/lib/prisma'
import { UserRole } from '@prisma/client'
import { revalidatePath } from 'next/cache'

type Filters = {
  name?: string
  role?: UserRole
}

export const getBlogsUsersCurrentBlog = async ({
  slug,
  filters,
}: {
  slug: string
  filters: Filters
}) => {
  const blogsUsers = await db.blogUser.findMany({
    where: {
      blog_slug: slug,
      user: filters.name
        ? { name: { contains: filters.name, mode: 'insensitive' } }
        : undefined,
      role: filters.role ?? undefined,
    },
    select: {
      id: true,
      role: true,
      blog_slug: true,
      created_at: true,
      user: { select: { id: true, email: true, name: true } },
    },
  })

  return blogsUsers
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

  if (!user) return { error: 'O usuário não foi encontrado' }

  await db.blogUser.create({
    data: {
      blog_slug: blogSlug,
      user_id: user.id,
      role,
    },
  })

  revalidatePath(`/${blogSlug}/painel/users`)
}

export const editBlogUser = async ({
  id,
  role,
}: {
  id: string
  role: UserRole
}) => {
  const currentBlogUser = await db.blogUser.findUnique({ where: { id } })

  if (!currentBlogUser) return { error: 'Erro ao atualizar permissão' }

  await db.blogUser.update({
    where: { id: currentBlogUser?.id },
    data: { role },
  })

  revalidatePath(`/${currentBlogUser?.blog_slug}/painel/users`)
}

export const deleteBlogUser = async ({ id }: { id: string }) => {
  try {
    const { blog_slug: blogSlug } = await db.blogUser.delete({ where: { id } })

    revalidatePath(`/${blogSlug}/painel/users`)
  } catch {
    return { error: 'o usuário não foi encontrado' }
  }
}
