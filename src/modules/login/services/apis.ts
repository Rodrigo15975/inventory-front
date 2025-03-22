import { methodsAxios } from '@/utils/common/adapters/adapters-axios'
import { AUTH } from '@/utils/common/path-services'
import { Login, ResponseLogin } from '../types/login.type'
import { ApiResponse } from '@/utils/api.response'

export const authLogin = async (data: Login) => {
  delete data.rememberPassword
  return await methodsAxios.POST<ResponseLogin, Login>(AUTH, data)
}

export const logout = async () =>
  await methodsAxios.DELETE<ApiResponse>('/auth/logout', {
    withCredentials: true,
  })
