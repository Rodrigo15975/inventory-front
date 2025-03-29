import { ApiResponse } from '@/utils/api.response'
import { methodsAxios } from '@/utils/common/adapters/adapters-axios'
import { PRODUCT } from '@/utils/path-services'
import {
  CreateProduct,
  GetAllProducts,
  UpdateProduct,
} from '../types/type.product'

export const createProduct = async (data: CreateProduct) =>
  await methodsAxios.POST<ApiResponse<CreateProduct>, CreateProduct>(
    `${PRODUCT}`,
    data
  )
export const updateProduct = async (data: UpdateProduct) =>
  await methodsAxios.PATCH<ApiResponse<UpdateProduct>, UpdateProduct>(
    `${PRODUCT}/${data.id}`,
    data
  )
export const deleteProduct = async (id: String) =>
  await methodsAxios.DELETE<ApiResponse>(`${PRODUCT}/${id}`)

export const getAllProducts = async (page = 1, size = 20) =>
  await methodsAxios.GET<GetAllProducts>(`${PRODUCT}?page=${page}&size=${size}`)
