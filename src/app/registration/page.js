'use client'
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
    const [hasMounted, setHasMounted] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let data = await fetch(`${process.env.HOST}api/users/`, {
            cache: 'no-store',
            method: "POST",
            body: JSON.stringify({ name, email, password })
        })
        data = await data.json()
        if (data.success === false) {
            if (data?.error?.message) {
                toast.error(data.error.message);
            }
            if (data?.message) {
                toast.error(data.message);
            }
        }
        else if (data.success === true) {
            toast.success(`Thank you`);
            setName('')
            setEmail('')
            setPassword('')
            setTimeout(() => {
                router.push('/')
            }, 1000)
        }

    }

    return hasMounted && (
        <>
            <div className='p-10'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-sm-8 col-md-7 col-lg-5 col-xl-4'>
                            <div className='loginBox'>
                                <h1 className="text-center mb-3 h2">Signup</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className='mb-1'><input type="text" className='form-control' id='name' name='name' placeholder="Name" onChange={(e)=>{setName(e.target.value)}} required /></div>
                                    <div className='mb-1'><input type="email" className='form-control' id='email' name='email' placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} required /></div>
                                    <div className='mb-3'><input type="text" className='form-control' id='password' name='password' placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required /></div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
