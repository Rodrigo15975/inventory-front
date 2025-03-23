import { AddProductForm } from '../components/form/form'
import { ProductTable } from '../components/table/table'

const PageProduct = () => {
  return (
    <>
      <div className="space-y-16">
        <AddProductForm />
        <ProductTable />
      </div>
    </>
  )
}

export default PageProduct
