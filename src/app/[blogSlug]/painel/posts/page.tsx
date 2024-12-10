import { Header, HeaderTitle } from '@/components/ui/header'
import { CreatePost } from './_sessions/create-post'
import { PostsTable } from './_sessions/posts-table'

import { PostFilters } from './_sessions/post-filters'
import { PostCategory } from '@prisma/client'
import { getPostsForBlog } from './actions'

type Props = {
  params: { blogSlug: string }
  searchParams: { name: string; category: PostCategory }
}

const Page = async ({ params: { blogSlug }, searchParams }: Props) => {
  const posts = await getPostsForBlog({
    blogSlug,
    filters: searchParams,
  })

  return (
    <div>
      <Header>
        <HeaderTitle>Publicações</HeaderTitle>
        <CreatePost blogSlug={blogSlug} />
      </Header>

      <div className="space-y-6 p-6">
        <div>
          <h3 className="font-semibold text-xl">Gerenciar Publicações</h3>
          <p className="text-muted-foreground text-sm">
            Gerencie as publicações do blog
          </p>
        </div>
        <PostFilters blogSlug={blogSlug} />
        <PostsTable data={posts} />
      </div>
    </div>
  )
}

export default Page
