import { redirect } from 'next/navigation'

import { getBlogFromSlug } from './actions'
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

  const blog = await getBlogFromSlug(blogSlug)

  if (!blog) redirect('/auth/signin')

  const data = {
    blog: {
      slug: blog.slug,
      blogUser: {
        id: blog.users[0].id,
        role: blog.users[0].role,
        user: {
          id: blog.users[0].user.id,
          email: blog.users[0].user.email,
          name: blog.users[0].user.name,
        },
      },
    },
  }

  return (
    <div className="grid grid-cols-[18rem_1fr] h-screen">
      <BlogSidebar data={data} />
      <main className="overflow-y-auto scrollbar-hidden">{children}</main>
    </div>
  )
}

export default BlogLayout
