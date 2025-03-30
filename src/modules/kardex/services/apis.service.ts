import { methodsAxios } from '@/utils/common/adapters/adapters-axios'
import { MOVEMENTS, TYPE_MOVEMENT } from '@/utils/path-services'
import { CreateMovement, Movements, TypeMovements } from '../types/kardex.types'
import { ApiResponse } from '@/utils/api.response'

export const getAllMovements = async (page = 1, size = 40) =>
  await methodsAxios.GET<Movements>(`${MOVEMENTS}?page=${page}&size=${size}`)

export const getAllTypeMovements = async () =>
  await methodsAxios.GET<TypeMovements[]>(`${TYPE_MOVEMENT}`)

export const createMovement = async (data: CreateMovement) =>
  await methodsAxios.POST<ApiResponse, CreateMovement>(`${MOVEMENTS}`, data)
