'use client'

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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserRole } from '@prisma/client'
import { formatRole } from '@/lib/utils'
import { createBlogUser } from '../actions'

const CreateBlogUserSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'O email é obrigatório' })
    .email('Formato inválido'),
  role: z.nativeEnum(UserRole),
})

type CreateBlogUser = z.infer<typeof CreateBlogUserSchema>

const USER_ROLES: { role: UserRole }[] = [
  { role: 'OWNER' },
  { role: 'EDITOR' },
  { role: 'AUTHOR' },
]

export const CreateUserButton = ({ blogSlug }: { blogSlug: string }) => {
  const form = useForm<CreateBlogUser>({
    resolver: zodResolver(CreateBlogUserSchema),
    defaultValues: {
      email: '',
      role: UserRole.AUTHOR,
    },
  })

  const onSubmit = form.handleSubmit(
    async (data) =>
      await createBlogUser({ ...data, blogSlug })
        .then(() => {
          console.log('Usuário cadastrado com sucesso!')
        })
        .catch((error: Error) => console.log(error)),
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-fit" size={'sm'}>
          Novo usuário
        </Button>
      </SheetTrigger>

      <SheetContent className="space-y-6 overflow-y-auto w-full">
        <SheetHeader>
          <SheetTitle>Adicionar novo usuário</SheetTitle>
          <SheetDescription>
            Preencha o formulário para adicionar um novo usuário ao blog
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
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
                      {USER_ROLES.map(({ role }) => (
                        <SelectItem key={role} value={role}>
                          {formatRole(role)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="grid gap-3 sm:grid-cols-2 sm:gap-0">
              <Button>Adicionar</Button>

              <SheetClose className="w-full" asChild>
                <Button variant="outline" className="w-full">
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
