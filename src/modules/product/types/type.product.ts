export type GetAllProducts = {
  data: {
    id: string
    name: string
    availableQuantity: 0
    is_active: true
    description: null
    updatedAt: string | Date
    createdAt: string | Date
    category: {
      id: string
      name: string
      is_active: false
      description: string
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
  count: number
  status: number
}

export interface GetAllProductsActives {
  data: {
    id: string
    name: string
    availableQuantity: 0
    is_active: true
    description: null
    updatedAt: string | Date
    createdAt: string | Date
    category: {
      id: string
      name: string
      is_active: false
      description: string
    }
    movements: {
      balance: number
    }[]
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

export interface ProductFormValues {
  name: string
  categoryId: string
  typeProductId: string
  typePresentationId: string
  description?: string
  is_active: string
}

export type CreateProduct = ProductFormValues
export type UpdateProduct = Partial<ProductFormValues> & {
  id?: string
}
