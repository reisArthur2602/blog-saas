import { UserRole } from '@prisma/client'
import { z } from 'zod'

export const CreateBlogUserSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'O email é obrigatório' })
    .email('Formato inválido'),
  role: z.nativeEnum(UserRole),
})

export type BlogUserInput = z.infer<typeof CreateBlogUserSchema>
