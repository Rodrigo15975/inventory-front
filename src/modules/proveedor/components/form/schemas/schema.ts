import { FormValues } from '@/modules/proveedor/types/types.proveedor'
import { z } from 'zod'
export const formSchema = z.object({
  corporate_reason: z.string().min(2, {
    message: 'La razón social es requerida',
  }),

  numberRuc: z.string().min(1, {
    message: 'El RUC debe tener 11 dígitos numéricos.',
  }),

  legalRepresentative: z.string().min(1, {
    message: 'El nombre del representante legal es requerido',
  }),

  address: z
    .string()
    .min(1, {
      message: 'La dirección es requerida',
    })
    .optional(),

  phone: z
    .string()
    .regex(/^\d{9}$/, {
      message: 'El teléfono debe tener 9 dígitos numéricos.',
    })
    .optional(),
})

export const initialValues: FormValues = {
  corporate_reason: '',
  numberRuc: '',
  legalRepresentative: '',
  address: '',
  phone: '',
}
