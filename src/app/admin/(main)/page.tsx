import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { BlogSelectButton } from './_sessions/blog-select-button'

import { CreateBlogSheet } from './_sessions/create-blog-sheet'
import { getBlogs } from './actions'

const Page = async () => {
  const blogs = await getBlogs()

  return (
    <main className="h-screen flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <CardTitle>Gerencie os seus Blogs</CardTitle>
          <CardDescription>Selecione ou crie um novo blog</CardDescription>
        </CardHeader>

        <CardContent>
          <CreateBlogSheet />
        </CardContent>
        {blogs.length > 0 && (
          <CardFooter>
            <ScrollArea>
              <div className="flex items-center gap-4 p-4">
                {blogs.map((blog) => (
                  <BlogSelectButton key={blog.slug} blog={blog} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="h-3" />
            </ScrollArea>
          </CardFooter>
        )}
      </Card>
    </main>
  )
}

export default Page
