import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  useGetAllMovements,
  useGetAllMovementsActives,
} from '../../services/queriess.service'

const formSchema = z.object({
  typePresentationId: z.string().min(1, 'La presentación es requerida'),
  categoryId: z.string().min(1, 'La categoría es requerida'),
  typeProductId: z.string().min(1, 'El tipo de producto es requerido'),
  movementTypeId: z.string().min(1, 'El tipo de movimiento es requerido'),
  productId: z.string().min(1, 'El producto es requerido'),
  entry: z.number().optional(),
  exit: z.number().optional(),
  description: z.string().optional(),
})

const mockCategories = [
  { id: '1', name: 'Categoría 1' },
  { id: '2', name: 'Categoría 2' },
  { id: '3', name: 'Categoría 3' },
]

const mockPresentations = [
  { id: '1', name: 'Saco' },
  { id: '2', name: 'Medio saco' },
  { id: '3', name: 'Kilo' },
]

const mockTypes = [
  { id: '1', name: 'Grano' },
  { id: '2', name: 'Polvo' },
  { id: '3', name: 'Mazorca' },
]

const mockMovementTypes = [
  { id: '1', name: 'Entrada' },
  { id: '2', name: 'Salida' },
]

const mockProducts = [
  { id: '1', name: 'Producto 1' },
  { id: '2', name: 'Producto 2' },
  { id: '3', name: 'Producto 3' },
]

const FormularioMovements = () => {
  const { data: movements = [] } = useGetAllMovementsActives()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typePresentationId: '',
      categoryId: '',
      typeProductId: '',
      movementTypeId: '',
      productId: '',
      description: '',
    },
  })

  const movementTypeId = form.watch('movementTypeId')
  const isEntryMovement = movementTypeId === '1'
  const isExitMovement = movementTypeId === '2'

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    form.reset()
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Agregar movimiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid text-start grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Producto</FormLabel>
                      <FormLabel className="text-xs text-[#10B981] ml-2">
                        (Solo productos activos)
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar producto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {movements.map(({ idMovement, productName }) => (
                            <SelectItem key={idMovement} value={idMovement}>
                              {productName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="typePresentationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Presentación</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar presentación" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockPresentations.map((presentation) => (
                            <SelectItem
                              key={presentation.id}
                              value={presentation.id}
                            >
                              {presentation.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="typeProductId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="movementTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Movimiento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockMovementTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isEntryMovement && (
                  <FormField
                    control={form.control}
                    name="entry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entrada</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Cantidad de entrada"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {isExitMovement && (
                  <FormField
                    control={form.control}
                    name="exit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salida</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Cantidad de salida"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-3">
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descripción del producto"
                          className="resize-none  h-[200px] "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#10b981]" type="submit">
                  <PlusIcon />
                  Agregar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default FormularioMovements
