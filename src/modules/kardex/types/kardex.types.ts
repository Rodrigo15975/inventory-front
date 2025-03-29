export type MovementsActives = {
  idMovement: string
  productName: string
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
    }
    category: {
      id: string
      name: string
    }
    moventType: {
      id: string
      name: string
    }
    TypePresentation: {
      id: string
      name: string
    }
    typeProduct: {
      id: string
      name: string
    }
  }[]
}

export type MovementItem = Movements['data'][0]
