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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatRole } from '@/lib/utils'

import { toast } from 'sonner'
import { createBlogUser } from '../actions'
import { USER_ROLES } from '../constants'
import { BlogUserInput, CreateBlogUserSchema } from '../schemas'

export const CreateBlogUser = ({ slug }: { slug: string }) => {
  const [isOpen, setOpen] = useState(false)

  const form = useForm<BlogUserInput>({
    resolver: zodResolver(CreateBlogUserSchema),
    defaultValues: {
      email: '',
      role: 'AUTHOR',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: BlogUserInput) => {
    await createBlogUser({ ...data, blogSlug: slug })
    toast.success('Usuário adicionado com sucesso!')
    form.reset()
    setOpen(!open)
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
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      disabled={isLoading}
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

                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="grid gap-3 sm:grid-cols-2 sm:gap-0">
              <Button disabled={isLoading}>
                {isLoading ? 'Salvando... ' : 'Salvar'}
              </Button>

              <SheetClose className="w-full" asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
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
