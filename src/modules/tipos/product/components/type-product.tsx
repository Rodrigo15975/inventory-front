'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetAllTypeProduct } from '../services/queries.service'
import { CreateTypeProduct, UpdateTypeProduct } from '../types/type-production'
import {
  useCreateTypePorudct,
  useDeleteTypePorudct,
  useUpdateTypePorudct,
} from '../services/mutation.service'
import { SkeletonTable } from '../../components/skeleton'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
})

export function TypeProductTable() {
  const [open, setOpen] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<UpdateTypeProduct | null>(null)

  const { data: typeProducts = [], isLoading: isLoadingTypeProduct } =
    useGetAllTypeProduct()

  const { mutate: createTypeProduct, isPending: isPendingCreateTypeProduct } =
    useCreateTypePorudct()

  const { mutate: deleteTypePorudct, isPending: isPendingDeleteTypeProduct } =
    useDeleteTypePorudct()

  const { mutate: updateTypeProduct, isPending: isPendingUpdateTypeProduct } =
    useUpdateTypePorudct()

  const disableButton =
    isPendingCreateTypeProduct ||
    isPendingDeleteTypeProduct ||
    isPendingUpdateTypeProduct

  const form = useForm<CreateTypeProduct>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (values: CreateTypeProduct) => {
    if (editingItem)
      return updateTypeProduct(
        { id: editingItem.id, name: values.name },
        {
          onSuccess: () => {
            form.reset()
            setEditingItem(null)
            setOpen(false)
          },
        }
      )
    createTypeProduct(values, {
      onSuccess: () => {
        form.reset()
        setEditingItem(null)
        setOpen(false)
      },
    })
  }

  const handleEdit = (product: UpdateTypeProduct) => {
    setEditingItem(product)
    form.setValue('name', product?.name ?? 'no product type')
    setOpen(true)
  }

  const handleDelete = (id: string) => deleteTypePorudct(id)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipos de Producto</CardTitle>
        <CardDescription>
          Gestiona los tipos de productos disponibles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingTypeProduct ? (
          <SkeletonTable columns={['Nombre', 'Acciones']} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="w-[100px] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {typeProducts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center text-muted-foreground"
                  >
                    No hay tipos de producto
                  </TableCell>
                </TableRow>
              ) : (
                typeProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                          disabled={disableButton}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          disabled={disableButton}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="ml-auto" disabled={disableButton}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Tipo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem
                  ? 'Editar Tipo de Producto'
                  : 'Crear Tipo de Producto'}
              </DialogTitle>
              <DialogDescription>
                Ingresa el nombre del nuevo tipo de producto.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: Bebida, Alimento, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={disableButton}>
                    Guardar
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
