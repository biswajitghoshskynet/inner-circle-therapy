
'use client'

import { useState, useEffect, useRef } from "react"


export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [pointer, setPointer] = useState([])
  const [save, setSave] = useState(1)
  const [data, setData] = useState(null)

  const [name, setName] = useState(null)
  const [phone, setPhone] = useState(null)
  const [email, setEmail] = useState('')


  const container = useRef(0);
  const circle1 = useRef(0);
  const circle2 = useRef(0);
  const circle3 = useRef(0);





  useEffect(() => {
    setHasMounted(true);
  }, []);


  // form submission
  const handleSubmit = (event) => {
    event.preventDefault()

    let random = Math.random()
    let idNo = random.toString().split('.')[1]

    setPointer(
      [
        ...pointer,

        {
          id: idNo,
          persone: name,
          phone: phone,
          email: email,
          x: '',
          y: '',
          relation: ''
        }
      ]
    )
    setSave(save + 1)
  }



  const moveFunction = (e) => {
    let target = e.target;

    const runFunction = (e) => {
      let mousePos = { x: e.clientX, y: e.clientY };
      if (
        mousePos.x > (container.current.offsetLeft - (container.current.clientWidth / 2)) &
        mousePos.x < (container.current.offsetLeft + ((container.current.clientWidth / 2) - target.clientHeight)) &
        mousePos.y > (container.current.offsetTop - (container.current.clientHeight / 2)) &
        mousePos.y < (container.current.offsetTop + ((container.current.clientWidth / 2) - target.clientHeight))
      ) {
        target.style.left = `${mousePos.x}px`
        target.style.top = `${mousePos.y}px`

        let allData = pointer

        allData.forEach(item => {
          if (item.id === target.getAttribute('data-id')) {
            item.x = target.style.left,
              item.y = target.style.top
          }
        });
        setPointer(allData)
        setSave(mousePos.x + mousePos.y)

        console.log(pointer);
      };

      if (
        mousePos.x < (container.current.offsetLeft + (circle3.current.clientWidth / 2)) &
        mousePos.x > (container.current.offsetLeft - (circle3.current.clientWidth / 2)) &
        mousePos.y > (container.current.offsetTop - (circle3.current.clientHeight / 2)) &
        mousePos.y < (container.current.offsetTop + (circle3.current.clientHeight / 2))
      ) {
        if (
          mousePos.x < (container.current.offsetLeft + (circle2.current.clientWidth / 2)) &
          mousePos.x > (container.current.offsetLeft - (circle2.current.clientWidth / 2)) &
          mousePos.y > (container.current.offsetTop - (circle2.current.clientHeight / 2)) &
          mousePos.y < (container.current.offsetTop + (circle2.current.clientHeight / 2))
        ) {
          if (
            mousePos.x < (container.current.offsetLeft + (circle1.current.clientWidth / 2)) &
            mousePos.x > (container.current.offsetLeft - (circle1.current.clientWidth / 2)) &
            mousePos.y > (container.current.offsetTop - (circle1.current.clientHeight / 2)) &
            mousePos.y < (container.current.offsetTop + (circle1.current.clientHeight / 2))
          ) {

            let allData = pointer
            allData.forEach(item => {
              if (item.id === target.getAttribute('data-id')) {
                item.x = target.style.left,
                  item.y = target.style.top,
                  item.relation = "Friend"
              }
            });
            setPointer(allData)
            setSave(mousePos.x + mousePos.y)
          }
          else {
            let allData = pointer
            allData.forEach(item => {
              if (item.id === target.getAttribute('data-id')) {
                item.x = target.style.left,
                  item.y = target.style.top,
                  item.relation = "Hi/Hello"
              }
            });
            setPointer(allData)
            setSave(mousePos.x)


          }

        }
        else {
          let allData = pointer
          allData.forEach(item => {
            if (item.id === target.getAttribute('data-id')) {
              item.x = target.style.left,
                item.y = target.style.top,
                item.relation = "Not Friend"
            }
          });
          setPointer(allData)
          setSave(mousePos.x + mousePos.y)
        }

      }
      else {
        let allData = pointer
        allData.forEach(item => {
          if (item.id === target.getAttribute('data-id')) {
            item.x = target.style.left,
              item.y = target.style.top,
              item.relation = "Enemy"
          }
        });
        setPointer(allData)
        setSave(mousePos.x + mousePos.y)
      }

      window.addEventListener('pointerup', () => {
        window.removeEventListener('pointermove', runFunction)
      })
    }



    window.addEventListener('pointermove', runFunction)


  }



  // save Local strage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(pointer));
    setData(JSON.parse(localStorage.getItem('users')))

  }, [save]);




  //Tab

  const tabFunction = () => {
    if (typeof window !== "undefined") {
      const tabLink = document.querySelectorAll('.tabLinks li')
      const tabContent = document.querySelectorAll('.tabContainer')
      tabLink.forEach(item => {
        item.addEventListener('click', ()=>{
          tabContent.forEach(content => {
            if(content.getAttribute('id') === item.getAttribute('data-id')){
              content.style.display="block"
            }
            else{
              content.style.display="none"
            }
          });
        })
      });
    }

  }



  const handleTab = (e) => {
    e.target.style.color = '#000'
    if (e.target.getAttribute('data-id') === 'tab1') {
      tab1.current.style.display = 'block'
    }
    if (e.target.getAttribute('data-id') === 'tab2') {
      tab2.current.style.display = 'block'
    }
  }



  return hasMounted && (
    <>




      <div className="mainContainer" ref={container}>
        <div className="circle1" data-zone="Safe" ref={circle1}></div>
        <div className="circle2" data-zone="Medium" ref={circle2}></div>
        <div className="circle3" data-zone="Warning" ref={circle3}></div>
      </div>

      {data !== null ?
        data.map((item, index) => (
          <div key={index} data-id={item.id} className="dragBox" title={item.persone} onPointerDown={moveFunction} ></div>
        ))
        : null}


      <div className="formBox">
        <div>

        </div>
        <form onSubmit={handleSubmit} className="mb-2">
          <div className="mb-1"><input type="text" id="name" name="name" onChange={(e) => { setName(e.target.value) }} className="form-control" placeholder="Name" required /></div>
          <div className="mb-1"><input type="text" id="phone" name="phone" onChange={(e) => { setPhone(e.target.value) }} className="form-control" placeholder="Phone" required /></div>
          <div className="mb-1"><input type="email" id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" placeholder="Email" /></div>
          <button type="submit" className="btn btn-sm btn-success">Create</button>
        </form>
        <div className="dataList">
          <h4>Relation List</h4>
          <div className="tabBox" >
            <ul className="tabLinks d-flex gap-3 mb-1" >
              <li data-id="tab1">All</li>
              <li data-id="tab2">Friends</li>
            </ul>
            <div className="tabContainer" id="tab1" >
              <p>All Mwmber</p>
              {data !== null ?
                data.map((item, index) => (
                  <div key={index} className="relationBlock">

                    {item.persone}<br />
                    {item.phone}<br />
                    {item.email}<br />
                    Relation: <strong>{item.relation}</strong> <br />
                    X:({item.x}) ,
                    Y:({item.y})<br />
                    <small>ID: {item.id}</small>
                  </div>
                ))
                : '0 relative'}
            </div>
            <div className="tabContainer" id="tab2">
            <p>All Friend</p>
              {data !== null ?
                data.map((item, index) => (
                  <div key={index} className="relationBlock">

                    {item.persone}<br />
                    {item.phone}<br />
                    {item.email}<br />
                    Relation: <strong>{item.relation}</strong> <br />
                    X:({item.x}) ,
                    Y:({item.y})<br />
                    <small>ID: {item.id}</small>
                  </div>
                ))
                : '0 friend'}
            </div>
          </div>

        </div>

      </div >

      {console.log(tabFunction())}

    </>
  );
}
