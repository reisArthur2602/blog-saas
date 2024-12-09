import { Header, HeaderTitle } from '@/components/ui/header'

import { CreateBlogUser } from './_sessions/create-blog-user'
import { BlogUsersTable } from './_sessions/users-table'
import { UsersFilters } from './_sessions/users-filters'
import { UserRole } from '@prisma/client'
import { getUsersForBlog } from './actions'

type Props = {
  params: {
    blogSlug: string
  }
  searchParams: {
    name?: string
    role?: UserRole
  }
}

const Page = async ({ params: { blogSlug }, searchParams }: Props) => {
  const blogUsers = await getUsersForBlog({
    slug: blogSlug,
    filters: searchParams,
  })

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
        <UsersFilters blogSlug={blogSlug} />

        <BlogUsersTable data={blogUsers} />
      </div>
    </div>
  )
}

export default Page
