import { AdminBlogs } from './_sessions/admin-blog'
import { getBlogs } from './actions'

const Page = async () => {
  const blogs = await getBlogs()

  return <AdminBlogs blogs={blogs} />
}

export default Page
