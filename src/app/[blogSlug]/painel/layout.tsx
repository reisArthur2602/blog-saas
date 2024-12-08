import { redirect } from 'next/navigation'

import { getDataBlogFromSlug } from './actions'
import { BlogSidebar } from './_sessions/blog-sidebar'
import { auth } from '@/lib/auth'

type BlogLayoutProps = {
  children: React.ReactNode
  params: { blogSlug: string }
}

const BlogLayout = async ({
  children,
  params: { blogSlug },
}: BlogLayoutProps) => {
  const isLogged = await auth()

  if (!isLogged) redirect('/auth/signin')

  const dataCurrentBlog = await getDataBlogFromSlug(blogSlug)

  if (!dataCurrentBlog) redirect('/auth/signin')

  const data = {
    blog: {
      slug: dataCurrentBlog.slug,
      blogUser: {
        id: dataCurrentBlog.users[0].id,
        role: dataCurrentBlog.users[0].role,
        user: {
          id: dataCurrentBlog.users[0].user.id,
          email: dataCurrentBlog.users[0].user.email,
          name: dataCurrentBlog.users[0].user.name,
        },
      },
    },
  }

  return (
    <div className="grid grid-cols-[16rem_1fr] h-screen">
      <BlogSidebar data={data} />
      <main>{children}</main>
    </div>
  )
}

export default BlogLayout
