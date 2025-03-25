'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
  Form,
  FormControl,
  FormDescription,
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
import { LoaderIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useCreateUser, useUpdateUser } from '../../services/mutation.service'
import { useGetAllRoles, useGetProfile } from '../../services/queries.service'
import { useUserStoreUpdate } from '../../store/useStoreUpdateUser'
import { CreateUser } from '../../types/user-type'
import { userFormSchema } from './schema/schema'

export function UserForm() {
  const { mutate: createUser, isPending: isLoadingCreateUser } = useCreateUser()
  const { dataUpdateUser, updateUser: updateUserStore } = useUserStoreUpdate()
  const { data: profile } = useGetProfile()
  const { mutate: updateUser, isPending: isLoadingUpdateUser } = useUpdateUser(
    profile?.id === dataUpdateUser.id
  )
  const { data: roles } = useGetAllRoles()

  const btnDisabled = isLoadingCreateUser || isLoadingUpdateUser

  const defaultValues: CreateUser = {
    username: '',
    name: '',
    lastname: '',
    password: '',
    id_role: '',
  }

  const form = useForm<CreateUser>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  })

  useEffect(() => {
    if (dataUpdateUser.id) {
      form.reset({
        username: dataUpdateUser.username,
        name: dataUpdateUser.name,
        password: 'blanco',
        lastname: dataUpdateUser.lastname,
        id_role: dataUpdateUser.id_role,
      })
    }
  }, [dataUpdateUser, form])

  const handleSubmit = (data: CreateUser) => {
    if (dataUpdateUser?.id)
      return updateUser(
        { id: dataUpdateUser.id, ...data },
        {
          onSuccess: () => {
            onCancel()
          },
        }
      )

    createUser(data, {
      onSuccess: () => {
        onCancel()
      },
    })
  }

  const onCancel = () => {
    form.reset(defaultValues)
    updateUserStore(defaultValues)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {dataUpdateUser?.id ? 'Editar Usuario' : 'Crear Usuario'}
        </CardTitle>
        <CardDescription>
          {dataUpdateUser?.id
            ? 'Actualiza la información del usuario existente.'
            : 'Completa el formulario para crear un nuevo usuario.'}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="text-start">
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="usuario123" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este será el identificador único del usuario.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-start">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="text-start">
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!dataUpdateUser.id && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="text-start">
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormDescription>
                      La contraseña debe tener al menos 1 caracteres.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="id_role"
              render={({ field }) => (
                <FormItem className="text-start">
                  <FormLabel>Rol</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles?.data.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    El rol determina los permisos del usuario.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            {dataUpdateUser.id && (
              <Button variant="outline" type="button" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button
              disabled={btnDisabled}
              className="bg-[#3b82f6]"
              type="submit"
            >
              {dataUpdateUser.id ? (
                'Actualizar'
              ) : (
                <>
                  Crear
                  {isLoadingCreateUser && (
                    <LoaderIcon className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
