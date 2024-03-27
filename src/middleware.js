import { NextResponse } from 'next/server'

import { cookies } from 'next/headers'



export function middleware(request) {

  const currentUser = request.cookies.get('innerCircleToken')?.value


  if (!currentUser) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}


export const config = {
  matcher: ['/']
}