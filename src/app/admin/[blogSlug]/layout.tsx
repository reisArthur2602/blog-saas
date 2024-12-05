import { redirect } from 'next/navigation'
import { BlogSidebar } from './_sessions/blog-sidebar'
import { getBlogBySlug } from './actions'

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

  return (
    <div className="grid grid-cols-[18rem_1fr] gap-4 h-screen">
      <BlogSidebar blog={blog} />
      <main> {children}</main>
    </div>
  )
}

export default BlogLayout
