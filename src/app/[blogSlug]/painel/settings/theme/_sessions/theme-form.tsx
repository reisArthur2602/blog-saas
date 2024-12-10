'use client'

import { useTheme } from 'next-themes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormField, FormItem } from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import { ThemePreview } from './theme-preview'

const ThemeFormSchema = z.object({
  theme: z.string(),
})

type ThemeInput = z.infer<typeof ThemeFormSchema>

export const ThemeForm = () => {
  const { theme, setTheme } = useTheme()

  const form = useForm<ThemeInput>({
    resolver: zodResolver(ThemeFormSchema),
    defaultValues: { theme: theme ?? 'light' },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = (data: ThemeInput) => {
    setTheme(data.theme)
    toast.success(
      `Tema alterado para ${data.theme === 'light' ? 'claro' : 'escuro'}!`,
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <ThemePreview
                  value="light"
                  label="Light"
                  previewClasses="bg-white text-black"
                />
                <ThemePreview
                  value="dark"
                  label="Dark"
                  previewClasses="bg-slate-950 text-white"
                />
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </form>
    </Form>
  )
}
