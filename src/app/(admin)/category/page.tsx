import Category from '@/modules/category/pages/category-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Category',
}

const PageCategory = () => {
  return (
    <>
      <Category />
    </>
  )
}

export default PageCategory
