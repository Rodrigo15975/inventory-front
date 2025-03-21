import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { authLogin } from './apis'
import { setAuthTokenAction } from './setCookie'
import { useToast } from '@/hooks/use-toast'
export const useAuthLogin = () => {
  const { toast } = useToast()
  const router = useRouter()

  return useMutation({
    mutationFn: authLogin,
    onSuccess: async (data) => {
      const { auth } = data
      console.log({
        data,
      })

      await setAuthTokenAction(auth)
      router.push('/dashboard', {
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

// export const useLogout = () => {
//   const { toast } = useToast()
//   const queryClient = useQueryClient()
//   const router = useRouter()

//   return useMutation({
//     mutationFn: logout,
//     async onSuccess(data) {
//       if (data) {
//         const { auth } = data
//         await setAuthToken(auth)
//         router.push('/', {
//           scroll: false,
//         })
//         await queryClient.cancelQueries()
//         queryClient.clear()
//       }
//     },
//     onError(error: AxiosError) {
//       toast({
//         title: 'Error al cerrar sesión',
//         'aria-activedescendant': error.message,
//         variant: 'destructive',
//       })
//     },
//   })
// }
