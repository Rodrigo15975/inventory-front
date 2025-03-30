import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllProducts, getAllProductsActives } from './api.service'

export const useGetAllProducts = (page: number, size: number) =>
  useQuery({
    queryKey: ['products', page, size],
    queryFn: () => getAllProducts(page, size),
    gcTime: 1800000, // 30 minutos en milisegundos
    staleTime: 1800000, // 30 minutos en milisegundos
    placeholderData: keepPreviousData,
  })

export const useGetAllProductsActives = () =>
  useQuery({
    queryKey: ['products-actives'],
    queryFn: () => getAllProductsActives(),
    gcTime: 1800000, // 30 minutos en milisegundos
    staleTime: 1800000, // 30 minutos en milisegundos
    placeholderData: keepPreviousData,
  })
