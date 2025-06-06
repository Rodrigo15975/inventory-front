import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  EditIcon,
  FileText,
  MapPin,
  Phone,
  TrashIcon,
  User,
} from 'lucide-react'
import { Provider } from '../../types/types.proveedor'

export function ProveedorCard({
  proveedor,
  providerDelete,
  providerEdit,
  btnDisabled,
}: {
  btnDisabled: boolean
  proveedor?: Provider
  providerDelete: (id: string) => void
  providerEdit: (provider: Provider['proveedor'][number]) => void
}) {
  if (!proveedor) return null
  const { proveedor: data } = proveedor

  const handledDelete = (id: string) => providerDelete(id)
  const handledEdit = (provider: Provider['proveedor'][number]) =>
    providerEdit(provider)
  return (
    <>
      {data.map((data) => (
        <Card key={data.id} className="overflow-hidden">
          <CardHeader className="bg-primary/5 pb-3">
            <CardTitle className="text-lg">
              Razón Social: {data.corporate_reason}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div className=" flex gap-3 items-center">
                <p className="font-medium text-sm">RUC: </p>
                <p>{data.ruc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-primary mt-0.5" />
              <div className=" flex gap-3 items-center">
                <p className="font-medium text-sm">Representante Legal: </p>
                <p>{data.legalRepresentative}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div className=" flex gap-3 items-center">
                <p className="font-medium text-sm">Dirección: </p>
                <p>{data.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div className=" flex gap-3 items-center">
                <p className="font-medium text-sm">Teléfono: </p>
                <p>{data.phone}</p>
              </div>
            </div>
          </CardContent>
          {data.id && (
            <CardFooter className="flex gap-3">
              <Button
                disabled={btnDisabled}
                onClick={() => handledDelete(data.id)}
                size={'icon'}
              >
                <TrashIcon />
              </Button>
              <Button
                disabled={btnDisabled}
                onClick={() =>
                  handledEdit(
                    proveedor.proveedor.find((p) => p.id === data.id)!
                  )
                }
                size={'icon'}
              >
                <EditIcon />
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </>
  )
}
