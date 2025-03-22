import * as z from 'zod'

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre debe tener al menos 1 caracteres')
    .max(50, 'Máximo 50 caracteres'),
  description: z.string().max(200, 'Máximo 200 caracteres').optional(),
})
