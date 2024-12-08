import { Header, HeaderTitle } from '@/components/ui/header'
import { CreatePost } from './_sessions/create-post'
import { PostsTable } from './_sessions/posts-table'
import { getPostsCurrentBlog } from './actions'

type Props = {
  params: { blogSlug: string }
}

const Page = async ({ params: { blogSlug } }: Props) => {
  const postsData = await getPostsCurrentBlog({ blogSlug })

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

        <PostsTable data={postsData} />
      </div>
    </div>
  )
}

export default Page
