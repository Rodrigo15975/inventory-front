import { useQuery } from '@tanstack/react-query'
import { getAllTypeProduct } from './api.service'

export const useGetAllTypeProduct = () =>
  useQuery({
    queryKey: ['type-product'],
    queryFn: getAllTypeProduct,
    gcTime: 200000,
    staleTime: 200000,
  })
