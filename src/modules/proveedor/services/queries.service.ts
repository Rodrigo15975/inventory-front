import { useQuery } from '@tanstack/react-query'
import { getOneProveedor } from './api.service'

export const useGetProvider = () =>
  useQuery({
    queryKey: ['provider'],
    queryFn: () => getOneProveedor(),
    gcTime: 4800000,
    staleTime: 4800000,
  })
