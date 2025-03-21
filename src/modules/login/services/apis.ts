'use server'
import { methodsAxios } from '@/modules/common/adapters/adapters-axios'
import { AUTH } from '@/modules/common/path-services'
import { Login, ResponseLogin } from '../types/login.type'

export const authLogin = async (data: Login) => {
  delete data.rememberPassword
  return await methodsAxios.POST<ResponseLogin, Login>(AUTH, data)
}
