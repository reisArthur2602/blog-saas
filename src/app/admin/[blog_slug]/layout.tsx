import { PropsWithChildren } from 'react'
import { BlogSidebar } from './_sessions/blog-sidebar'

const BlogLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-[18rem_1fr] gap-4 h-screen">
      <BlogSidebar />
      <main> {children}</main>
    </div>
  )
}

export default BlogLayout
