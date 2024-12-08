'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { formatDate } from '@/lib/utils'

import { ColumnDef } from '@tanstack/react-table'
import { Trash2Icon } from 'lucide-react'

import { PostsData } from '../actions'
import { UpdatePost } from './update-post'

type Post = PostsData[0]

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: 'title',
    header: 'Título',
    cell: ({ row }) => <span>{row.original.title}</span>,
  },
  {
    accessorKey: 'user.name',
    header: 'Autor',
    cell: ({ row }) => (
      <div className="space-x-2">
        <Badge className="capitalize"> {row.original.user.name}</Badge>
        <Badge variant={`outline`}> {row.original.user.email}</Badge>
      </div>
    ),
  },

  {
    accessorKey: 'created_at',
    header: 'Data',
    cell: ({ row }) => <span>{formatDate(row.original.created_at)}</span>,
  },
  {
    id: 'actions',
    header: '',
    cell: ({
      row: {
        original: { id, body, title, subtitle, category },
      },
    }) => (
      <div className="flex gap-2">
        <UpdatePost post={{ id, body, title, subtitle, category }} />
        <Button variant="ghost" size="icon">
          <Trash2Icon />
        </Button>
      </div>
    ),
  },
]

export const PostsTable = ({ data }: { data: PostsData }) => {
  return <DataTable columns={columns} data={data} />
}
