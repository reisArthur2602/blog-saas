'use client'

import 'react-quill/dist/quill.snow.css'

import { useState } from 'react'
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

import { createPost } from '../actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { POST_CATEGORIES } from '../contants'
import { formatCategoryPost } from '@/lib/utils'
import { toast } from 'sonner'
import { CreatePostSchema, PostInput } from '../schemas'

export const CreatePost = ({ blogSlug }: { blogSlug: string }) => {
  const [isOpen, setOpen] = useState(false)

  const form = useForm<PostInput>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      body: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: PostInput) => {
    await createPost({ ...data, blog_slug: blogSlug })
    toast.success('A publicação foi criada com sucesso!')
    form.reset()
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
        <Button className="w-fit" size={'sm'}>
          Criar Post
        </Button>
      </SheetTrigger>

      <SheetContent className="space-y-6 overflow-y-auto w-full">
        <SheetHeader>
          <SheetTitle>Criar uma nova publicação</SheetTitle>
          <SheetDescription>
            Preencha o formulário para criar um publicação no blog
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Título"
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
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtítulo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Subtítulo"
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
                        <SelectItem
                          key={category}
                          value={category}
                          disabled={isLoading}
                        >
                          {formatCategoryPost(category)}
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
                      readOnly={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="grid gap-3 sm:grid-cols-2 sm:gap-0">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar'}
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
