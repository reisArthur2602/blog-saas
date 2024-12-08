'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'
import { revalidatePath } from 'next/cache'

type PostCreateInput = {
  title: string
  subtitle: string
  body: string
  blog_slug: string
}

export const createPostOnBlog = async (data: PostCreateInput) => {
  const currentUser = await auth()

  await db.post.create({
    data: { ...data, user_id: currentUser!.id },
  })

  revalidatePath(`/${data.blog_slug}/painel/posts`)
}

export const getPostsCurrentBlog = async ({
  blogSlug,
}: {
  blogSlug: string
}) => {
  const posts = await db.post.findMany({
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

  return posts
}

export type PostsData = ReturnTypeWithoutPromise<typeof getPostsCurrentBlog>
