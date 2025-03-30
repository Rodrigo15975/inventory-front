import PageExit from '@/modules/exit/pages/page-exit'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salida',
}

const Page = () => {
  return (
    <>
      <PageExit />
    </>
  )
}

export default Page
