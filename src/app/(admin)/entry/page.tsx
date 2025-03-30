import PageEntry from '@/modules/entry/pages/page-entry'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrada',
}

const Page = () => {
  return (
    <>
      <PageEntry />
    </>
  )
}

export default Page
