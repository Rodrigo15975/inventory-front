'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  useCreateProvider,
  useDeleteProvider,
  useUpdateProvider,
} from '../../services/mutation.service'
import { useGetProvider } from '../../services/queries.service'
import { FormValues, Provider } from '../../types/types.proveedor'
import { ProveedorCard } from '../card/card'
import { formSchema, initialValues } from './schemas/schema'
import { useState } from 'react'

export function ProveedorForm() {
  const { data: proveedor, isLoading: isLoadingProvider } = useGetProvider()
  const { mutate: createProvider, isPending: isPendingProvider } =
    useCreateProvider()
  const { mutate: deleteProvider, isPending: isPendingProviderDelete } =
    useDeleteProvider()
  const { mutate: updateProvider, isPending: isPendingProviderUpdate } =
    useUpdateProvider()

  const [editingProviderId, setEditingProviderId] = useState<string | null>(
    null
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })
  const btnDisabled =
    isPendingProviderDelete || isPendingProviderUpdate || isPendingProvider

  const handledDelete = (id: string) => deleteProvider(id)

  const handledEdit = (provider: Provider) => {
    const {
      proveedor: {
        address,
        corporate_reason,
        legalRepresentative,
        ruc,
        phone,
        id,
      },
    } = provider
    form.reset({
      address,
      numberRuc: ruc,
      corporate_reason,
      legalRepresentative,
      phone,
    })
    setEditingProviderId(id)
  }

  const onSubmit = (data: FormValues) => {
    if (editingProviderId)
      return updateProvider(
        { id: editingProviderId, ...data },
        {
          onSuccess: () => {
            form.reset(initialValues)
            setEditingProviderId(null)
          },
        }
      )

    createProvider(data, {
      onSuccess: () => {
        form.reset(initialValues)
      },
    })
  }

  const clearEdit = () => {
    form.reset(initialValues)
    setEditingProviderId(null)
  }

  return (
    <div className="grid gap-8  xl:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-start"
            >
              <FormField
                control={form.control}
                name="corporate_reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razón Social</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese la razón social" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberRuc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RUC</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el RUC"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={11}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      El RUC debe contener 11 dígitos numéricos.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="legalRepresentative"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Representante Legal</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el nombre del representante legal"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese la dirección" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el teléfono"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={9}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      El teléfono debe contener 9 dígitos numéricos.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-x-2 flex">
                <Button
                  disabled={
                    btnDisabled ||
                    (!!proveedor?.proveedor && !editingProviderId)
                  }
                  type="submit"
                  className="w-full bg-blue-500"
                >
                  {editingProviderId ? 'Actualizar' : 'Agregar'} <PlusIcon />
                </Button>
                {editingProviderId && (
                  <Button type="button" onClick={clearEdit} variant={'outline'}>
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Datos del Proveedor</h2>
        {isLoadingProvider ? (
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary/5 pb-3">
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-48 mt-1" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : proveedor?.proveedor ? (
          <ProveedorCard
            btnDisabled={btnDisabled}
            providerDelete={handledDelete}
            providerEdit={handledEdit}
            proveedor={proveedor}
          />
        ) : (
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg">No hay proveedor</CardTitle>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  )
}
