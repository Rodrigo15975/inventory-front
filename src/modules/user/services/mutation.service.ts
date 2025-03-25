import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser, deleteUser, updateUser } from './api.service'
import { useToast } from '@/hooks/use-toast'
import { AxiosError } from 'axios'

export const useCreateUser = () => {
  const useClient = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    mutationKey: ['create-user'],
    mutationFn: createUser,
    onSuccess: async (newData) => {
      await useClient.invalidateQueries({ queryKey: ['users'] })
      const { message } = newData
      toast({
        title: 'Usuario',
        description: message,
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        title: 'Usuario',
        description: message,
        variant: 'destructive',
      })
    },
  })
}

export const useUpdateUser = (id_user_in_system?: boolean) => {
  const useClient = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    mutationKey: ['update-user'],
    mutationFn: updateUser,
    onSuccess: async (newData) => {
      await useClient.invalidateQueries({ queryKey: ['users'] })
      if (id_user_in_system)
        await useClient.invalidateQueries({ queryKey: ['profile'] })

      const { message } = newData
      toast({
        title: 'Usuario',
        description: message,
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        title: 'Usuario',
        description: message,
        variant: 'destructive',
      })
    },
  })
}
export const useDeleteUser = () => {
  const useClient = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    mutationKey: ['delete-user'],
    mutationFn: deleteUser,
    onSuccess: async (newData) => {
      await useClient.invalidateQueries({ queryKey: ['users'] })
      const { message } = newData
      toast({
        title: 'Usuario',
        description: message,
      })
    },
    onError: (error: AxiosError) => {
      const { message } = error.response?.data as any
      toast({
        title: 'Usuario',
        description: message,
        variant: 'destructive',
      })
    },
  })
}
