import { create } from 'zustand'
import { UpdateCategory } from '@/modules/category/types/category.types'

interface CategoryStoreUpdate {
  dataUpdateCategory: UpdateCategory
  updateCategory: (data: UpdateCategory) => void
}

export const useCategoryStoreUpdate = create<CategoryStoreUpdate>((set) => ({
  updateCategory: (dataUpdateCategory) => {
    console.log({
      dataUpdateCategory,
    })

    set({
      dataUpdateCategory,
    })
  },
  dataUpdateCategory: {},
}))
