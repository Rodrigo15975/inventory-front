import { useGetAllActivesCategories } from '@/modules/category/services/queries.service'
import { useGetAllTypePresentation } from '@/modules/tipos/presentation/services/queries.service'
import { useGetAllTypeProduct } from '@/modules/tipos/product/services/queries.service'

export const useGetAllSelectToCreateProducts = () => {
  const { data: getActivesCategories } = useGetAllActivesCategories()
  const { data: getAllTypePresentation } = useGetAllTypePresentation()
  const { data: getAllTypeProduct } = useGetAllTypeProduct()

  return {
    getActivesCategories,
    getAllTypePresentation,
    getAllTypeProduct,
  }
}
