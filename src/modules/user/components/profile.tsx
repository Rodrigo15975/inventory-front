'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useGetProfile } from '../services/queries'
import { Skeleton } from '@/components/ui/skeleton'

const Profile = () => {
  const { data, isLoading } = useGetProfile()
  console.log({
    data,
  })

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-8 w-8" />
      ) : (
        <>
          <div className="text-sm font-medium">
            {data?.name.toUpperCase() ?? 'Name'}
          </div>
          <Avatar className="h-8 flex items-center justify-center w-8">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="@usuario"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </>
      )}
    </>
  )
}

export default Profile
