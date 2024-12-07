import { Header, HeaderTitle } from '@/components/ui/header'
import { getBlogsUsersCurrentBlog } from './actions'

import { CreateBlogUser } from './_sessions/create-blog-user'
import { BlogUsersTable } from './_sessions/blog-users-table'

type Props = {
  params: {
    blogSlug: string
  }
}

const Page = async ({ params: { blogSlug } }: Props) => {
  const blogsUsersCurrentBlog = await getBlogsUsersCurrentBlog(blogSlug)

  return (
    <div>
      <Header>
        <HeaderTitle>Usuários</HeaderTitle>
        <CreateBlogUser slug={blogSlug} />
      </Header>
      <div className="space-y-6 p-6">
        <div>
          <h3 className="font-semibold text-xl">Gerenciar Usuários</h3>
          <p className="text-muted-foreground text-sm">
            Gerencie os usuário e suas permissões no blog
          </p>
        </div>
        <BlogUsersTable data={blogsUsersCurrentBlog} />
      </div>
    </div>
  )
}

export default Page
