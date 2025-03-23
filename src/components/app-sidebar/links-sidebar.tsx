import {
  Package,
  ShoppingBag,
  BarChart3,
  Tag,
  Truck,
  Users,
  PackageSearch,
} from 'lucide-react'
export const menuItems = [
  {
    section: 'GESTION',
    items: [
      {
        title: 'Entradas',
        icon: ShoppingBag,
        href: '/entry',
      },
      {
        title: 'Salidas',
        icon: ShoppingBag,
        href: '/exit',
      },
      {
        title: 'Kardex',
        icon: BarChart3,
        href: '/kardex',
      },
    ],
  },
  {
    section: 'ADMINISTRACION',
    items: [
      {
        title: 'Productos',
        icon: Package,
        href: '/product',
      },
      {
        title: 'Categorías',
        icon: Tag,
        href: '/category',
      },
      {
        title: 'Proveedor',
        icon: Truck,
        href: '/proveedor',
      },
      {
        title: 'Usuarios',
        icon: Users,
        href: '/user',
      },
      {
        title: 'Tipos',
        icon: PackageSearch,
        href: '/tipos',
      },
    ],
  },
]
