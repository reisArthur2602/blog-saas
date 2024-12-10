import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import EditBlogForm from './_sessions/edit-blog-form'
import { getSettingsBlog } from './actions'

const Page = async ({
  params: { blogSlug },
}: {
  params: { blogSlug: string }
}) => {
  const settings = await getSettingsBlog(blogSlug)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">Configurações Gerais</h3>
        <Button variant={'destructive'} size={'sm'}>
          <Trash2 /> Deletar Blog
        </Button>
      </div>
      <EditBlogForm settings={settings} />
    </div>
  )
}

export default Page
