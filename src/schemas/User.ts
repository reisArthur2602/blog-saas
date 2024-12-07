import { z } from 'zod'

export const UserSignUpSchema = z.object({
  name: z.string().trim().min(1, { message: 'O nome é obrigatório' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'O email é obrigatório' })
    .email('Formato inválido'),
  password: z.string().min(6, { message: 'Deve ter no mínimo 6 caracteres' }),
})

export const UserSignInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'O email é obrigatório' })
    .email('Formato inválido'),
  password: z.string().min(6, { message: 'Deve ter no mínimo 6 caracteres' }),
})

export type UserSigninInput = z.infer<typeof UserSignInSchema>
export type UserSignupInput = z.infer<typeof UserSignUpSchema>
