'use client'
import { useGetProfile } from '../services/queries'

const Profile = () => {
  const { data } = useGetProfile()
  console.log({
    data,
  })

  return <></>
}

export default Profile
