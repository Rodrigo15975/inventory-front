import { ApiResponse } from '@/utils/api.response'
import { methodsAxios } from '@/utils/common/adapters/adapters-axios'
import { TYPE_PRESENTATION } from '@/utils/path-services'
import {
  CreateTypePresentation,
  TypePresentation,
  UpdateTypePresentation,
} from '../types/type-presentation'

export const createTypePresentation = async (data: CreateTypePresentation) =>
  await methodsAxios.POST<ApiResponse, CreateTypePresentation>(
    `${TYPE_PRESENTATION}`,
    data
  )

export const getAllTypePresentation = async () =>
  await methodsAxios.GET<TypePresentation[]>(`${TYPE_PRESENTATION}`)

export const deleteTypePresentation = async (id: string) =>
  await methodsAxios.DELETE<ApiResponse>(`${TYPE_PRESENTATION}/${id}`)

export const updateTypePresentation = async (data: UpdateTypePresentation) =>
  await methodsAxios.PATCH<ApiResponse, UpdateTypePresentation>(
    `${TYPE_PRESENTATION}/${data.id}`,
    data
  )
