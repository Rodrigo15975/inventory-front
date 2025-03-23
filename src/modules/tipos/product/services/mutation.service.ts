import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import {
  createTypeProduct,
  deleteTypeProduct,
  updateTypeProduct,
} from './api.service'
import { CreateTypeProduct, UpdateTypeProduct } from '../types/type-production'

export const useCreateTypePorudct = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-type-product'],
    mutationFn: (data: CreateTypeProduct) => createTypeProduct(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['type-product'] })
      const { message } = data
      toast({
        title: 'Tipo de product',
        description: message,
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        variant: 'destructive',
        title: 'Tipo de product',
        description: message || 'Error al crear el tipo de product',
      })
    },
  })
}
export const useUpdateTypePorudct = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['update-type-product'],
    mutationFn: (data: UpdateTypeProduct) => updateTypeProduct(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['type-product'] })
      const { message } = data
      toast({
        title: 'Tipo de product',
        description: message,
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        variant: 'destructive',
        title: 'Tipo de product',
        description: message || 'Error al actualizar el tipo de product',
      })
    },
  })
}

export const useDeleteTypePorudct = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-type-product'],
    mutationFn: (id: string) => deleteTypeProduct(id),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['type-product'] })
      const { message } = data
      toast({
        title: 'Tipo de product',
        description: message,
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        variant: 'destructive',
        title: 'Tipo de product',
        description: message || 'Error al eliminar el tipo de product',
      })
    },
  })
}
