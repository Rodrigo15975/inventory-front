import { methodsAxios } from '@/utils/common/adapters/adapters-axios'
import { CATEGORY } from '@/utils/common/path-services'
import {
  Category,
  CreateCategory,
  UpdateCategory,
} from '../types/category.types'
import { ApiResponse } from '@/utils/api.response'

export const getAllCategories = async (page = 1, size = 10) =>
  await methodsAxios.GET<Category>(`${CATEGORY}/list?page=${page}&size=${size}`)

export const createCategory = async (data: CreateCategory) =>
  await methodsAxios.POST<ApiResponse<Category['data'][0]>, CreateCategory>(
    `${CATEGORY}/create`,
    data
  )
export const updateCategory = async (data: UpdateCategory, id: string ) =>
  methodsAxios.PATCH<ApiResponse<Category['data'][0]>, UpdateCategory>(
    `${CATEGORY}/update/${id}`,
    data
  )

export const removeCategory = async (id: string) =>
  await methodsAxios.DELETE<ApiResponse>(`${CATEGORY}/${id}`)
