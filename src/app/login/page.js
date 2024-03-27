'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { setToken } from '../../lib/sitecookies';




export default function Page() {

    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        setMounted(true)

    }, [])

    const router = useRouter()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handelSubmit = async (e) => {
        e.preventDefault()

        let data = await fetch(`${process.env.HOST}api/users/login`, {
            cache: 'no-store',
            method: "POST",
            body: JSON.stringify({ email, password })
        })
        data = await data.json()

        if (data.success === false) {
            if (data?.msg) {
                toast.error(data.msg);
            }


        }
        else if (data.success === true) {
            localStorage.setItem('userid', data.id);
            toast.success(data.msg);
            setEmail('')
            setPassword('')
            setToken(data.token)

            setTimeout(() => {
                router.push('/')
            }, 500)
        }

    }
    return mounted && (
        <>
            <div className='p-10'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-sm-8 col-md-7 col-lg-5 col-xl-4'>
                            <div className='loginBox'>
                            <h1 className="text-center mb-3 h2">Sign In</h1>
                                <form onSubmit={handelSubmit}>
                                    <div className='mb-1'>
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" name="email" type="email" autoComplete="email" required className="form-control" />
                                    </div>
                                    <div className='mb-1'>
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} id="password" name="password" type="password" autoComplete="current-password" required className="form-control" />
                                    </div>
                                    <div className='mb-3 d-grid'>
                                        <button type="submit" className="btn btn-primary">Sign in</button>
                                    </div>
                                </form>
                                <p className="mt-10 text-center text-sm text-gray-500">
                                    No account? <Link href="/registration" className="text-primary">Sign Up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>




            <ToastContainer />

        </>
    )
}
