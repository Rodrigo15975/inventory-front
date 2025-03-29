'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useDataUpdateProduct } from '../../hooks/useDataUpdateProduct'
import { useGetAllSelectToCreateProducts } from '../../hooks/useGetAllSelectToCreateProducts'
import {
  useCreateProduct,
  useUpdateProduct,
} from '../../services/mutation.service'
import { ProductFormValues } from '../../types/type.product'
import { productFormSchema } from './schema/schema'

const initialValues = {
  name: '',
  categoryId: '',
  typeProductId: '',
  typePresentationId: '',
  description: '',
  is_active: '',
}

export function AddProductForm() {
  const { getActivesCategories, getAllTypePresentation, getAllTypeProduct } =
    useGetAllSelectToCreateProducts()

  const { mutate: createProduct, isPending: isPendingCreate } =
    useCreateProduct()
  const { mutate: updateProduct, isPending: isPendingUpdate } =
    useUpdateProduct()

  const { dataProductUpdate, setUpdateProductData } = useDataUpdateProduct()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    if (dataProductUpdate.id) {
      form.reset(dataProductUpdate)
    }
  }, [dataProductUpdate, form])

  const btnDisabled = isPendingCreate || isPendingUpdate

  const onSubmit = (data: ProductFormValues) => {
    if (dataProductUpdate?.id)
      return updateProduct(
        { ...data, id: dataProductUpdate.id },
        {
          onSuccess: () => {
            clearEdit()
          },
        }
      )

    createProduct(data, {
      onSuccess: () => {
        clearEdit()
      },
    })
  }

  const clearEdit = () => {
    form.reset(initialValues)
    setUpdateProductData({})
  }

  return (
    <Card className="rounded-md shadow-sm !border-none">
      <CardContent className="pt-6 !border-none">
        <div className="mb-6 text-start">
          <h2 className="text-xl font-medium text-gray-800">
            {dataProductUpdate?.id ? 'Editar producto' : 'Agregar producto'}
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="block lg:grid lg:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="space-y-2 text-start">
                    <Label htmlFor="category">Categoría</Label>
                    <Label className="text-xs text-[#10B981] ml-2">
                      (Solo categorias activas)
                    </Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getActivesCategories?.data.map((categorie) => (
                          <SelectItem key={categorie.id} value={categorie.id}>
                            {categorie.name}
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
                  <FormItem className="space-y-2 text-start">
                    <Label htmlFor="presentation">Presentación</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar presentación" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getAllTypePresentation?.map((presentation) => (
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
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2 md:row-start-2 text-start">
                    <Label htmlFor="product">Producto</Label>
                    <FormControl>
                      <Input
                        id="product"
                        placeholder="Nombre de producto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="typeProductId"
                render={({ field }) => (
                  <FormItem className="space-y-2 md:row-start-2 text-start">
                    <Label htmlFor="type">Tipo</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getAllTypeProduct?.map((typeProduct) => (
                          <SelectItem
                            key={typeProduct.id}
                            value={typeProduct.id}
                          >
                            {typeProduct.name}
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
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2 row-span-2 text-start">
                    <Label htmlFor="description">Descripción</Label>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="Descripción"
                        className="h-[160px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="space-y-2 md:row-start-3 text-start">
                    <Label htmlFor="status">Estado</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Activo</SelectItem>
                        <SelectItem
                          disabled={!dataProductUpdate.id && true}
                          value="false"
                        >
                          Inactivo
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-start-3 max-lg:pt-4 md:row-start-3 flex items-end gap-4 justify-end">
                {dataProductUpdate?.id && (
                  <Button
                    type="button"
                    disabled={btnDisabled}
                    className=" hover:bg-blue-600"
                    variant={'outline'}
                    onClick={clearEdit}
                  >
                    Cancelar
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={btnDisabled}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {btnDisabled && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {dataProductUpdate?.id ? 'Actualizar' : 'Agregar'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
