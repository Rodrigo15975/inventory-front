'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { usePaginatioCategories } from '../../hooks/usePagionation'
import {
  useDeleteCategory,
  useUpdateCategory,
} from '../../services/mutation.service'
import { useCategoryStoreUpdate } from '../../store/categoryStoreUpdate'
import { UpdateCategory } from '../../types/category.types'
import Formulario from '../form/form'
import { SkeletonRow } from './skeleton'

export default function CategoryManagement() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const { mutate: updateCategory, isPending: isPendingUpdate } =
    useUpdateCategory()
  const { mutate: removeCategory, isPending: isPendingRemove } =
    useDeleteCategory()
  const categoryStoreUpdate = useCategoryStoreUpdate()

  const {
    categoriesData,
    handleNextPage,
    handlePreviousPage,
    isLoadingCategories,
    itemsPerPage,
    page,
    setItemsPerPage,
    setPage,
    totalItems,
    totalPages,
  } = usePaginatioCategories()

  const handleToggleActive = (id: string, isActive: boolean) => {
    const findedCategory = categoriesData?.data.find(
      (category) => category.id === id
    )

    updateCategory({ ...findedCategory, is_active: !isActive })
  }
  const disabledModelEdits = isPendingUpdate || isPendingRemove
  const handledToggleEdit = (id: string) => {
    const findedCategory = categoriesData?.data.find(
      (category) => category.id === id
    ) as UpdateCategory
    console.log({
      findedCategory,
      id,
    })
    categoryStoreUpdate.updateCategory(findedCategory)
  }
  const handledToggleRemove = (id: string) => removeCategory(id)

  return (
    <div className="flex flex-col xl:flex-row gap-6 p-6">
      <Formulario />
      <div className="w-full xl:w-2/3 bg-white rounded-lg shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow className="align-middle">
              <TableHead className="w-[40px]">{/* <Checkbox /> */}</TableHead>
              <TableHead className="text-left">Categoría</TableHead>
              <TableHead className="text-left">Descripción</TableHead>
              <TableHead className="text-left">Estado</TableHead>
              <TableHead className="text-left">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingCategories
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              : categoriesData?.data.map(
                  ({ id, is_active, name, description }) => (
                    <TableRow key={id} className="align-middle">
                      <TableCell className="w-[40px]">
                        <Checkbox />
                      </TableCell>
                      <TableCell className="text-left whitespace-nowrap">
                        {name}
                      </TableCell>
                      <TableCell className="text-left whitespace-nowrap">
                        {description}
                      </TableCell>
                      <TableCell className="text-left">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              is_active ? 'bg-emerald-500' : 'bg-orange-400'
                            }`}
                          />
                          <span>{is_active ? 'Activo' : 'Inactivo'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-left">
                        <DropdownMenu
                          open={openMenuId === id}
                          onOpenChange={(isOpen) =>
                            setOpenMenuId(isOpen ? id : null)
                          }
                        >
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              disabled={disabledModelEdits}
                              onClick={() => {
                                setOpenMenuId(null)
                                handledToggleEdit(id)
                              }}
                            >
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={disabledModelEdits}
                              onClick={() => {
                                handleToggleActive(id, is_active)
                                setOpenMenuId(null)
                              }}
                            >
                              {is_active ? 'Desactivar' : 'Activar'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={disabledModelEdits}
                              onClick={() => {
                                handledToggleRemove(id)
                                setOpenMenuId(null)
                              }}
                              className="text-destructive"
                            >
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground">
            Mostrando {itemsPerPage} de {totalItems} categorías
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={String(itemsPerPage)}
              onValueChange={(value) => {
                setItemsPerPage(value)
                setPage(1)
              }}
            >
              <SelectTrigger className="w-16">
                <SelectValue placeholder="5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="ghost"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                  >
                    <PaginationPrevious />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <span className="text-sm text-muted-foreground">
                    Page {page} de {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant="ghost"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                  >
                    <PaginationNext />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}
