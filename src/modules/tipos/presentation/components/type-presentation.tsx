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
interface TypePresentation {
  id: string
  name: string
}

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
})

export function TypePresentationTable() {
  const [open, setOpen] = useState(false)
  const [presentations, setPresentations] = useState<TypePresentation[]>([
    { id: '1', name: 'Botella' },
    { id: '2', name: 'Caja' },
    { id: '3', name: 'Paquete' },
  ])

  // Añadir un nuevo estado para el elemento que se está editando
  const [editingItem, setEditingItem] = useState<TypePresentation | null>(null)

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
      // Actualizar presentación existente
      setPresentations(
        presentations.map((item) =>
          item.id === editingItem.id ? { ...item, name: values.name } : item
        )
      )
    } else {
      // Añadir nueva presentación
      const newPresentation = {
        id: Math.random().toString(36).substring(2, 9),
        name: values.name,
      }

      setPresentations([...presentations, newPresentation])
    }

    // Reset form, clear editing state and close dialog
    form.reset()
    setEditingItem(null)
    setOpen(false)
  }

  function handleDelete(id: string) {
    setPresentations(presentations.filter((item) => item.id !== id))
  }

  // Añadir función para iniciar la edición
  function handleEdit(presentation: TypePresentation) {
    setEditingItem(presentation)
    form.setValue('name', presentation.name)
    setOpen(true)
  }

  return (
    <Card className="min-h-[50vh]">
      <CardHeader>
        <CardTitle>Tipos de Presentación</CardTitle>
        <CardDescription>
          Gestiona los tipos de presentación de productos.
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
            {presentations.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center text-muted-foreground"
                >
                  No hay tipos de presentación
                </TableCell>
              </TableRow>
            ) : (
              presentations.map((presentation) => (
                <TableRow key={presentation.id}>
                  <TableCell>{presentation.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(presentation)}
                      >
                        <Pencil className="h-4 w-4 " />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(presentation.id)}
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
            <Button
              className="ml-auto"
              onClick={() => {
                setEditingItem(null)
                form.reset()
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Tipo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem
                  ? 'Editar Tipo de Presentación'
                  : 'Crear Tipo de Presentación'}
              </DialogTitle>
              <DialogDescription>
                Ingresa el nombre del nuevo tipo de presentación.
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
                          placeholder="Ej: Botella, Caja, etc."
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
