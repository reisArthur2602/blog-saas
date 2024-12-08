import { Header, HeaderTitle } from '@/components/ui/header'
import { CreatePosts } from './_sessions/create-posts'

type Props = {
  params: { blogSlug: string }
}

const Page = ({ params: { blogSlug } }: Props) => {
  return (
    <div>
      <Header>
        <HeaderTitle>Publicações</HeaderTitle>
        <CreatePosts blogSlug={blogSlug} />
      </Header>
      <div className="space-y-6 p-6">
        <div>
          <h3 className="font-semibold text-xl">Gerenciar Publicações</h3>
          <p className="text-muted-foreground text-sm">
            Gerencie as publicações do blog
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
