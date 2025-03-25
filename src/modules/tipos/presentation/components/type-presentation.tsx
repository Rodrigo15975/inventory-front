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
import { useGetAllTypePresentation } from '../services/queries.service'
import {
  CreateTypePresentation,
  UpdateTypePresentation,
} from '../types/type-presentation'
import {
  useCreateTypePresentation,
  useDeleteTypePresentation,
  useUpdateTypePresentation,
} from '../services/mutation.service'
import { SkeletonTable } from '../../components/skeleton'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
})

export function TypePresentationTable() {
  const [open, setOpen] = useState<boolean>(false)
  const {
    data: typePresentations = [],
    isLoading: isLoadingTypePresentations,
  } = useGetAllTypePresentation()
  const {
    mutate: createTypePresentation,
    isPending: isPendingTypePresentation,
  } = useCreateTypePresentation()
  const {
    mutate: updateTypePresentation,
    isPending: isPendingUpdateTypePresentation,
  } = useUpdateTypePresentation()

  const {
    mutate: deleteTypePresentation,
    isPending: isPendingDeleteTypePresentation,
  } = useDeleteTypePresentation()

  const [editingItem, setEditingItem] = useState<UpdateTypePresentation | null>(
    null
  )
  const disabledButton =
    isPendingTypePresentation ||
    isPendingUpdateTypePresentation ||
    isPendingDeleteTypePresentation

  const form = useForm<CreateTypePresentation>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (values: CreateTypePresentation) => {
    if (editingItem)
      return updateTypePresentation(
        { id: editingItem.id, name: values.name },
        {
          onSuccess: () => {
            form.reset()
            setEditingItem(null)
            setOpen(false)
          },
        }
      )

    createTypePresentation(values, {
      onSuccess: () => {
        form.reset()
        setOpen(false)
      },
    })
  }

  const handleDelete = (id: string) => deleteTypePresentation(id)
  const clearActionEdit = () => {
    setEditingItem(null)
    form.reset()
  }
  const handleEdit = (presentation: UpdateTypePresentation) => {
    setEditingItem(presentation)
    form.setValue('name', presentation?.name ?? '')
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
        {isLoadingTypePresentations ? (
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
              {typePresentations?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center text-muted-foreground"
                  >
                    No hay tipos de presentación
                  </TableCell>
                </TableRow>
              ) : (
                typePresentations?.map((presentation) => (
                  <TableRow key={presentation.id}>
                    <TableCell className="text-start">
                      {presentation.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(presentation)}
                          disabled={disabledButton}
                        >
                          <Pencil className="h-4 w-4 " />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={disabledButton}
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
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={clearActionEdit} className="ml-auto bg-[#3b82f6]">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Tipo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem?.id
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
                  <Button
                    type="submit"
                    className="bg-[#3b82f6]"
                    disabled={disabledButton}
                  >
                    {disabledButton ? 'Guardando...' : 'Guardar'}
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
