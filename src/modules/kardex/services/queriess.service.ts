import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllMovements, getAllTypeMovements } from './apis.service'

export const useGetAllMovements = (
  page: number,
  size: number,
  search?: string,
  endDate?: string,
  startDate?: string
) =>
  useQuery({
    queryKey: ['movements', page, size, search, endDate, startDate],
    queryFn: () => getAllMovements(page, size, search, endDate, startDate),
    gcTime: 1800000, // 30 minutos en milisegundos
    staleTime: 1800000, // 30 minutos en milisegundos
    placeholderData: keepPreviousData,
  })

export const useGetAllTypeMovements = () =>
  useQuery({
    queryKey: ['type-movements'],
    queryFn: () => getAllTypeMovements(),
    gcTime: 8800000, // 30 minutos en milisegundos
    staleTime: 8800000, // 30 minutos en milisegundos
    placeholderData: keepPreviousData,
  })

// export const useGetAllMovementsActives = () =>
//   useQuery({
//     queryKey: ['movements'],
//     queryFn: () => getAllMovementsActives(),
//     gcTime: 1800000, // 30 minutos en milisegundos
//     staleTime: 1800000, // 30 minutos en milisegundos
//     placeholderData: keepPreviousData,
//   })
