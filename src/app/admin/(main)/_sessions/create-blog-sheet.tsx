'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  Sheet,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { CreateBlogSchema } from '@/schemas/Blog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Zap } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createBlog } from '../actions'

export type CreateBlog = z.infer<typeof CreateBlogSchema>

export const CreateBlogSheet = () => {
  const form = useForm<CreateBlog>({
    resolver: zodResolver(CreateBlogSchema),
    defaultValues: {
      slug: '',
      description: '',
      name: '',
      secondColor: '#000000',
      mainColor: '#FFFFFF',
    },
  })

  const onSubmit = form.handleSubmit(
    async (data) =>
      await createBlog(data)
        .then(() => {
          console.log('Blog cadastrado com sucesso!')
        })
        .catch((error: Error) => console.log(error)),
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full">
          <Plus /> Criar Blog
        </Button>
      </SheetTrigger>

      <SheetContent className="space-y-6 overflow-y-auto w-full">
        <SheetHeader>
          <SheetTitle>Criar um novo Blog</SheetTitle>
          <Button variant={'link'}>
            <Zap /> Gerar com IA
          </Button>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do blog"
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
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: meu-blog"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição"
                      disabled={form.formState.isSubmitting}
                      style={{ resize: 'none' }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor Principal</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      type="color"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor Secundária</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      type="color"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="grid gap-3 sm:grid-cols-2 sm:gap-0">
              <Button>Criar</Button>

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
