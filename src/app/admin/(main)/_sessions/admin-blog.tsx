import { Blog } from '@prisma/client'
import Link from 'next/link'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

import { ScrollBar } from '@/components/ui/scroll-area'

import { ScrollArea } from '@radix-ui/react-scroll-area'

import { CreateBlog } from './create-blog'

import { Button } from '@/components/ui/button'

import { SquareArrowOutUpRight } from 'lucide-react'
import { Suspense } from 'react'

export const AdminBlogs = ({ blogs }: { blogs: Blog[] }) => {
  const hasBlogFromThisUser = blogs.length > 0

  return (
    <Card className="max-w-2xl w-full">
      <CardHeader className="text-center">
        <CardTitle>Gerencie os seus Blogs</CardTitle>
        <CardDescription>Selecione ou crie um novo blog</CardDescription>
      </CardHeader>

      <CardContent>
        <CreateBlog />
      </CardContent>

      {hasBlogFromThisUser && (
        <CardFooter>
          <ScrollArea>
            <div className="flex items-center gap-4 p-4">
              {blogs.map(({ name, slug }) => (
                <Button
                  key={slug}
                  variant={'outline'}
                  className="max-w-44 w-full truncate"
                  asChild
                >
                  <Link href={`/${slug}/painel`}>
                    <SquareArrowOutUpRight /> <>{name}</>
                  </Link>
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-3" />
          </ScrollArea>
        </CardFooter>
      )}

    </Card>
  )
}
