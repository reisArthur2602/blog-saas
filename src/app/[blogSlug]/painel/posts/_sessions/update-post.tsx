'use client'

import 'react-quill/dist/quill.snow.css'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'

import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Sheet,
} from '@/components/ui/sheet'

import { Input } from '@/components/ui/input'

import ReactQuill from 'react-quill'

import { EditPostInput, EditPostSchema } from '@/schemas/Posts'
import { updatePostOnBlog } from '../actions'
import { Pen } from 'lucide-react'
import { PostCategory, Prisma } from '@prisma/client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { POST_CATEGORIES } from './create-post'

type UpdatePostProps = {
  post: Pick<
    Prisma.PostUpdateInput,
    'id' | 'body' | 'title' | 'subtitle' | 'category'
  >
}

export const UpdatePost = ({ post }: UpdatePostProps) => {
  const [isOpen, setOpen] = useState(false)

  const form = useForm<EditPostInput>({
    resolver: zodResolver(EditPostSchema),
    defaultValues: {
      title: post.title as string,
      subtitle: post.subtitle as string,
      body: post.body as string,
      category: post.category as PostCategory,
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const response = await updatePostOnBlog({ id: post.id, ...data })
    if (response?.error) return console.error(response.error)

    console.log('A publicação foi editada com sucesso!')
    setOpen(false)
  })

  useEffect(() => {
    form.reset({
      title: post.title as string,
      subtitle: post.subtitle as string,
      body: post.body as string,
      category: post.category as PostCategory,
    })
  }, [post, form])

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) form.reset()
      }}
    >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pen />
        </Button>
      </SheetTrigger>

      <SheetContent className="space-y-6 overflow-y-auto w-full">
        <SheetHeader>
          <SheetTitle>Editar Publicação</SheetTitle>
          <SheetDescription>
            Preencha o formulário para editar um publicação do blog
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Título"
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
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtítulo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Subtítulo"
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={form.formState.isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="capitalize">
                      {POST_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo</FormLabel>
                  <FormControl>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      readOnly={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="grid gap-3 sm:grid-cols-2 sm:gap-0">
              <Button type="submit" className="w-full">
                Salvar
              </Button>

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
