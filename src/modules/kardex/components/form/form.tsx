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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon, PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchema, valuesInitials } from './schema/schema'
import { useGetAllProductsActives } from '@/modules/product/services/queries.service'
import { useEffect, useState } from 'react'
import { useGetAllTypeMovements } from '../../services/queriess.service'
import { CreateMovement } from '../../types/kardex.types'
import { useCreateMovements } from '../../services/mutation.service'

const FormularioMovements = () => {
  const { data: productsActives } = useGetAllProductsActives()
  const { data: typeMovements } = useGetAllTypeMovements()
  const { mutate: createMovement, isPending: isPendingCreateMovement } =
    useCreateMovements()
  const [restBalance, setRestBalance] = useState<number | null>(null)
  const [movementName, setMovementName] = useState<string>('')
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: valuesInitials,
  })
  const btnDisabled = isPendingCreateMovement
  useEffect(() => {
    const productId = form.watch('productId')
    const product = productsActives?.data.find((p) => p.id === productId)
    if (product) {
      if (product.movements.length > 0)
        setRestBalance(product.movements[0].balance)
      else setRestBalance(null)

      form.setValue('typePresentationId', product.TypePresentation.name)
      form.setValue('categoryId', product.category.name)
      form.setValue('typeProductId', product.typeProduct.name)
    }
  }, [form.watch('productId'), productsActives])

  const onSubmit = (values: CreateMovement) => {
    createMovement(
      {
        ...values,
        entry: movementName === 'ENTRADA' ? values.entry : undefined,
        exit: movementName === 'SALIDA' ? values.exit : undefined,
      },
      {
        onSuccess: () => {
          form.reset()
          setMovementName('')
        },
      }
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Agregar movimiento</CardTitle>
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar producto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productsActives?.data.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
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
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
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
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
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
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
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
                      onValueChange={(v) => {
                        const movement = typeMovements?.find((m) => m.id === v)
                        setMovementName(movement?.name || '')
                        if (movement?.name === 'ENTRADA') {
                          form.setValue('entry', '0')
                          form.setValue('exit', '0')
                        } else if (movement?.name === 'SALIDA') {
                          form.setValue('exit', '0')
                          form.setValue('entry', '0')
                        }
                        field.onChange(v)
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar el movimiento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {typeMovements?.map((movement) => (
                          <SelectItem key={movement.id} value={movement.id}>
                            {movement.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {movementName && (
                <FormField
                  control={form.control}
                  name={movementName === 'ENTRADA' ? 'entry' : 'exit'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {movementName === 'ENTRADA' ? 'Entrada' : 'Salida'}
                      </FormLabel>
                      {restBalance && (
                        <FormLabel className=" ml-2 text-sm text-primary/50 ">
                          (Balance restante -{' '}
                          <span className="font-bold text-primary ">
                            {restBalance}
                          </span>
                          )
                        </FormLabel>
                      )}
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value ?? ''}
                          placeholder={`Ingrese ${
                            movementName === 'ENTRADA' ? 'Entrada' : 'Salida'
                          }`}
                          min={0}
                          onChange={(e) => {
                            let value = e.target.value
                            if (/^\d*$/.test(value)) {
                              value = value.replace(/^0+/, '') || '0'
                              field.onChange(value)
                            }
                          }}
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
                        className="resize-none h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button
                disabled={btnDisabled}
                className="bg-[#10b981]"
                type="submit"
              >
                <PlusIcon />
                Agregar
                {btnDisabled && <Loader2Icon />}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default FormularioMovements
