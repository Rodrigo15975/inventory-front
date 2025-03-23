import { PackageIcon } from 'lucide-react'
import { TypePresentationTable } from './presentation/components/type-presentation'
import { TypeProductTable } from './product/components/type-product'

const TiposPages = () => {
  return (
    <>
      <div className="container mx-auto py-10 space-y-10">
        <div>
          <h1 className="text-3xl flex gap-2 items-center justify-center font-bold tracking-tight mb-6">
            Gestión de Datos <PackageIcon />
          </h1>
          <div className="grid gap-8 xl:grid-cols-2">
            <TypePresentationTable />
            <TypeProductTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default TiposPages
