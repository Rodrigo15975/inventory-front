const PATH_SERVICES = {
  API: process.env.NEXT_PUBLIC_API || 'http://localhost:4000/api-v1',
  AUTH: '/auth/login',
  PROFILE: 'user/profile',
  CATEGORY: '/categorie',
  TYPE_PRODUCT: '/type-product',
  TYPE_PRESENTATION: '/type-presentation',
  ROLES: '/roles',
  USER: '/user',
  PRODUCT: '/product',
} as const

export const {
  API,
  PRODUCT,
  USER,
  AUTH,
  ROLES,
  PROFILE,
  CATEGORY,
  TYPE_PRESENTATION,
  TYPE_PRODUCT,
} = PATH_SERVICES
