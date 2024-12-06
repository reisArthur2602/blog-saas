import { auth } from '@/lib/auth'
import { PropsWithChildren } from 'react'

const AdminLayout = async ({ children }: PropsWithChildren) => {
  await auth()
  return children
}

export default AdminLayout
