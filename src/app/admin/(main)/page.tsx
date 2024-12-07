import { AdminBlogs } from './_sessions/admin-blog'
import { getBlogsForLoggedUser } from './actions'

const Page = async () => {
  const blogs = await getBlogsForLoggedUser()

  return <AdminBlogs blogs={blogs} />
}

export default Page
