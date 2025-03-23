import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createTypePresentation,
  deleteTypePresentation,
  updateTypePresentation,
} from './api.service'
import {
  CreateTypePresentation,
  UpdateTypePresentation,
} from '../types/type-presentation'
import { useToast } from '@/hooks/use-toast'
import { AxiosError } from 'axios'

export const useCreateTypePresentation = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-type-presentation'],
    mutationFn: (data: CreateTypePresentation) => createTypePresentation(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['type-presentation'] })
      const { message } = data
      toast({
        title: 'Tipo de Presentación',
        description: message,
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        variant: 'destructive',
        title: 'Tipo de Presentación',
        description: message || 'Error al crear el tipo de presentación',
      })
    },
  })
}
export const useUpdateTypePresentation = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['update-type-presentation'],
    mutationFn: (data: UpdateTypePresentation) => updateTypePresentation(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['type-presentation'] })
      const { message } = data
      toast({
        title: 'Tipo de Presentación',
        description: message,
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        variant: 'destructive',
        title: 'Tipo de Presentación',
        description: message || 'Error al actualizar el tipo de presentación',
      })
    },
  })
}

export const useDeleteTypePresentation = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-type-presentation'],
    mutationFn: (id: string) => deleteTypePresentation(id),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['type-presentation'] })
      const { message } = data
      toast({
        title: 'Tipo de Presentación',
        description: message,
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        variant: 'destructive',
        title: 'Tipo de Presentación',
        description: message || 'Error al actualizar el tipo de presentación',
      })
    },
  })
}
