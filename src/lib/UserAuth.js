
'use client'
import { getToken } from "./sitecookies"
import { useRouter, usePathname  } from 'next/navigation';

export default function UserAuth({ data }) {
    const router = useRouter()
    const pathname = usePathname()
    console.log(pathname);

    let token = getToken()
    if (token === null) {
        
        router.push('/login')
    }
    else{
        if(pathname==='/login'){
            router.push('/')
        }
        return data
    }
    
}
