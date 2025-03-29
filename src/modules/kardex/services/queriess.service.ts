import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllMovements } from './apis.service'

export const useGetAllMovements = (page: number, size: number) =>
  useQuery({
    queryKey: ['movements', page, size],
    queryFn: () => getAllMovements(page, size),
    gcTime: 1800000, // 30 minutos en milisegundos
    staleTime: 1800000, // 30 minutos en milisegundos
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
