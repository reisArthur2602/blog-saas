import { z } from 'zod'

export const UserSignInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'O email é obrigatório' })
    .email('Formato inválido'),
  password: z.string().min(6, { message: 'Deve ter no mínimo 6 caracteres' }),
})

export type UserSigninInput = z.infer<typeof UserSignInSchema>
