export interface TypeProduct {
  id: string
  name: string
}

export type CreateTypeProduct = Omit<TypeProduct, 'id'>
export type UpdateTypeProduct = Partial<TypeProduct>
