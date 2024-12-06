import { redirect } from 'next/navigation'
import { BlogSidebar } from './_sessions/blog-sidebar'
import { getBlogBySlug } from './actions'
import { auth } from '@/lib/auth'

type BlogLayoutProps = {
  children: React.ReactNode
  params: { blogSlug: string }
}

const BlogLayout = async ({
  children,
  params: { blogSlug },
}: BlogLayoutProps) => {
  const blog = await getBlogBySlug(blogSlug)
  if (!blog) redirect('/admin')

  const { email, role, name } = await auth()
  return (
    <div className="grid grid-cols-[20rem_1fr] h-screen">
      <BlogSidebar blog={blog} user={{ email, role, name }} />
      <main>{children}</main>
    </div>
  )
}

export default BlogLayout
