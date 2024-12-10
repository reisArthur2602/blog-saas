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

export const EditBlogUserSchema = z.object({
  role: z.nativeEnum(UserRole),
})

export const BlogUserFiltersSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
})
export type EditBlogUserInput = z.infer<typeof EditBlogUserSchema>
export type BlogUserInput = z.infer<typeof CreateBlogUserSchema>
export type BlogUserFiltersInput = z.infer<typeof BlogUserFiltersSchema>
