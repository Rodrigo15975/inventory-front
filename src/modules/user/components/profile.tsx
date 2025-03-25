'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetProfile } from '../services/queries.service'
import { Skeleton } from '@/components/ui/skeleton'

const Profile = () => {
  const { data, isLoading } = useGetProfile()
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-8 w-8" />
      ) : (
        <>
          <div className="text-sm font-medium">{data?.name || 'Name'}</div>
          <Avatar className="h-8 flex items-center justify-center w-8">
            <AvatarImage alt="@usuario" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </>
      )}
    </>
  )
}

export default Profile
