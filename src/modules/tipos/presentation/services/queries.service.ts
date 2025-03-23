import { useQuery } from '@tanstack/react-query'
import { getAllTypePresentation } from './api.service'

export const useGetAllTypePresentation = () =>
  useQuery({
    queryKey: ['type-presentation'],
    queryFn: getAllTypePresentation,
    gcTime: 200000,
    staleTime: 200000,
  })
