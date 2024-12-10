'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
  Sheet,
} from '@/components/ui/sheet'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { UserRole } from '@prisma/client'
import { formatRole } from '@/lib/utils'
import { editBlogUser } from '../actions'
import { Pen } from 'lucide-react'
import { toast } from 'sonner'
import { USER_ROLES } from '../constants'
import { useForm } from 'react-hook-form'
import { EditBlogUserInput, EditBlogUserSchema } from '../schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

type EditBlogUserProps = {
  id: string
  currentRole: UserRole
}

export const EditBlogUser = ({ id, currentRole }: EditBlogUserProps) => {
  const [isOpen, setOpen] = useState(false)

  const form = useForm<EditBlogUserInput>({
    resolver: zodResolver(EditBlogUserSchema),
    defaultValues: {
      role: currentRole ?? 'AUTHOR',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: EditBlogUserInput) => {
    const response = await editBlogUser({
      id,
      role: data.role,
    })

    if (response?.error) {
      toast.error(response.error)
      return
    }

    setOpen(false)
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) form.reset()
      }}
    >
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Pen size={16} /> Editar
        </Button>
      </SheetTrigger>

      <SheetContent className="space-y-6 overflow-y-auto w-full">
        <SheetHeader>
          <SheetTitle>Editar Cargo</SheetTitle>
          <SheetDescription>
            Altere o cargo do usuário preenchendo os campos abaixo.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma permissão" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="capitalize">
                      {USER_ROLES.map((role) => (
                        <SelectItem
                          key={role}
                          value={role}
                          disabled={isLoading}
                        >
                          {formatRole(role)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <SheetFooter className="grid gap-3 sm:grid-cols-2 sm:gap-0">
              <Button disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
              <SheetClose asChild>
                <Button variant="outline" disabled={isLoading}>
                  Cancelar
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
