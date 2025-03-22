export interface Category {
  data: {
    id: string
    name: string
    description?: string
    is_active: boolean
    updatedAt: string
    createdAt: string
  }[]
  count: number
  status: number
}

export type CreateCategory = Pick<
  Category['data'][number],
  'name' | 'description'
>

export type UpdateCategory = Partial<
  Pick<
    Category['data'][number],
    'name' | 'description' | 'is_active' | 'id' | 'updatedAt' | 'createdAt'
  >
>

export type RemoveCategory = Pick<
  Category['data'][number],
  'name' | 'description'
>
