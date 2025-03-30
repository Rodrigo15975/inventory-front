import { z } from 'zod'
export const formSchema = z.object({
  typePresentationId: z.string().min(1, 'La presentación es requerida'),
  categoryId: z.string().min(1, 'La categoría es requerida'),
  typeProductId: z.string().min(1, 'El tipo de producto es requerido'),
  movementTypeId: z.string().min(1, 'El tipo de movimiento es requerido'),
  productId: z.string().min(1, 'El producto es requerido'),
  entry: z.string().optional().nullable(),
  exit: z.string().optional().nullable(),
  description: z.string().optional(),
})

export const valuesInitials: z.infer<typeof formSchema> = {
  typePresentationId: '',
  categoryId: '',
  typeProductId: '',
  movementTypeId: '',
  productId: '',
  entry: null,
  exit: null,
  description: '',
}
