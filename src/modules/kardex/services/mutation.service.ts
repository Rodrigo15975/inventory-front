import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMovement } from './apis.service'
import { CreateMovement } from '../types/kardex.types'
import { useToast } from '@/hooks/use-toast'
import { AxiosError } from 'axios'

export const useCreateMovements = () => {
  const useClient = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    mutationKey: ['create-movements'],
    mutationFn: (data: CreateMovement) => createMovement(data),
    onSuccess: async (data) => {
      const { message } = data
      await Promise.all([
        useClient.invalidateQueries({ queryKey: ['movements'] }),
        useClient.invalidateQueries({ queryKey: ['products-actives'] }),
      ])
      toast({ title: 'Movimiento', description: message })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        title: 'Movimiento',
        description: message,
        variant: 'destructive',
      })
    },
  })
}
