import { methodsAxios } from '@/utils/common/adapters/adapters-axios'
import { MOVEMENTS, TYPE_MOVEMENT } from '@/utils/path-services'
import { CreateMovement, Movements, TypeMovements } from '../types/kardex.types'
import { ApiResponse } from '@/utils/api.response'
export const getAllMovements = async (
  page = 1,
  size = 40,
  search?: string,
  endDate?: string,
  startDate?: string
) => {
  const params = [
    `page=${page}`,
    `size=${size}`,
    search && `search=${encodeURIComponent(search)}`,
    startDate && `startDate=${encodeURIComponent(startDate)}`,
    endDate && `endDate=${encodeURIComponent(endDate)}`,
  ]
    .filter(Boolean)
    .join('&')

  return await methodsAxios.GET<Movements>(`${MOVEMENTS}?${params}`)
}

export const getAllTypeMovements = async () =>
  await methodsAxios.GET<TypeMovements[]>(`${TYPE_MOVEMENT}`)

export const createMovement = async (data: CreateMovement) =>
  await methodsAxios.POST<ApiResponse, CreateMovement>(`${MOVEMENTS}`, data)
