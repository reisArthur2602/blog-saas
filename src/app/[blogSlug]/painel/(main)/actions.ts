'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/prisma'

export const getDashboardData = async ({
  blogSlug,
  month,
}: {
  month: string
  blogSlug: string
}) => {
  const currentUser = await auth()

  const startMonth = new Date(`2024-${month}-01`)
  const endMonth = new Date(`2024-${month}-31`)

  const where = {
    blog_slug: blogSlug,
    created_at: {
      gte: startMonth,
      lt: endMonth,
    },
  }
  // chart
  const totalPostsCurrentBlogByMonth = Number(
    await db.post.count({
      where: {
        ...where,
      },
    }),
  )
  // card
  const totalUsersCurrentBlog = Number(
    await db.blogUser.count({
      where: {
        blog_slug: blogSlug,
      },
    }),
  )
  // card
  const totalPostsMadebyMeCurrentBlog = Number(
    await db.post.count({
      where: {
        user_id: currentUser?.id,
      },
    }),
  )

  return {
    totalPostsCurrentBlogByMonth,
    totalUsersCurrentBlog,
    totalPostsMadebyMeCurrentBlog,
  }
}
