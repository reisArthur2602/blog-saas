import { z } from 'zod'

export const UpsertBlogSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'O título é obrigatório' })
    .max(60, { message: 'Deve ter no máximo 60 caracteres' }),
  slug: z
    .string()
    .min(1, { message: 'O slug é obrigatório' })
    .max(60, { message: 'Deve ter no máximo 60 caracteres' }),
  description: z.string().optional(),
  mainColor: z.string(),
  secondColor: z.string(),
})

export type BlogInput = z.infer<typeof UpsertBlogSchema>
