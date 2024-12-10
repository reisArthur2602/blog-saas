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

type CreatePostInput = Prisma.PostUncheckedCreateWithoutUserInput

type UpdatePostInput = Prisma.PostUpdateInput

const revalidatePostsPath = (blogSlug: string) => {
  revalidatePath(`/${blogSlug}/painel/posts`)
}

export const createPost = async (input: CreatePostInput) => {
  const currentUser = await auth()

  const { subtitle, title, body, category, blog_slug: slug } = input

  await db.post.create({
    data: {
      subtitle,
      title,
      body,
      category,
      blog_slug: slug,
      user_id: currentUser!.id,
    },
  })

  revalidatePostsPath(slug)
}

export const getPostsForBlog = async ({
  blogSlug,
  filters,
}: {
  blogSlug: string
  filters: Filters
}) => {
  const currentUser = await auth()

  const isAuthor = await hasPermissionServerSide({
    role: 'AUTHOR',
    blogSlug,
    userId: currentUser!.id,
  })

  const postFilters: Prisma.PostWhereInput = {
    blog_slug: blogSlug,
    user_id: isAuthor ? currentUser!.id : undefined,
    user: filters.name
      ? { name: { contains: filters.name, mode: 'insensitive' } }
      : undefined,
    category: filters.category ?? undefined,
  }

  return await db.post.findMany({
    where: postFilters,
    select: {
      id: true,
      title: true,
      subtitle: true,
      body: true,
      category: true,
      created_at: true,
      user: { select: { id: true, name: true, email: true } },
    },
    orderBy: { created_at: 'asc' },
  })
}

export const updatePost = async (input: UpdatePostInput & { id: string }) => {
  const { id, title, body, subtitle, category } = input

  try {
    const updatedPost = await db.post.update({
      where: { id },
      data: { title, body, subtitle, category },
    })

    revalidatePostsPath(updatedPost.blog_slug)
  } catch {
    return { error: 'O post não foi encontrado.' }
  }
}

export const deletePost = async ({ id }: { id: string }) => {
  try {
    const deletedPost = await db.post.delete({
      where: { id },
    })

    revalidatePostsPath(deletedPost.blog_slug)
  } catch {
    return { error: 'A publicação não foi encontrada.' }
  }
}

export type PostsData = ReturnTypeWithoutPromise<typeof getPostsForBlog>
