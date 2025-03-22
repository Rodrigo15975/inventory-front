import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { authLogin, logout } from './apis'
import { setAuthTokenAction } from './setCookie'
import { useToast } from '@/hooks/use-toast'
export const useAuthLogin = () => {
  const { toast } = useToast()
  const router = useRouter()

  return useMutation({
    mutationFn: authLogin,
    onSuccess: async (data) => {
      const { auth, message, exp } = data
      await setAuthTokenAction(auth, exp)
      toast({
        title: 'Bienvenido',
        description: message,
      })
      router.push('/product', {
        scroll: false,
      })
    },
    onError(error: AxiosError<{ message: string }>) {
      console.error(error)
      if (error.message) {
        toast({
          title: `${error.response?.data.message}`,
          'aria-activedescendant': error.message,
          className: 'bg-gradient-to-t from-orange-200 to-orange-200',
        })
      }
    },
  })
}

export const useLogout = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: logout,
    async onSuccess(data) {
      const { message } = data
      await queryClient.cancelQueries()
      queryClient.clear()
      router.push('/login', {
        scroll: false,
      })
      toast({
        title: 'Sesion cerrada',
        description: message,
      })
    },
    onError(error: AxiosError) {
      console.error(error)

      toast({
        title: 'Error al cerrar sesión',
        'aria-activedescendant': error.message,
        variant: 'destructive',
      })
    },
  })
}
