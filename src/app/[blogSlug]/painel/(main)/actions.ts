'use server'

import { db } from '@/lib/prisma'

export type TotalPostsPerCategory = {
  category: string
  totalPosts: number
}

export const getDashboardData = async ({
  blogSlug,
  month,
  userId,
}: {
  month: string
  blogSlug: string
  userId: string
}) => {
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
        user_id: userId,
      },
    }),
  )

  const getTotalPostsPerCategory: TotalPostsPerCategory[] = (
    await db.post.groupBy({
      by: ['category'],
      where: { blog_slug: blogSlug },
      _count: {
        id: true,
      },
    })
  ).map(({ category, _count }) => ({ category, totalPosts: _count.id }))

  return {
    totalPostsCurrentBlogByMonth,
    totalUsersCurrentBlog,
    totalPostsMadebyMeCurrentBlog,
    getTotalPostsPerCategory,
  }
}
