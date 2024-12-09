'use server'

import { auth } from '@/lib/auth'
import { hasPermissionServerSide } from '@/lib/permissions'
import { db } from '@/lib/prisma'
import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'
import { PostCategory, Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

type Filters = {
  name?: string
  category?: PostCategory
}

export const createPostOnBlog = async ({
  subtitle,
  title,
  body,
  category,
  blog_slug: blogSlug,
}: Prisma.PostUncheckedCreateWithoutUserInput) => {
  const currentUser = await auth()

  await db.post.create({
    data: {
      subtitle,
      category,
      title,
      body,
      blog_slug: blogSlug,
      user_id: currentUser!.id,
    },
  })

  revalidatePath(`/${blogSlug}/painel/posts`)
}

export const getPostsCurrentBlog = async ({
  blogSlug,
  filters,
}: {
  blogSlug: string
  filters: Filters
}) => {
  const currentUser = await auth()

  const currentUserIsAuthor = await hasPermissionServerSide({
    role: 'AUTHOR',
    blogSlug,
    userId: currentUser!.id,
  })

  const currentUserPosts = await db.post.findMany({
    where: {
      blog_slug: blogSlug,
      user_id: currentUserIsAuthor ? currentUser!.id : undefined,
      user: filters.name
        ? { name: { contains: filters.name, mode: 'insensitive' } }
        : undefined,
      category: filters.category ?? undefined,
    },
    select: {
      id: true,
      title: true,
      subtitle: true,
      body: true,
      category: true,
      created_at: true,
      user: { select: { id: true, name: true, email: true } },
    },
  })

  return currentUserPosts
}

export const updatePostOnBlog = async ({
  id,
  title,
  body,
  subtitle,
  category,
}: Prisma.PostUpdateInput) => {
  try {
    const post = await db.post.update({
      where: { id: id as string },
      data: {
        title,
        body,
        subtitle,
        category,
      },
    })
    revalidatePath(`/${post.blog_slug}/painel/posts`)
  } catch {
    return { error: 'O post não foi encontrado' }
  }
}

export const deletePostOnBlog = async ({ id }: { id: string }) => {
  try {
    const { blog_slug: blogSlug } = await db.post.delete({ where: { id } })

    revalidatePath(`/${blogSlug}/painel/posts`)
  } catch {
    return { error: 'A publicação não foi encontrada' }
  }
}

export type PostsData = ReturnTypeWithoutPromise<typeof getPostsCurrentBlog>
