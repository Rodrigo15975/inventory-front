import { methodsAxios } from '@/utils/common/adapters/adapters-axios'
import { PROVEEDOR } from '@/utils/path-services'
import {
  CreateProvider,
  Provider,
  UpdateProvider,
} from '../types/types.proveedor'
import { ApiResponse } from '@/utils/api.response'

export const getOneProveedor = async () =>
  await methodsAxios.GET<Provider>(PROVEEDOR)

export const createProvider = async (data: CreateProvider) =>
  await methodsAxios.POST<ApiResponse, CreateProvider>(PROVEEDOR, data)

export const updateProvider = async (data: UpdateProvider) =>
  await methodsAxios.PATCH<ApiResponse, UpdateProvider>(
    `${PROVEEDOR}/${data.id}`,
    data
  )

export const deleteProvider = async (id: string) =>
  await methodsAxios.DELETE<ApiResponse>(`${PROVEEDOR}/${id}`)
