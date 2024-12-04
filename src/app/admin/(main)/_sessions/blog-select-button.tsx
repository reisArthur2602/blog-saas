import { Button } from '@/components/ui/button'
import { Blog } from '@prisma/client'
import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'

type BlogSelectProps = {
  blog: Blog
}

export const BlogSelectButton = ({ blog }: BlogSelectProps) => {
  return (
    <Button variant={'outline'} className="max-w-44 w-full truncate" asChild>
      <Link href={`/admin/${blog.slug}`}>
        <SquareArrowOutUpRight /> <>{blog.name}</>
      </Link>
    </Button>
  )
}
