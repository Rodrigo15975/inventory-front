'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { productFormSchema } from './schema/schema'

type ProductFormValues = z.infer<typeof productFormSchema>

export function AddProductForm() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      category: '',
      type: '',
      presentation: '',
      description: '',
      status: '',
    },
  })

  function onSubmit(data: ProductFormValues) {}

  return (
    <Card className="rounded-md shadow-sm !border-none">
      <CardContent className="pt-6 !border-none">
        <div className="mb-6 text-start">
          <h2 className="text-xl font-medium text-gray-800">
            Agregar productos
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-2 text-start">
                    <Label htmlFor="category">Categoría</Label>
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
                        <SelectItem value="Categoría 1">Categoría 1</SelectItem>
                        <SelectItem value="Categoría 2">Categoría 2</SelectItem>
                        <SelectItem value="Categoría 3">Categoría 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="presentation"
                render={({ field }) => (
                  <FormItem className="space-y-2 text-start">
                    <Label htmlFor="presentation">Presentación</Label>
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
                        <SelectItem value="Saco">Saco</SelectItem>
                        <SelectItem value="Medio saco">Medio saco</SelectItem>
                        <SelectItem value="Kilo">Kilo</SelectItem>
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
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-2 md:row-start-2 text-start">
                    <Label htmlFor="type">Tipo</Label>
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
                        <SelectItem value="Grano">Grano</SelectItem>
                        <SelectItem value="Polvo">Polvo</SelectItem>
                        <SelectItem value="Mazorca">Mazorca</SelectItem>
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
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-2 md:row-start-3 text-start">
                    <Label htmlFor="status">Estado</Label>
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
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-start-3 md:row-start-3 flex items-end justify-end">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  Agregar
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
