import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UserRole } from '@prisma/client'

import { ColumnDef } from '@tanstack/react-table'
import { Pen, Trash2Icon } from 'lucide-react'

export type UserColumn = {
  id: string
  role: UserRole
  blog_slug: string
  user_id: string
  created_at: Date
  updated_at: Date
  user: {
    id: string
    email: string
    name: string
  }
}

const formatRole = (role: UserRole) => {
  switch (role) {
    case 'OWNER':
      return 'Criador'
    case 'AUTHOR':
      return 'Autor'
    case 'EDITOR':
      return 'Editor'
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
    cell: ({ row }) => <Badge>{formatRole(row.original.role)}</Badge>,
  },
  {
    accessorKey: 'created_at',
    header: 'Data',
    cell: ({ row }) => (
      <span>
        {new Intl.DateTimeFormat('pt-BR').format(row.original.created_at)}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleEdit(row.original)}
        >
          <Pen />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(row.original)}
        >
          <Trash2Icon />
        </Button>
      </div>
    ),
  },
]

const handleEdit = (user: UserColumn) => {
  console.log('Edit user:', user)
}

const handleDelete = (user: UserColumn) => {
  console.log('Delete user:', user)
}
