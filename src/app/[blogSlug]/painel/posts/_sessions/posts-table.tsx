'use client'

import { DataTable } from '@/components/ui/data-table'

import { PostsData } from '../actions'
import { postsColumns } from './posts-columns'

export const PostsTable = ({ data }: { data: PostsData }) => {
  return <DataTable columns={postsColumns} data={data} />
}
