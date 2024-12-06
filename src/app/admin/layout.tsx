import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

import { PropsWithChildren } from 'react'

const AdminLayout = async ({ children }: PropsWithChildren) => {
  const isAuthenticated = await auth()
  if (!isAuthenticated) redirect('/auth/signin')
  return children
}

export default AdminLayout
