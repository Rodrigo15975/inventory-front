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

// Define the data type
interface TypeProduct {
  id: string
  name: string
}

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
})

export function TypeProductTable() {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<TypeProduct[]>([
    { id: '1', name: 'Bebida' },
    { id: '2', name: 'Alimento' },
    { id: '3', name: 'Limpieza' },
  ])

  // Añadir un nuevo estado para el elemento que se está editando
  const [editingItem, setEditingItem] = useState<TypeProduct | null>(null)

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  // Modificar la función onSubmit para manejar tanto la creación como la edición
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (editingItem) {
      // Actualizar tipo de producto existente
      setProducts(
        products.map((item) =>
          item.id === editingItem.id ? { ...item, name: values.name } : item
        )
      )
    } else {
      // Añadir nuevo tipo de producto
      const newProduct = {
        id: Math.random().toString(36).substring(2, 9),
        name: values.name,
      }

      setProducts([...products, newProduct])
    }

    // Reset form, clear editing state and close dialog
    form.reset()
    setEditingItem(null)
    setOpen(false)
  }

  // Añadir función para iniciar la edición
  function handleEdit(product: TypeProduct) {
    setEditingItem(product)
    form.setValue('name', product.name)
    setOpen(true)
  }

  function handleDelete(id: string) {
    setProducts(products.filter((item) => item.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipos de Producto</CardTitle>
        <CardDescription>
          Gestiona los tipos de productos disponibles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className="w-[100px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center text-muted-foreground"
                >
                  No hay tipos de producto
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
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
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="ml-auto">
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
                  <Button type="submit">Guardar</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
