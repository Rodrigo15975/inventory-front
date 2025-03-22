const PATH_SERVICES = {
  API: process.env.NEXT_PUBLIC_API || 'http://localhost:4000/api-v1',
  AUTH: '/auth/login',
  PROFILE: 'user/profile',
  CATEGORY: '/categorie',
} as const
export const { API, AUTH, PROFILE, CATEGORY } = PATH_SERVICES
