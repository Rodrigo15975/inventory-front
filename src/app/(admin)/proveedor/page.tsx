import ProveedorPage from '@/modules/proveedor/pages/proveedor-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proveedor',
}

const Page = () => {
  return (
    <>
      <ProveedorPage />
    </>
  )
}

export default Page
