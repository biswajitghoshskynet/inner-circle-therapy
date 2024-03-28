
'use client'
import { useState, useEffect } from 'react'






export default function DeleteContact({ id, setReload, reload }) {
    const [owner, setOwner] = useState('')

    useEffect(() => {

        let user = localStorage.getItem('userid')
        setOwner(user)
    }, [])




    const handleFatch = async () => {

        let data = await fetch(`${process.env.HOST}api/contact/${id}`, {
            cache: 'no-store',
            method: 'delete',
            headers: {
                'authorization': owner
            },
        })
        data = await data.json()
        if (data?.acknowledged === true) {
            setReload(reload + 1)
        }
    }

    return (
        <>
            <button onClick={handleFatch} className='text-danger'><span className="material-icons-outlined">
              <strong>X</strong>
            </span></button>
           
        </>
    )
}
