import {
  Package,
  ShoppingBag,
  BarChart3,
  Tag,
  Truck,
  Users,
} from 'lucide-react'
export const menuItems = [
  {
    section: 'GESTION',
    items: [
      {
        title: 'Entradas',
        icon: ShoppingBag,
        href: '#',
      },
      {
        title: 'Salidas',
        icon: ShoppingBag,
        href: '#',
      },
      {
        title: 'Kardex',
        icon: BarChart3,
        href: '#',
      },
    ],
  },
  {
    section: 'ADMINISTRACION',
    items: [
      {
        title: 'Productos',
        icon: Package,
        href: 'product',
        active: true,
      },
      {
        title: 'Categorías',
        icon: Tag,
        href: '#',
      },
      {
        title: 'Proveedor',
        icon: Truck,
        href: '#',
      },
      {
        title: 'Usuarios',
        icon: Users,
        href: 'user',
      },
    ],
  },
]
