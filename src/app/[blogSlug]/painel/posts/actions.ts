'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const createPostOnBlog = async ({
  subtitle,
  title,
  body,
  blog_slug: blogSlug,
}: Prisma.PostUncheckedCreateWithoutUserInput) => {
  const currentUser = await auth()

  await db.post.create({
    data: {
      subtitle,
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
}: {
  blogSlug: string
}) => {
  const currentUser = await auth()

  const userPermission = await db.blogUser.findFirst({
    where: { blog_slug: blogSlug, user_id: currentUser?.id },
    select: { role: true },
  })

  if (userPermission?.role === 'AUTHOR') {
    const currentUserPosts = await db.post.findMany({
      where: { blog_slug: blogSlug, user_id: currentUser!.id },
      select: {
        id: true,
        title: true,
        subtitle: true,
        body: true,
        created_at: true,
        user: { select: { id: true, name: true, email: true } },
      },
    })

    return currentUserPosts
  }

  const allUsersPostsCurrentBlog = await db.post.findMany({
    where: { blog_slug: blogSlug },
    select: {
      id: true,
      title: true,
      subtitle: true,
      body: true,
      created_at: true,
      user: { select: { id: true, name: true, email: true } },
    },
  })

  return allUsersPostsCurrentBlog
}

export const updatePostOnBlog = async ({
  id,
  title,
  body,
  subtitle,
}: Prisma.PostUpdateInput) => {
  try {
    const post = await db.post.update({
      where: { id: id as string },
      data: {
        title,
        body,
        subtitle,
      },
    })
    revalidatePath(`/${post.blog_slug}/painel/posts`)
  } catch {
    return { error: 'O post não foi encontrado' }
  }
}

export type PostsData = ReturnTypeWithoutPromise<typeof getPostsCurrentBlog>