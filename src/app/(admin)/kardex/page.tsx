import PageKardex from '@/modules/kardex/pages/page-kardex'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kardex',
}

const Page = () => {
  return (
    <>
      <PageKardex />
    </>
  )
}

export default Page
