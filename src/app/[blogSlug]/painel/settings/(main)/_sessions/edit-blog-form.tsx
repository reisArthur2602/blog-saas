'use client'

import { useForm } from 'react-hook-form'
import { SettingsBlog } from '../actions'

import { zodResolver } from '@hookform/resolvers/zod'
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
import { Button } from '@/components/ui/button'
import { BlogInput, UpsertBlogSchema } from '@/app/admin/(main)/schemas'

const EditBlogForm = ({ settings }: { settings: SettingsBlog }) => {
  const form = useForm<BlogInput>({
    resolver: zodResolver(UpsertBlogSchema),
    defaultValues: {
      slug: settings?.slug ?? '',
      description: settings?.description ?? '',
      name: settings?.name ?? '',
      secondColor: settings?.secondColor ?? '#000000',
      mainColor: settings?.mainColor ?? '#FFFFFF',
    },
  })

  const isLoading = form.formState.isSubmitting

  return (
    <>
      <Form {...form}>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} disabled={isLoading} />
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
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <FormField
              control={form.control}
              name="mainColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor Principal</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} disabled={isLoading} />
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
                    <Input type="color" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                    disabled={isLoading}
                    style={{ resize: 'none', height: '120px' }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default EditBlogForm
