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
import { signup } from '../actions'
import { toast } from 'sonner'

import { UserSignupInput, UserSignUpSchema } from '../schema'
import { useRouter } from 'next/navigation'

export const FormSignUp = () => {
  const { push } = useRouter()
  const form = useForm<UserSignupInput>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  })
  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: UserSignupInput) => {
    try {
      const response = await signup(data)
      if (response?.error) {
        toast.error(response.error)
        return
      }
      toast.success('Cadastro realizado com sucesso!')
      push(`/auth/signin`)
    } catch {
      toast.error('Erro inesperado ao tentar cadastrar. Tente novamente.')
    }
  }

  return (
    <Form {...form}>
      {/* email */}

      <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu nome"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </form>
    </Form>
  )
}
