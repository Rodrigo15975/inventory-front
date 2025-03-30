'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SkeletonTableGlobal } from '@/components/ui/skeleton.table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useGetAllMovements } from '../../services/queriess.service'
import { Movements } from '../../types/kardex.types'
import FormularioMovements from '../form/form'

export default function ProductManagementPage() {
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(30)
  const { data, isLoading } = useGetAllMovements(page, size)
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const totalPages = Math.ceil((data?.count || 0) / size)

  const filteredData = useMemo(() => {
    if (!data || !dateFilter) return data
    const filterDate = dateFilter.toISOString().split('T')[0]
    const filtered = {
      ...data,
      data: data.data.filter((item) => {
        const itemDate = new Date(item.createdAt).toISOString().split('T')[0]
        return itemDate === filterDate
      }),
    }
    return filtered
  }, [data, dateFilter])

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }
  return (
    <>
      <FormularioMovements />
      <div className="mx-auto py-6 space-y-6 overscroll-x-auto ">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold">
                Listado de movimientos
              </div>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {dateFilter
                        ? format(dateFilter, 'dd/MM/yyyy', { locale: es })
                        : 'Filtrar por fecha'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={dateFilter}
                      onSelect={setDateFilter}
                      initialFocus
                    />
                    {dateFilter && (
                      <div className="p-2 border-t flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDateFilter(undefined)}
                        >
                          Limpiar
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {isLoading ? (
              <SkeletonTableGlobal
                columns={[
                  'Producto',
                  'Cantidad',
                  'Precio',
                  'Producto',
                  'Categoría',
                  'Tipo',
                  'Presentación',
                  'Estado',
                  'Fecha',
                  'Movimiento',
                  'Balance',
                ]}
              />
            ) : (
              <>
                <div className="mb-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-muted/40">
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">
                          Balance total
                        </div>
                        <div className="text-2xl font-bold">
                          {filteredData?.total_balance}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/40">
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">
                          Balance restante
                        </div>
                        <div className="text-2xl font-bold">
                          {filteredData?.remaining_balance}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/40">
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">
                          Total entradas
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {filteredData?.total_entry}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/40">
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">
                          Total salidas
                        </div>
                        <div className="text-2xl font-bold text-red-600">
                          {filteredData?.total_exit}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="border rounded-md">
                  <Table className="w-full table-auto">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12 text-center">
                          <Checkbox />
                        </TableHead>
                        <TableHead className="text-center">Producto</TableHead>
                        <TableHead className="text-center">Categoría</TableHead>
                        <TableHead className="text-center">Tipo</TableHead>
                        <TableHead className="text-center">
                          Presentación
                        </TableHead>
                        <TableHead className="text-center">Estado</TableHead>
                        <TableHead className="text-center">Fecha</TableHead>
                        <TableHead className="text-center">
                          Entrada/Salida
                        </TableHead>
                        <TableHead className="text-center">
                          Descripción
                        </TableHead>
                        <TableHead className="text-center">
                          Movimiento
                        </TableHead>
                        <TableHead className="text-center">Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData?.data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.product.name}
                          </TableCell>
                          <TableCell>{item.product.category.name}</TableCell>
                          <TableCell>{item.product.typeProduct.name}</TableCell>
                          <TableCell>
                            {item.product.TypePresentation.name}
                          </TableCell>
                          <TableCell>
                            {item.product.is_active ? (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                              >
                                <span className="mr-1 h-2 w-2 rounded-full bg-green-500 inline-block"></span>{' '}
                                Activo
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
                              >
                                <span className="mr-1 h-2 w-2 rounded-full bg-red-500 inline-block"></span>{' '}
                                Inactivo
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {format(new Date(item.createdAt), 'dd/MM/yyyy', {
                              locale: es,
                            })}
                          </TableCell>
                          <TableCell>
                            {item.moventType.name === 'ENTRADA' ? (
                              <span className="text-green-600">
                                +{item.entry}
                              </span>
                            ) : (
                              <span className="text-red-600">-{item.exit}</span>
                            )}
                          </TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>
                            {item.moventType.name === 'ENTRADA' ? (
                              <Badge className="text-green-600 bg-green-50 hover:bg-green-200">
                                {item.moventType.name}
                              </Badge>
                            ) : (
                              <Badge className="text-red-600 bg-red-50 hover:bg-red-200 ">
                                {item.moventType.name}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{item.balance}</TableCell>
                          {/* <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                onClick={() => handledEntry(item)}
                                align="end"
                              >
                                <DropdownMenuItem>
                                  <ArrowRight />
                                  Entrada
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handledExit(item)}
                                >
                                  <ArrowLeftToLine />
                                  Salida
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="40">40</SelectItem>
                        <SelectItem value="50">50</SelectItem>
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
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
