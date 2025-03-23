import TiposPages from '@/modules/tipos/tipo.page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tipos',
}

const Tipos = () => {
  return (
    <>
      <TiposPages />
    </>
  )
}

export default Tipos
