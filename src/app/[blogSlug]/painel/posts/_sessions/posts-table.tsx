'use client'

import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import { formatCategoryPost, formatDate } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { PostsData } from '../actions'
import { UpdatePost } from './update-post'
import { DeletePost } from './delete-post'

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
    cell: ({ row }) => <span> {row.original.user.name}</span>,
  },

  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }) => (
      <Badge variant={'outline'}>
        {formatCategoryPost(row.original.category)}
      </Badge>
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
        <DeletePost id={id} />
      </div>
    ),
  },
]

export const PostsTable = ({ data }: { data: PostsData }) => {
  return <DataTable columns={columns} data={data} />
}
