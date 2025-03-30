import { z } from 'zod'
import { formSchema } from '../components/form/schema/schema'

export interface TypeMovements {
  id: string
  name: string
}

export interface Movements {
  status: number
  total_balance: number
  remaining_balance: number
  total_entry: number
  total_exit: number
  count: number
  data: {
    id: string
    date: string
    entry: number
    exit: number
    balance: number
    description: string
    updatedAt: string
    createdAt: string
    product: {
      id: string
      name: string
      availableQuantity: number
      is_active: boolean
      description: string
      category: {
        id: string
        name: string
        description: string
        is_active: string
      }
      TypePresentation: {
        id: string
        name: string
      }
      typeProduct: {
        id: string
        name: string
      }
    }
    moventType: {
      id: string
      name: string
    }
  }[]
}

export type CreateMovement = z.infer<typeof formSchema>

export type MovementItem = Movements['data'][0]
