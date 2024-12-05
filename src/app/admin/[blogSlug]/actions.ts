'use server'
import { db } from '@/lib/prisma'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const getBlogBySlug = async (slug: string) => {
  const blog = await db.blog.findUnique({ where: { slug } })
  return blog
}

export const onLogout = () => {
  cookies().delete('token')
  redirect('/auth/signin')
}
