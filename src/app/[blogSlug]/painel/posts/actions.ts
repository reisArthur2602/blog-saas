'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'
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
