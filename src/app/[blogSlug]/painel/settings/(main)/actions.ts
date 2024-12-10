'use server'

import { db } from '@/lib/prisma'
import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'

import { revalidatePath } from 'next/cache'

export const getSettingsBlog = async (slug: string) => {
  return await db.blog.findUnique({
    where: { slug },
    select: {
      slug: true,
      name: true,
      description: true,
      mainColor: true,
      secondColor: true,
    },
  })
}
export type SettingsBlog = ReturnTypeWithoutPromise<typeof getSettingsBlog>
export type UpdateBlogInput = SettingsBlog

export const updateBlog = async (input: UpdateBlogInput) => {
  await db.blog.update({
    where: { slug: input?.slug },
    data: {
      name: input?.name,
      description: input?.description,
      mainColor: input?.mainColor,
      secondColor: input?.secondColor,
    },
  })

  revalidatePath(`/${input?.slug}/painel/settings`)
}
