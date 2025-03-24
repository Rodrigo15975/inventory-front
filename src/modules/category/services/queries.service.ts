import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllActivesCategories, getAllCategories } from './api.service'

export const useGetAllCategories = (page: number, size: number) =>
  useQuery({
    queryKey: ['categories', page, size],
    queryFn: () => getAllCategories(page, size),
    gcTime: 1800000, // 30 minutos en milisegundos
    staleTime: 1800000, // 30 minutos en milisegundos
    placeholderData: keepPreviousData,
  })

export const useGetAllActivesCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllActivesCategories(),
    gcTime: 1800000, // 30 minutos en milisegundos
    staleTime: 1800000, // 30 minutos en milisegundos
    placeholderData: keepPreviousData,
  })
