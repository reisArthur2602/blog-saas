'use client'

import { useAdmin } from '@/providers/admin'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { user } = useAdmin()
  const { push } = useRouter()

  if (user?.role !== 'OWNER') return push('/admin/unauthorized')

  return <div>Page</div>
}

export default Page
