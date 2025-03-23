import { zodResolver } from '@hookform/resolvers/zod'
import { BadgePlus, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
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
import { useEffect } from 'react'
import {
  useCreateCategory,
  useUpdateCategory,
} from '../../services/mutation.service'
import { useCategoryStoreUpdate } from '../../store/categoryStoreUpdate'
import { CreateCategory } from '../../types/category.types'
import { categorySchema } from './schema/schema'

const Formulario = () => {
  const { mutate: createCategory, isPending } = useCreateCategory()
  const { dataUpdateCategory, updateCategory: updateCategoryStore } =
    useCategoryStoreUpdate()
  const { mutate: updateCategory } = useUpdateCategory()

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  useEffect(() => {
    if (dataUpdateCategory) {
      form.reset({
        name: dataUpdateCategory.name || '',
        description: dataUpdateCategory.description || '',
      })
    }
  }, [dataUpdateCategory, form])

  const onSubmit = (data: CreateCategory) => {
    const { id } = dataUpdateCategory
    console.log({
      dataUpdateCategory,
      data,
    })

    if (dataUpdateCategory.id)
      return updateCategory(
        {
          name: data.name,
          description: data.description,
          id,
        },
        {
          onSuccess: () => {
            clearForm()
            form.reset()
          },
        }
      )

    createCategory(data, {
      onSuccess: () => {
        form.reset()
      },
    })
  }

  const clearForm = () => updateCategoryStore({})

  return (
    <div className="w-full xl:w-1/3 bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-medium mb-6">Agregar categoría</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="text-start">
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de categoría" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="text-start">
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descripción de categoría"
                    className="min-h-[180px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-between">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-500 flex items-center hover:bg-blue-600"
            >
              <BadgePlus className="mr-2" />
              {dataUpdateCategory.id ? 'Actualizar' : 'Agregar'}
            </Button>
            {dataUpdateCategory.id && (
              <Button
                onClick={clearForm}
                type="button"
                className="bg-primary/50"
                size={'icon'}
              >
                <Trash />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Formulario
