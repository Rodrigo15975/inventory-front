'use server'
import { cookies } from 'next/headers'
export const setAuthTokenAction = async (token: string) => {
  const cookieStore = await cookies()
  const isProduction = process.env.NODE_ENV === 'production'
  console.log({
    message: isProduction ? 'Modo Producción' : 'Modo Desarrollo',
    token,
  })
  cookieStore.set('auth', token, {
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    httpOnly: true,
  })
}
