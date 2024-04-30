import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { dbConnect } from './db/dbConn';
import Admin from './models/admin';
import { getDataFromCookie } from './helpers/getDataFromCookie';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path=== '/register' || path === '/'

    const session = request.cookies.get('session')?.value || ""
    if(isPublicPath && session){
        console.log(getDataFromCookie(request));
        // await dbConnect();
        // const admin = await Admin.findOne({session.username})
        return NextResponse.redirect(new URL('/pages/Admin' , request.nextUrl))
    }
    if(!isPublicPath && !session){
        return NextResponse.redirect(new URL('/login' , request.nextUrl))
    }

}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/pages/Admin'
  ],
}