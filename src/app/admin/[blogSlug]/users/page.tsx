import { Header, HeaderTitle } from '@/components/ui/header'
import { getUsersBlog } from './actions'
import { UsersTable } from './_sessions/users/users-table'

type Props = {
  params: {
    blogSlug: string
  }
}

const Page = async ({ params: { blogSlug } }: Props) => {
  const users = await getUsersBlog(blogSlug)
  console.log(users)

  return (
    <div>
      <Header>
        <HeaderTitle>Usuários</HeaderTitle>
      </Header>
      <div className="space-y-6 p-6">
        <div>
          <h3 className="font-semibold text-xl">Gerenciar Usuários</h3>
          <p className="text-muted-foreground text-sm">
            Gerencie os usuário e suas permissões no blog
          </p>
        </div>
        <UsersTable data={users} />
      </div>
    </div>
  )
}

export default Page
