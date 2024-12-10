import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { UserRole } from '@prisma/client'
import { formatDate, formatRole } from '@/lib/utils'
import { EditBlogUser } from './edit-blog-user'
import { DeleteBlogUser } from './delete-blog-user'
import { Search } from 'lucide-react'

export type UsersColumn = {
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

export const usersColumns: ColumnDef<UsersColumn>[] = [
  {
    accessorKey: 'details',
    header: '',
    cell: () => (
      <Button variant="outline" size="icon" aria-label="Ver Detalhes">
        <Search size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'user.name',
    header: 'Nome',
  },
  {
    accessorKey: 'user.email',
    header: 'Email',
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
        original: { id, role },
      },
    }) => (
      <div className="flex gap-4">
        <EditBlogUser id={id} role={role} />
        <DeleteBlogUser id={id} />
      </div>
    ),
  },
]
