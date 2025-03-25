import { useQuery } from '@tanstack/react-query'
import { getAllTypePresentation } from './api.service'

export const useGetAllTypePresentation = () =>
  useQuery({
    queryKey: ['type-presentation'],
    queryFn: getAllTypePresentation,
    gcTime: 1800000, // 30 minutos en milisegundos
    staleTime: 1800000, // 30 minutos en milisegundos
  })
