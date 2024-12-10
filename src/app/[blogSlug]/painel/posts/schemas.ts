import { PostCategory } from '@prisma/client'
import { z } from 'zod'

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'O título é obrigatório' })
    .max(60, { message: 'Deve ter no máximo 60 caracteres' }),
  subtitle: z
    .string()
    .min(1, { message: 'O subtítulo é obrigatório' })
    .max(60, { message: 'Deve ter no máximo 60 caracteres' }),
  body: z.string().min(1, { message: 'O corpo da publicação é obrigatório' }),
  category: z.nativeEnum(PostCategory),
})

export const EditPostSchema = z.object({
  title: z
    .string()
    .max(60, { message: 'Deve ter no máximo 60 caracteres' })
    .optional(),
  subtitle: z
    .string()

    .max(60, { message: 'Deve ter no máximo 60 caracteres' })
    .optional(),
  body: z.string().optional(),
  category: z.nativeEnum(PostCategory).optional(),
})

export type PostInput = z.infer<typeof CreatePostSchema>

export type EditPostInput = z.infer<typeof EditPostSchema>
