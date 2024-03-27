
'use server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'


export async function setToken(data) {
  cookies().set('innerCircleToken', data)
}

export async function getToken() {
  let token =  cookies().get('innerCircleToken')
   return token?.value?token.value:null
}

export async function deleteToken() {
  cookies().delete('innerCircleToken')
}
