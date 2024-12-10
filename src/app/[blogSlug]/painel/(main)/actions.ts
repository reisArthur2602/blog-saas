'use server'

import { db } from '@/lib/prisma'

export type TotalPostsPerCategory = {
  category: string
  totalPosts: number
}

type DashboardDataParams = {
  blogSlug: string
  month: string
  userId: string
}

const getMonthDateRange = (month: string): { start: Date; end: Date } => {
  const start = new Date(`2024-${month}-01`)
  const end = new Date(`2024-${month}-31`)
  return { start, end }
}

const getTotalPosts = async (where: object): Promise<number> => {
  return db.post.count({ where })
}

const getTotalUsers = async (blogSlug: string): Promise<number> => {
  return db.blogUser.count({
    where: { blog_slug: blogSlug },
  })
}

const getPostsPerCategory = async (
  where: object,
): Promise<TotalPostsPerCategory[]> => {
  const groupedData = await db.post.groupBy({
    by: ['category'],
    where,
    _count: { id: true },
  })
  return groupedData.map(({ category, _count }) => ({
    category,
    totalPosts: _count.id,
  }))
}

export const getDashboardData = async ({
  blogSlug,
  month,
  userId,
}: DashboardDataParams) => {
  const { start, end } = getMonthDateRange(month)

  const baseWhere = {
    blog_slug: blogSlug,
    created_at: {
      gte: start,
      lt: end,
    },
  }
  const totalPostsByMonth = await getTotalPosts(baseWhere)

  const totalUsers = await getTotalUsers(blogSlug)

  const totalPostsMadeByUserByMonth = await getTotalPosts({
    user_id: userId,
    ...baseWhere,
  })

  const postsPerCategory = await getPostsPerCategory({
    user_id: userId,
    ...baseWhere,
  })

  return {
    totalPostsByMonth,
    totalUsers,
    totalPostsMadeByUserByMonth,
    postsPerCategory,
  }
}
