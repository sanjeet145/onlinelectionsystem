import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path=== '/register' || path === '/'

    const session = request.cookies.get('session')?.value || ""
    if(isPublicPath && session){
        return NextResponse.redirect(new URL('/pages/Admin' , request.nextUrl))
    }
    if(!isPublicPath && !session){
        return NextResponse.redirect(new URL('/login' , request.nextUrl))
    }

    //   return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/pages/Admin'
  ],
}