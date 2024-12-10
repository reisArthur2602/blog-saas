'use client'

import { DataTable } from '@/components/ui/data-table'
import { usersColumns, UsersColumn } from './users-columns'

export const BlogUsersTable = ({ data }: { data: UsersColumn[] }) => {
  return <DataTable columns={usersColumns} data={data} />
}
