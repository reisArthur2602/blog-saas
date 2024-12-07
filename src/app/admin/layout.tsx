import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

import { PropsWithChildren } from 'react'

const AdminLayout = async ({ children }: PropsWithChildren) => {
  const isAuthenticated = await auth()

  if (!isAuthenticated) redirect('/auth/signin')

  return (
    <main className="h-screen flex items-center justify-center">
      {children}
    </main>
  )
}

export default AdminLayout
