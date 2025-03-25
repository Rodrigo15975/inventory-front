import { useQuery } from '@tanstack/react-query'
import { getAllTypeProduct } from './api.service'

export const useGetAllTypeProduct = () =>
  useQuery({
    queryKey: ['type-product'],
    queryFn: getAllTypeProduct,
    gcTime: 1800000, // 30 minutos en milisegundos
    staleTime: 1800000, // 30 minutos en milisegundos
  })
