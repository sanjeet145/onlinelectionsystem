import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { dbConnect } from './db/dbConn';
import Admin from './models/admin';
import { jwtDecode } from 'jwt-decode';


export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/register' || path === '/' || path === '/pages/registeradmin'

  const session = request.cookies.get('session')?.value || "";
  if (session) {
    const decode: any = jwtDecode(session);

    if (isPublicPath) {
      // For public paths, redirect to appropriate page if session is present
      if (session) {
        if (decode.isAdmin) {
          return NextResponse.redirect(new URL('/pages/Admin', request.nextUrl));
        } else {
          return NextResponse.redirect(new URL('/pages/Profile', request.nextUrl));
        }
      }
    }
    else {
      if (!session) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
      } else {
        // For '/pages/Admin' path, allow access if isAdmin is true, otherwise, redirect to '/pages/Profile'
        if (path === '/pages/Admin') {
          if (!decode.isAdmin) {
            return NextResponse.redirect(new URL('/pages/Profile', request.nextUrl));
          }
        }
      }
    }
  }
  

  //if session not available

  if (!session) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/', request.nextUrl));

    }
    return null;

  }
  // If no redirection is necessary, return null to allow the request to proceed


  // if(isPublicPath && session){
  //     // await dbConnect();
  //     // const admin = await Admin.findOne({session.username})
  //     if (decode.isAdmin){
  //       return NextResponse.redirect(new URL('/pages/Admin' , request.nextUrl))
  //     }
  //     else{
  //       return NextResponse.redirect(new URL('/pages/Profile' , request.nextUrl))
  //     }
  // }
  //  if(path==='/pages/Admin' && session){
  //   console.log(!decode.isAdmin);
  //   if(!decode.isAdmin){
  //     return NextResponse.redirect(new URL('/pages/Profile' , request.nextUrl))

  //   }
  //   else{
  //     return NextResponse.redirect(new URL('/pages/Admin' , request.nextUrl))

  //   }
  // }
  // if(!isPublicPath && !session){
  //     return NextResponse.redirect(new URL('/login' , request.nextUrl))
  // }

}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/pages/Admin',
    '/pages/registeradmin',
    '/pages/Profile',
  ],
}