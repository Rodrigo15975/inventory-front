import { create } from 'zustand'
import { UpdateProduct } from '../types/type.product'

interface Store {
  dataProductUpdate: UpdateProduct
  setUpdateProductData: (data: UpdateProduct) => void
}

export const useDataUpdateProduct = create<Store>((set) => ({
  setUpdateProductData: (dataProductUpdate) => {
    set({
      dataProductUpdate,
    })
  },
  dataProductUpdate: {},
}))
