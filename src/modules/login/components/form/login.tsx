'use client'
import type React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { formSchema } from './schema/schema'
import { Login as TypeLogin } from '../../types/login.type'
import { useAuthLogin } from '../../services/mutation'
import { LogInIcon } from 'lucide-react'
import ValleLogo from '@/components/logo/logo'

const Login = () => {
  const { isPending, mutate: authLogin } = useAuthLogin()
  const form = useForm<TypeLogin>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      rememberPassword: false,
    },
  })

  const onSubmit = (values: TypeLogin) => authLogin(values)
  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div className="mb-8">
        <ValleLogo />
      </div>

      <div className="w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          Almacen D&apos;Valle
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full focus:!ring-[#10B981]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="w-full focus:!ring-[#10B981]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberPassword"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    Recordar contraseña
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-emerald-500 flex gap-2 hover:bg-emerald-600 text-white"
          >
            {isPending ? (
              'Cargando...'
            ) : (
              <>
                Iniciar Sesion
                <LogInIcon />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Login
