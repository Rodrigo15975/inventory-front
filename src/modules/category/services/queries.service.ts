import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllCategories } from './api.service'

export const useGetAllCategories = (page: number, size: number) =>
  useQuery({
    queryKey: ['categories', page, size],
    queryFn: () => getAllCategories(page, size),
    gcTime: 200000,
    staleTime: 200000,
    placeholderData: keepPreviousData,
  })
