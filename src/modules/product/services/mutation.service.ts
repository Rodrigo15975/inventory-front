import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct, deleteProduct, updateProduct } from './api.service'
import { CreateProduct, UpdateProduct } from '../types/type.product'
import { AxiosError } from 'axios'

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    mutationKey: ['create-product'],
    mutationFn: (data: CreateProduct) => createProduct(data),
    onSuccess: async (newData) => {
      const { message: description } = newData
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({ queryKey: ['movements'] }),
        queryClient.invalidateQueries({ queryKey: ['products-actives'] }),
      ])
      toast({ title: 'Producto', description })
    },
    onError: (error: AxiosError) => {
      const { message: description } = error.response?.data as {
        message: string
      }
      toast({
        title: 'Product',
        variant: 'destructive',
        description: description || 'Error al crear la categoría',
      })
    },
  })
}
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    mutationKey: ['update-product'],
    mutationFn: (data: UpdateProduct) => updateProduct(data),
    onSuccess: async (newData) => {
      const { message: description } = newData
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({ queryKey: ['movements'] }),
        queryClient.invalidateQueries({ queryKey: ['products-actives'] }),
      ])
      toast({ title: 'Producto', description })
    },
    onError: (error: AxiosError) => {
      const { message: description } = error.response?.data as {
        message: string
      }
      toast({
        title: 'Product',
        variant: 'destructive',
        description: description || 'Error al actualizar la categoría',
      })
    },
  })
}
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    mutationKey: ['delete-product'],
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: async (newData) => {
      const { message: description } = newData
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({ queryKey: ['movements'] }),
        queryClient.invalidateQueries({ queryKey: ['products-actives'] }),
      ])
      toast({
        title: 'Producto',
        description: description || 'Error al eliminar el producto',
      })
    },
    onError: (error: AxiosError) => {
      const { message: description } = error.response?.data as {
        message: string
      }
      toast({
        title: 'Product',
        variant: 'destructive',
        description: description || 'Error al eliminar la categoría',
      })
    },
  })
}
