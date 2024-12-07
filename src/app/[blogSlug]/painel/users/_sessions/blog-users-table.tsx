'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { formatDate, formatRole } from '@/lib/utils'
import { UserRole } from '@prisma/client'

import { ColumnDef } from '@tanstack/react-table'
import { Pen, Trash2Icon } from 'lucide-react'

type UserColumn = {
  id: string
  role: UserRole
  blog_slug: string
  created_at: Date
  user: {
    id: string
    email: string
    name: string
  }
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: 'user.name',
    header: 'Nome',
    cell: ({ row }) => <span>{row.original.user.name}</span>,
  },
  {
    accessorKey: 'user.email',
    header: 'Email',
    cell: ({ row }) => <span>{row.original.user.email} </span>,
  },

  {
    accessorKey: 'role',
    header: 'Permissão',
    cell: ({ row }) => (
      <Badge variant="outline">{formatRole(row.original.role)}</Badge>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Data',
    cell: ({ row }) => <span>{formatDate(row.original.created_at)}</span>,
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: () => (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
          <Pen />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2Icon />
        </Button>
      </div>
    ),
  },
]

export const BlogUsersTable = ({ data }: { data: UserColumn[] }) => {
  return <DataTable columns={columns} data={data} />
}
