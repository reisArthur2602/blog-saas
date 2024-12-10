'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { Textarea } from '@/components/ui/textarea'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet'

import { Plus, Zap } from 'lucide-react'

import { createBlog } from '../actions'
import { sendPromptToGemini } from '@/lib/gemini'
import { BlogInput, UpsertBlogSchema } from '../schemas'
import { toast } from 'sonner'

type GeminiResult = {
  name: string
  slug: string
  description: string
}

export const CreateBlog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [aiGeneratedBlog, setAIGeneratedBlog] = useState<GeminiResult | null>(
    null,
  )

  const form = useForm<BlogInput>({
    resolver: zodResolver(UpsertBlogSchema),
    defaultValues: {
      slug: '',
      description: '',
      name: '',
      secondColor: '#000000',
      mainColor: '#FFFFFF',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const isDisabled = isSubmitting || isLoadingAI

  const handleGenerateAI = async () => {
    setIsLoadingAI(true)
    try {
      const result = await sendPromptToGemini({
        prompt: `
          Escreva um blog sobre qualquer tema de sua escolha. Crie sempre algo diferente e não repita, porém responda no formato JSON.
          Siga esse exemplo e respeite as regras abaixo:
          {
            "name": "Título do blog (max. 60 caracteres)",
            "description": "Descrição do blog (max. 191 caracteres)",
            "slug": "Slug do blog (max. 191 caracteres, siga o regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/)" 
          }
        `,
      })
      setAIGeneratedBlog(result)
    } finally {
      setIsLoadingAI(false)
    }
  }

  useEffect(() => {
    if (aiGeneratedBlog) {
      form.reset({
        slug: aiGeneratedBlog.slug,
        description: aiGeneratedBlog.description,
        name: aiGeneratedBlog.name,
        secondColor: '#000000',
        mainColor: '#FFFFFF',
      })
    }
  }, [aiGeneratedBlog, form])

  const onSubmit = form.handleSubmit(async (data) => {
    const response = await createBlog(data)
    if (response?.error) {
      console.error(response.error)
      return
    }
    toast.success('Blog cadastrado com sucesso')
    form.reset()
    setIsOpen(false)
  })

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
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
          <Button size="sm" onClick={handleGenerateAI} disabled={isDisabled}>
            <Zap /> {isLoadingAI ? 'Gerando blog...' : 'Gerar com IA'}
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
                      {...field}
                      disabled={isDisabled}
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
                      {...field}
                      disabled={isDisabled}
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
                      {...field}
                      disabled={isDisabled}
                      style={{ resize: 'none', height: '120px' }}
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
                    <Input type="color" {...field} disabled={isDisabled} />
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
                    <Input type="color" {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="grid gap-3 sm:grid-cols-2 sm:gap-0">
              <Button type="submit" disabled={isDisabled}>
                Salvar
              </Button>
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isDisabled}
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
