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

import { updatePost } from '../actions'
import { Pen } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { toast } from 'sonner'
import { PostCategory, Prisma } from '@prisma/client'
import { POST_CATEGORIES } from '../contants'
import { formatCategoryPost } from '@/lib/utils'
import { EditPostInput, EditPostSchema } from '../schemas'

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

  const isLoading = form.formState.isSubmitting

  const handleFormSubmit = form.handleSubmit(async (data) => {
    const response = await updatePost({ id: post.id as string, ...data })
    if (response?.error) {
      toast.error('Erro ao atualizar a publicação. Tente novamente.')
      console.error(response.error)
      return
    }
    toast.success('Publicação atualizada com sucesso!')
    setOpen(false)
  })

  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: post.title as string,
        subtitle: post.subtitle as string,
        body: post.body as string,
        category: post.category as PostCategory,
      })
    }
  }, [isOpen, post, form])

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Pen size={16} /> Editar
        </Button>
      </SheetTrigger>

      <SheetContent className="space-y-6 overflow-y-auto w-full">
        <SheetHeader>
          <SheetTitle>Editar Publicação</SheetTitle>
          <SheetDescription>
            Preencha o formulário para editar uma publicação do blog.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Título</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
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
                  <FormLabel htmlFor="subtitle">Subtítulo</FormLabel>
                  <FormControl>
                    <Input
                      id="subtitle"
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
                  <FormLabel htmlFor="category">Categoria</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={form.formState.isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger id="category">
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
                  <FormLabel htmlFor="body">Conteúdo</FormLabel>
                  <FormControl>
                    <ReactQuill
                      id="body"
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
              <SheetClose asChild>
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
