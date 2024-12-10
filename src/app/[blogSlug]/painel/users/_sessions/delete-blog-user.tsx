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
import { X } from 'lucide-react'
import { deleteBlogUser } from '../actions'
import { toast } from 'sonner'

export const DeleteBlogUser = ({ id }: { id: string }) => {
  const onDelete = async () => {
    const response = await deleteBlogUser({ id })
    if (response?.error) return toast.error(response.error)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <X /> Deletar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente excluir o usuário do blog
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não poderá ser desfeita, o usuário será removido do blog
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
