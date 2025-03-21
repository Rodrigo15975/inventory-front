import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const getToken = (res: NextRequest) => res.cookies.get('auth')?.value

export async function middleware(req: NextRequest) {
  const token = getToken(req)
  const { pathname } = req.nextUrl

  if (!token && pathname !== '/login')
    return NextResponse.redirect(new URL('/login', req.url))

  if (token && (pathname === '/' || pathname === '/login'))
    return NextResponse.redirect(new URL('/product', req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/product', '/login'],
}
