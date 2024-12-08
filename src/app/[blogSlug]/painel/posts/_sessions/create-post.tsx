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

import { CreatePostSchema, PostInput } from '@/schemas/Posts'
import { createPostOnBlog } from '../actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const POST_CATEGORIES = [
  { name: 'Tecnologia', value: 'TECHNOLOGY' },
  { name: 'Educação', value: 'EDUCATION' },
  { name: 'Saúde e Bem-Estar', value: 'HEALTH_AND_WELLNESS' },
  { name: 'Viagens', value: 'TRAVEL' },
  {
    name: 'Negócios e Empreendedorismo',
    value: 'BUSINESS_AND_ENTREPRENEURSHIP',
  },
  { name: 'Cultura e Entretenimento', value: 'CULTURE_AND_ENTERTAINMENT' },
  { name: 'Culinária e Gastronomia', value: 'CULINARY_AND_GASTRONOMY' },
  { name: 'Estilo de Vida', value: 'LIFESTYLE' },
  { name: 'Ciência e Inovação', value: 'SCIENCE_AND_INNOVATION' },
  {
    name: 'Sustentabilidade e Meio Ambiente',
    value: 'SUSTAINABILITY_AND_ENVIRONMENT',
  },
]

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

  const onSubmit = form.handleSubmit(async (data) => {
    await createPostOnBlog({ ...data, blog_slug: blogSlug })
    console.log('A publicação foi criada com sucesso!')
    form.reset()
    setOpen(false)
  })

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) form.reset()
      }}
    >
      <SheetTrigger asChild>
        <Button className="w-fit">Criar Post</Button>
      </SheetTrigger>

      <SheetContent className="space-y-6 overflow-y-auto w-full">
        <SheetHeader>
          <SheetTitle>Criar uma nova publicação</SheetTitle>
          <SheetDescription>
            Preencha o formulário para criar um publicação no blog
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
