import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  CreateCategory,
  Category,
  UpdateCategory,
} from '../types/category.types'
import { createCategory, removeCategory, updateCategory } from './api.service'
import { AxiosError } from 'axios'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const firstQuery = queryClient
    .getQueriesData({
      queryKey: ['categories'],
    })
    .map((query) => query[0])[0]

  return useMutation({
    mutationFn: (data: CreateCategory) => createCategory(data),
    onMutate: async (newCategory) => {
      await queryClient.cancelQueries({ queryKey: firstQuery })
      const previousCategories = queryClient.getQueryData<Category>(firstQuery)
      const tempId = Date.now().toString()

      queryClient.setQueryData(firstQuery, (oldData: Category) => {
        const { data: oldCategories, count } = oldData
        const alreadyExists = oldCategories.some(
          (category) => category.name === newCategory.name
        )
        if (alreadyExists) return oldData

        const updatedCategories = [
          {
            id: tempId,
            ...newCategory,
            is_active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          ...oldData.data,
        ]

        return {
          ...oldCategories,
          count: count + 1,
          data: updatedCategories,
        }
      })
      return {
        previousCategories,
        tempId,
      }
    },
    onSuccess: async (newData, _, context) => {
      const { message: description, data: newCategory } = newData

      queryClient.setQueryData<Category>(firstQuery, (oldData) => {
        if (!oldData || !oldData.data) return oldData

        const updatedData = oldData.data.map((category) =>
          category.id === context?.tempId
            ? { ...category, id: newCategory?.id ?? category.id }
            : category
        )
        const isUpdated = oldData.data.some(
          (category, index) => category.id !== updatedData[index].id
        )

        if (!isUpdated) return oldData

        return {
          ...oldData,
          data: oldData.data.map((category) =>
            category.id === context?.tempId
              ? { ...category, id: newCategory?.id ?? category.id }
              : category
          ),
        }
      })
      toast({ title: 'Categoria', description })
    },
    onError: (error: AxiosError, _, context) => {
      const { message: description } = error.response?.data as {
        message: string
      }
      console.log({
        error,
      })

      queryClient.setQueryData(firstQuery, context?.previousCategories)
      toast({
        title: 'Categoría',
        variant: 'destructive',
        description: description || 'Error al crear la categoría',
      })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: firstQuery })
    },
  })
}
export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (updatedData: UpdateCategory) =>
      updateCategory(updatedData, updatedData.id as string),

    onSuccess: async (newData) => {
      const { message: description } = newData
      await queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast({ title: 'Categoría', description })
    },
    onError: (error: AxiosError) => {
      const { message: description } = error.response?.data as {
        message: string
      }
      console.log({
        error,
      })
      toast({
        title: 'Categoría',
        description: description || 'Error al actualizar la categoría',
        variant: 'destructive',
      })
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (id: string) => removeCategory(id),

    onSuccess: async (newData) => {
      const { message: description } = newData
      await queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast({ title: 'Categoría', description })
    },
    onError: (error: AxiosError) => {
      const { message: description } = error.response?.data as {
        message: string
      }
      console.log({
        error,
      })
      toast({
        title: 'Categoría',
        description: description || 'Error al remover la categoría',
        variant: 'destructive',
      })
    },
  })
}
