import { methodsAxios } from '@/utils/common/adapters/adapters-axios'
import { MOVEMENTS } from '@/utils/path-services'
import { Movements, MovementsActives } from '../types/kardex.types'

export const getAllMovements = async (page = 1, size = 40) =>
  await methodsAxios.GET<Movements>(`${MOVEMENTS}?page=${page}&size=${size}`)

// export const getAllMovementsActives = async () =>
//   await methodsAxios.GET<MovementsActives[]>(`${MOVEMENTS}/actives`)
