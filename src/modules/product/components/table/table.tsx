'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronRight, Edit2, MoreVertical, Trash } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useGetAllProducts } from '../../services/queries.service'
import { SkeletonTableGlobal } from '@/components/ui/skeleton.table'
import { useDataUpdateProduct } from '../../hooks/useDataUpdateProduct'

export function ProductTable() {
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(10)
  const { setUpdateProductData } = useDataUpdateProduct()
  const { data: products, isLoading: isLoadingProducts } = useGetAllProducts(
    page,
    size
  )

  const totalPages = Math.ceil((products?.count || 0) / size)

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  const handledEdit = (id: string) => {
    const product = products?.data.find((product) => product.id === id)
    if (!product) return
    const { category, typeProduct, TypePresentation, name, description } =
      product
    setUpdateProductData({
      categoryId: category.id,
      typeProductId: typeProduct.id,
      typePresentationId: TypePresentation.id,
      id,
      description: description || '',
      name,
      is_active: String(product?.is_active),
    })
  }
  const handledDelete = (id: string) => {}

  return (
    <Card className="rounded-md shadow-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          {isLoadingProducts ? (
            <SkeletonTableGlobal
              columns={[
                'Producto',
                'Categoría',
                'Tipo',
                'Presentación',
                'Descripción',
                'Estado',
                'Acciones',
              ]}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-white">
                  <TableHead className="w-12 text-center">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="text-center font-bold text-primary">
                    Producto
                  </TableHead>
                  <TableHead className="text-center font-bold text-primary">
                    Categoría
                  </TableHead>
                  <TableHead className="text-center font-bold text-primary">
                    Tipo
                  </TableHead>
                  <TableHead className="text-center font-bold text-primary">
                    Presentación
                  </TableHead>
                  <TableHead className="text-center font-bold text-primary">
                    Descripción
                  </TableHead>
                  <TableHead className="text-center font-bold text-primary">
                    Estado
                  </TableHead>
                  <TableHead className="text-center font-bold text-primary">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.data.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>{product.typeProduct.name}</TableCell>
                    <TableCell>{product.TypePresentation.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            product.is_active === true
                              ? 'bg-green-500'
                              : 'bg-orange-500'
                          }`}
                        />
                        {product.is_active === true ? 'Activo' : 'Inactivo'}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handledEdit(product.id)}
                          >
                            <Edit2 />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handledDelete(product.id)}
                          >
                            <Trash /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex items-center justify-end p-4">
          <div className="flex items-center space-x-6 text-sm">
            <span>Paginación</span>
            <Select
              onValueChange={(value) => {
                setSize(Number(value))
                setPage(1)
              }}
              value={String(size)}
            >
              <SelectTrigger className="w-16">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>

            <span className="text-sm text-gray-500">
              Página {page} de {totalPages || 1}
            </span>

            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextPage}
                disabled={page >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
