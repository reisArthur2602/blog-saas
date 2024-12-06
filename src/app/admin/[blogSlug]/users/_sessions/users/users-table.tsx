'use client'

import { DataTable } from '@/components/ui/data-table'
import { columns, UserColumn } from './columns'

export const UsersTable = ({ data }: { data: UserColumn[] }) => {
  return <DataTable columns={columns} data={data} />
}
