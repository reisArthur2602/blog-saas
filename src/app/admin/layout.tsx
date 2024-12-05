import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { getBlogs } from './(main)/actions'
import { AdminProvider, SessionUser } from '@/providers/admin'

const AdminLayout = async ({ children }: PropsWithChildren) => {
  const token = cookies().get('token')?.value
  if (!token) redirect('/auth/signin')

  try {
    const user = verify(token, process.env.JWT_SECRET!) as SessionUser

    const blogs = await getBlogs(user.id)

    return (
      <AdminProvider initialBlogs={blogs} initialUser={user}>
        {children}
      </AdminProvider>
    )
  } catch {
    redirect('/auth/signin')
  }
}

export default AdminLayout
