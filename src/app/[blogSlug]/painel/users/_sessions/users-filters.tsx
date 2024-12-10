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
import { formatRole } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Filter, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BlogUserFiltersInput, BlogUserFiltersSchema } from '../schemas'
import { USER_ROLES } from '../constants'

export const UsersFilters = ({ blogSlug }: { blogSlug: string }) => {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') ?? ''
  const role = searchParams.get('role') ?? ''

  const { replace } = useRouter()

  const form = useForm<BlogUserFiltersInput>({
    resolver: zodResolver(BlogUserFiltersSchema),
    defaultValues: {
      name,
      role,
    },
  })

  const onFilter = form.handleSubmit((data) => {
    const params = new URLSearchParams()

    if (data.name) params.set('name', data.name)
    if (data.role) params.set('role', data.role)

    replace(`/${blogSlug}/painel/users?${params.toString()}`, { scroll: false })
  })

  const onClearFilters = () => {
    form.reset()
    replace(`/${blogSlug}/painel/users`, { scroll: false })
  }

  return (
    <Form {...form}>
      <form
        className="w-full flex items-center justify-between"
        onSubmit={onFilter}
      >
        <div className="grid grid-cols-[300px_280px] gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Buscar por nome"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Cargo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="capitalize">
                    {USER_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {formatRole(role)}
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
  )
}
