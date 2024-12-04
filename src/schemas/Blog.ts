import { z } from 'zod'

export const CreateBlogSchema = z.object({
  subtitle: z
    .string()
    .min(1, { message: 'O título é obrigatório' })
    .max(60, { message: 'Deve ter no máximo 60 caracteres' }),
  slug: z
    .string()
    .min(1, { message: 'O slug é obrigatório' })
    .max(60, { message: 'Deve ter no máximo 60 caracteres' }),
  mainColor: z.string(),
  secondColor: z.string(),
})
