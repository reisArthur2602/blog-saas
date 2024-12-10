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
import { POST_CATEGORIES } from '../contants'
import { formatCategoryPost } from '@/lib/utils'

const PostsFiltersSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
})

type PostsFiltersInput = z.infer<typeof PostsFiltersSchema>

export const PostFilters = ({ blogSlug }: { blogSlug: string }) => {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const name = searchParams.get('name') ?? ''
  const category = searchParams.get('category') ?? ''

  const form = useForm<PostsFiltersInput>({
    resolver: zodResolver(PostsFiltersSchema),
    defaultValues: {
      name,
      category,
    },
  })

  const isLoading = form.formState.isSubmitting

  const onFilter = (data: PostsFiltersInput) => {
    const params = new URLSearchParams()

    if (data.name) params.set('name', data.name)
    if (data.category) params.set('category', data.category)

    replace(`/${blogSlug}/painel/posts?${params.toString()}`, { scroll: false })
  }

  const onClearFilters = () => {
    form.reset()
    replace(`/${blogSlug}/painel/posts`, { scroll: false })
  }

  return (
    <Form {...form}>
      <form
        className="w-full flex items-center justify-between"
        onSubmit={form.handleSubmit(onFilter)}
      >
        <div className="grid grid-cols-[300px_280px] gap-2 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Buscar por autor"
                    disabled={isLoading}
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
                  <SelectContent className="capitalize truncate">
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
            disabled={isLoading}
          >
            <X />
            <span>Remover Filtros</span>
          </Button>
          <Button
            type="submit"
            variant="secondary"
            className="w-fit"
            size={'sm'}
            disabled={isLoading}
          >
            <Filter />
            <span>Filtrar Resultados</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
