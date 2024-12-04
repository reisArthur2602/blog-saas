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
import { CreateBlogSchema } from '@/schemas/Blog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Zap } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const CreateBlogSheet = () => {
  const form = useForm<z.infer<typeof CreateBlogSchema>>({
    resolver: zodResolver(CreateBlogSchema),
    defaultValues: {
      secondColor: '#000000',
      mainColor: '#FFFFFF',
      slug: '',
      subtitle: '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => console.log(data))

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full">
          <Plus /> Criar Blog
        </Button>
      </SheetTrigger>

      <SheetContent className="space-y-6">
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
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite um título"
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
