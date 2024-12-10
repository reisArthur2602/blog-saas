import EditBlogForm from './_sessions/edit-blog-form'
import { getSettingsBlog } from './actions'
import { DeleteBlog } from './_sessions/delete-blog'

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
        <DeleteBlog slug={blogSlug} />
      </div>

      <EditBlogForm settings={settings} />
    </div>
  )
}

export default Page
