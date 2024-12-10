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

import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'

import { signin } from '../actions'

import { UserSigninInput, UserSignInSchema } from '../schema'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const FormSignin = () => {
  const { push } = useRouter()
  const form = useForm<UserSigninInput>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: UserSigninInput) => {
    try {
      const response = await signin(data)
      if (response?.error) {
        toast.error(response.error)
        return
      }
      toast.success('Login realizado com sucesso!')
      push(`/admin`)
    } catch {
      toast.error('Ocorreu um erro ao tentar acessar. Tente novamente.')
    }
  }

  return (
    <Form {...form}>
      {/* email */}

      <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  type="password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading}>
          {isLoading ? 'Acessando...' : 'Acessar'}
        </Button>
      </form>
    </Form>
  )
}
