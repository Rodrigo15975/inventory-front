import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateProvider, UpdateProvider } from '../types/types.proveedor'
import { createProvider, deleteProvider, updateProvider } from './api.service'
import { useToast } from '@/hooks/use-toast'
import { AxiosError } from 'axios'

export const useCreateProvider = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-provider'],
    mutationFn: (data: CreateProvider) => createProvider(data),
    onSuccess: async (data) => {
      const { message } = data
      await queryClient.invalidateQueries({ queryKey: ['provider'] })
      toast({ title: 'Proveedor', description: message })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        title: 'Proveedor',
        description: message,
        variant: 'destructive',
      })
    },
  })
}
export const useDeleteProvider = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-provider'],
    mutationFn: (id: string) => deleteProvider(id),
    onSuccess: async (data) => {
      const { message } = data
      await queryClient.invalidateQueries({ queryKey: ['provider'] })
      toast({ title: 'Proveedor', description: message })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        title: 'Proveedor',
        description: message,
        variant: 'destructive',
      })
    },
  })
}
export const useUpdateProvider = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['update-provider'],
    mutationFn: (data: UpdateProvider) => updateProvider(data),
    onSuccess: async (data) => {
      const { message } = data
      await queryClient.invalidateQueries({ queryKey: ['provider'] })
      toast({ title: 'Proveedor', description: message })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        title: 'Proveedor',
        description: message,
        variant: 'destructive',
      })
    },
  })
}
