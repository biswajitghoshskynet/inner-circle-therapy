
'use client'

import { useState, useEffect, useRef } from "react"
import { getToken } from "@/lib/sitecookies";
import DeleteContact from '@/utils/DeleteContact'
import UpdateContact from "@/utils/UpdateContact";


export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  const [reload, setReload] = useState(1)
  const [data, setData] = useState(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [relation, setRelation] = useState('')
  const [positionX, setPositionX] = useState('')
  const [positionY, setPositionY] = useState('')
  const [owner, setOwner] = useState()


  const container = useRef(0);
  const circle1 = useRef(0);
  const circle2 = useRef(0);
  const circle3 = useRef(0);


  useEffect(() => {
    setHasMounted(true);
    let id = localStorage.getItem('userid')
    getData()
    tabFunction()
    setOwner(id)
  }, [reload]);

  const getData = async () => {
    let token = await getToken()
    let response = await fetch(`${process.env.HOST}api/contact`, {
      cache: 'no-store',
      headers: {
        'authorization': token
      },
    })
    response = await response.json()
    setData(response)
  }


  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    let response = await fetch(`${process.env.HOST}api/contact`, {
      cache: 'no-store',
      method: "POST",
      body: JSON.stringify({ name, phone, email, relation, positionX, positionY, owner })
    }).then(() => {
      setName('')
      setPhone('')
      setEmail('')
      // setRelation('')
      setPositionX('')
      setPositionY('')
    })
    setReload(reload + 1)
  }



  const tabFunction = () => {
    if (typeof window !== "undefined") {
      const tabLink = document.querySelectorAll('.tabLinks li')
      const tabContent = document.querySelectorAll('.tabContainer')
      tabLink.forEach(item => {
        
        item.addEventListener('click', (e) => {
         
         
          tabContent.forEach(content => {
            if (content.getAttribute('id') === item.getAttribute('data-id')) {
              content.style.display = "block"
            }
            else {
              content.style.display = "none"
            }
          });
          

          tabLink.forEach(activeLink => {
            activeLink.className=''
          })
          item.className='active'
        })
      });
    }

  }






  return hasMounted && (
    <>




      <div className="mainContainer" ref={container}>
        <div className="circle1" data-zone="Safe" ref={circle1}></div>
        <div className="circle2" data-zone="Medium" ref={circle2}></div>
        <div className="circle3" data-zone="Warning" ref={circle3}></div>
      </div>


      {data?.success === true ?
        data.data.map((item, index) => (
          <UpdateContact
            key={index}
            old_name={item.name}
            old_phone={item.phone}
            old_email={item.email}
            old_positionX={item.positionX}
            old_positionY={item.positionY}
            old_relation={item.relation}
            old_id={item._id}
            setReload={setReload}
            reload={reload}
            container={container}
            circle1={circle1}
            circle2={circle2}
            circle3={circle3}
          />
        ))
        : null}




      <div className="formBox">
        <div>

        </div>
        <form onSubmit={handleSubmit} className="mb-2">
          <div className="mb-1"><input type="text" id="name" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" placeholder="Name" required /></div>
          <div className="mb-1"><input type="text" id="phone" name="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control" placeholder="Phone" required /></div>
          <div className="mb-1"><input type="email" id="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" placeholder="Email" /></div>
          <div className="mb-1">
            <select name="relation" required id="relation" className="form-control" onChange={(e) => { setRelation(e.target.value) }} value={relation}>
              <option value="Friend">Friend</option>
              <option value="Hi/Hello">Hi/Hello</option>
              <option value="Not Friend">Not Friend</option>
              <option value="Enemy">Enemy</option>
            </select>
          </div>
          <button type="submit" className="btn btn-sm btn-success">Create</button>
        </form>
        <div className="dataList">
          <h4>Relation List</h4>

          <div className="tabBox" >
            <ul className="tabLinks d-flex gap-3 mb-1" >
              <li data-id="tab1" className="active">All</li>
              <li data-id="tab2">Friends</li>
            </ul>
            <div className="tabContainer" id="tab1" style={{display: 'block'}} >
              {data?.success === true ?
                data.data.map((item, index) => (
                  <div key={index} className="relationBlock position-relative">
                    {item.name}<br />
                    {item.phone}<br />
                    {item.email}<br />
                    Relation: <strong>{item.relation}</strong>
                    <div className="deleteBtn"><DeleteContact id={item._id} setReload={setReload} reload={reload} /></div>
                  </div>
                ))
                : '0 Member'}
            </div>
            <div className="tabContainer" id="tab2">

              {data?.success === true ?
                data.data.filter((contact)=>(contact.relation === 'Friend')).map((item, index) => (
                  <div key={index} className="relationBlock position-relative">
                    {item.name}<br />
                    {item.phone}<br />
                    {item.email}<br />
                    Relation: <strong>{item.relation}</strong>
                    <div className="deleteBtn"><DeleteContact id={item._id} setReload={setReload} reload={reload} /></div>
                  </div>
                ))
                : '0 friend'}
            </div>
          </div>

        </div>

      </div >



    </>
  );
}
