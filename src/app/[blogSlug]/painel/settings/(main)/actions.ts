'use server'

import { db } from '@/lib/prisma'
import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'

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
