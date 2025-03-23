import * as z from 'zod'

export const productFormSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre del producto debe tener al menos 2 caracteres.',
  }),
  category: z.string().min(1, {
    message: 'Por favor selecciona una categoría.',
  }),
  type: z.string().min(1, {
    message: 'Por favor selecciona un tipo.',
  }),
  presentation: z.string().min(1, {
    message: 'Por favor selecciona una presentación.',
  }),
  description: z.string().optional(),
  status: z.string().min(1, {
    message: 'Por favor selecciona un estado.',
  }),
})
