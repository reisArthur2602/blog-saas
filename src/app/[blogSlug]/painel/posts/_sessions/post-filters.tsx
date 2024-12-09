'use client'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Filter, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { POST_CATEGORIES } from './create-post'

const PostsFiltersSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
})

type PostsFiltersInput = z.infer<typeof PostsFiltersSchema>

export const PostFilters = ({ blogSlug }: { blogSlug: string }) => {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') ?? ''
  const category = searchParams.get('category') ?? ''

  const { push } = useRouter()

  const form = useForm<PostsFiltersInput>({
    resolver: zodResolver(PostsFiltersSchema),
    defaultValues: {
      name,
      category,
    },
  })

  const onFilter = form.handleSubmit((data) => {
    const params = new URLSearchParams()

    if (data.name) params.set('name', data.name)
    if (data.category) params.set('category', data.category)

    push(`/${blogSlug}/painel/posts?${params.toString()}`)
  })

  const onClearFilters = () => {
    form.reset()
    push(`/${blogSlug}/painel/posts`)
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="w-full flex items-center justify-between"
          onSubmit={onFilter}
        >
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Buscar por autor"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="capitalize w-fit">
                      {POST_CATEGORIES.map(({ value, name }) => (
                        <SelectItem key={value} value={value}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="w-fit"
              type="button"
              onClick={onClearFilters}
              size={'sm'}
            >
              <X />
              <span>Remover Filtros</span>
            </Button>
            <Button
              type="submit"
              variant="secondary"
              className="w-fit"
              size={'sm'}
            >
              <Filter />
              <span>Filtrar Resultados</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
