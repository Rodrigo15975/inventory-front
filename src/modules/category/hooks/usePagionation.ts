import { useState } from 'react'
import { useGetAllCategories } from '../services/queries.service'

export const usePaginatioCategories = () => {
  const [page, setPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<string>('10')
  const perPage: number = parseInt(itemsPerPage)
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetAllCategories(page, perPage)

  const totalItems = categoriesData?.count || 0
  const totalPages = Math.ceil(totalItems / perPage)

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }
  return {
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    perPage,
    isErrorCategories,
    categoriesData,
    isLoadingCategories,
    totalItems,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  }
}
