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
})
