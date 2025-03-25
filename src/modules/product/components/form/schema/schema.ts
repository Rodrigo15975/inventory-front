import * as z from 'zod'

export const productFormSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre del producto debe tener al menos 2 caracteres.',
  }),
  categoryId: z.string().min(1, {
    message: 'Por favor selecciona una categoría.',
  }),
  typeProductId: z.string().min(1, {
    message: 'Por favor selecciona un tipo.',
  }),
  typePresentationId: z.string().min(1, {
    message: 'Por favor selecciona una presentación.',
  }),
  description: z.string().optional(),

  is_active: z.string().min(1, {
    message: 'Por favor selecciona un estado.',
  }),
})
