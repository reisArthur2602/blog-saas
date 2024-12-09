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
  SheetDescription,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

import { Plus, Zap } from 'lucide-react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { BlogInput, CreateBlogSchema } from '@/schemas/Blog'

import { createBlog } from '../actions'

import { sendPromptToGemini } from '@/lib/gemini'
import { useEffect, useState } from 'react'

type GeminiResult = {
  name: string
  slug: string
  description: string
}
export const CreateBlog = () => {
  const [isOpen, setOpen] = useState(false)
  const [isLoadingGemini, setLoadingGemini] = useState(false)
  const [geminiResult, setGeminiResult] = useState<GeminiResult | null>(null)

  const handleGenerate = async () => {
    setLoadingGemini(true)
    await sendPromptToGemini({
      prompt: `
                Escreva um blog sobre qualquer tema de sua escolha. Crie sempre algo diferente e não repita, porém responda no formato JSON.
                Siga esse exemplo e respeite as regras abaixo:
                {
                    "name": "Título do blog (max. 60 caracteres)",
                    "description": "Descrição do blog (max. 191 caracteres)",
                    "slug": "Slug do blog (max. 191 caracteres, siga o regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/)" 
                }
            `,
    })
      .then((result) => setGeminiResult(result))
      .finally(() => setLoadingGemini(false))
  }

  const form = useForm<BlogInput>({
    resolver: zodResolver(CreateBlogSchema),
    defaultValues: {
      slug: '',
      description: '',
      name: '',
      secondColor: '#000000',
      mainColor: '#FFFFFF',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const response = await createBlog(data)
    if (response?.error) return console.error(response.error)
    console.log('Blog cadastrado com sucesso')
    form.reset()
    setOpen(!isOpen)
  })

  useEffect(() => {
    form.reset({
      slug: geminiResult?.slug,
      description: geminiResult?.description,
      name: geminiResult?.name,
      secondColor: '#000000',
      mainColor: '#FFFFFF',
    })
  }, [geminiResult, form])

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) form.reset()
      }}
    >
      <SheetTrigger asChild>
        <Button className="w-full">
          <Plus /> Criar Blog
        </Button>
      </SheetTrigger>

      <SheetContent className="space-y-6 overflow-y-auto w-full">
        <SheetHeader>
          <SheetTitle>Criar um novo Blog</SheetTitle>
          <SheetDescription>
            Preencha o formulário para criar um blog
          </SheetDescription>
          <Button
            size={'sm'}
            onClick={() => handleGenerate()}
            disabled={form.formState.isSubmitting || isLoadingGemini}
          >
            <Zap /> {isLoadingGemini ? 'Gerando blog...' : 'Gerar com IA'}
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
                      placeholder="Nome"
                      disabled={form.formState.isSubmitting || isLoadingGemini}
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
                      disabled={form.formState.isSubmitting || isLoadingGemini}
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
                      disabled={form.formState.isSubmitting || isLoadingGemini}
                      style={{ resize: 'none', height: '120px' }}
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
                      disabled={form.formState.isSubmitting || isLoadingGemini}
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
                      disabled={form.formState.isSubmitting || isLoadingGemini}
                      type="color"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="grid gap-3 sm:grid-cols-2 sm:gap-0">
              <Button disabled={form.formState.isSubmitting || isLoadingGemini}>
                Salvar
              </Button>

              <SheetClose className="w-full" asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={form.formState.isSubmitting || isLoadingGemini}
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
