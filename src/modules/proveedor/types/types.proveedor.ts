import { z } from 'zod'
import { formSchema } from '../components/form/schemas/schema'

export type Provider = {
  proveedor: {
    id: string
    phone: string
    ruc: string
    corporate_reason: string
    businessName: string
    legalRepresentative: string
    address: string
  }
  status: number
}

export type FormValues = z.infer<typeof formSchema>

export type CreateProvider = FormValues
export type UpdateProvider = Partial<FormValues> & {
  id?: string
}
