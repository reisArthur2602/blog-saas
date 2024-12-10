'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteBlog } from '../actions'
import { useRouter } from 'next/navigation'

export const DeleteBlog = ({ slug }: { slug: string }) => {
  const { push } = useRouter()

  const onDelete = async () => {
    await deleteBlog(slug)
    push('/admin')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'} size={'sm'}>
          <Trash2 /> Deletar Blog
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja realmente excluir o blog</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não poderá ser desfeita, o blog será excluída do banco de
            dados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
