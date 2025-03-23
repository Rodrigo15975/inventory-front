export interface TypePresentation {
  id: string
  name: string
  updatedAt?: string
  createdAt?: string
}

export type CreateTypePresentation = Omit<
  TypePresentation,
  'id' | 'updatedAt' | 'createdAt'
>
export type UpdateTypePresentation = Partial<TypePresentation>
