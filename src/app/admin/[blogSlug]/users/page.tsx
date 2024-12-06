import { Header, HeaderTitle } from '@/components/ui/header'

const Page = () => {
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
        <div>...</div>
      </div>
    </div>
  )
}

export default Page
