'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { formatDate, formatRole } from '@/lib/utils'
import { UserRole } from '@prisma/client'

import { ColumnDef } from '@tanstack/react-table'
import { Trash2Icon } from 'lucide-react'
import { EditBlogUser } from './edit-blog-user'

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
    header: 'Cargo',
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
    cell: ({
      row: {
        original: {
          id,
          role,
          user: { email },
        },
      },
    }) => (
      <div className="flex gap-2">
        <EditBlogUser email={email} id={id} role={role} />
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
