import { ApiResponse } from '@/utils/api.response'
import { methodsAxios } from '@/utils/common/adapters/adapters-axios'
import { TYPE_PRODUCT } from '@/utils/path-services'
import {
  CreateTypeProduct,
  TypeProduct,
  UpdateTypeProduct,
} from '../types/type-production'

export const createTypeProduct = async (data: CreateTypeProduct) =>
  await methodsAxios.POST<ApiResponse, CreateTypeProduct>(
    `${TYPE_PRODUCT}`,
    data
  )

export const getAllTypeProduct = async () =>
  await methodsAxios.GET<TypeProduct[]>(`${TYPE_PRODUCT}`)

export const deleteTypeProduct = async (id: string) =>
  await methodsAxios.DELETE<ApiResponse>(`${TYPE_PRODUCT}/${id}`)

export const updateTypeProduct = async (data: UpdateTypeProduct) =>
  await methodsAxios.PATCH<ApiResponse, UpdateTypeProduct>(
    `${TYPE_PRODUCT}/${data.id}`,
    data
  )
