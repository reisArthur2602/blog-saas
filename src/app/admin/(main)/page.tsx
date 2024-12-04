'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAdmin } from '@/providers/admin'
import { useRouter } from 'next/navigation'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { BlogSelectButton } from './_sessions/blog-select-button'
import { Plus } from 'lucide-react'

const Page = () => {
  const { user, blogs } = useAdmin()
  const { push } = useRouter()

  if (user?.role !== 'OWNER') return push('/admin/unauthorized')

  return (
    <main className="h-screen flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <CardTitle>Gerencie os seus Blogs</CardTitle>
          <CardDescription>Selecione ou crie um novo blog</CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">
            <Plus /> Criar Blog
          </Button>
        </CardContent>
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
      </Card>
    </main>
  )
}

export default Page
