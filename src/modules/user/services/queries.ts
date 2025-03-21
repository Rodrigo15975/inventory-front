import { methodsAxios } from '@/modules/common/adapters/adapters-axios'
import { PROFILE } from '@/modules/common/path-services'
import { useQuery } from '@tanstack/react-query'

const getProfile = async () => await methodsAxios.GET<Profile>(PROFILE)
export const useGetProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
    gcTime: 200000,
    staleTime: 200000,
  })
