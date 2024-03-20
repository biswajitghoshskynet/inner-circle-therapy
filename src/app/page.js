
'use client'

import { useState, useEffect, useRef } from "react"


export default function Home() {

  const [pointer, setPointer] = useState([])
  const [name, setName] = useState(null)
  const [data, setData] = useState(null)



  // form submission
  const handleSubmit = (event) => {
    event.preventDefault()

    setPointer(
      [
        ...pointer,

        {
          persone: name,
          x: '',
          y: '',
          relation: ''
        }
      ]
    )
  }

  // save Local strage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(pointer));
    setData(JSON.parse(localStorage.getItem('users')))

  }, [pointer]);





  const container = useRef(0);
  const circle1 = useRef(0);
  const circle2 = useRef(0);
  const circle3 = useRef(0);




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


        let oldData = pointer.filter((item) => (
          item.persone !== target.getAttribute('data-id')
        ))


        setPointer(
          [
            ...oldData,
            {
              persone: name,
              x: target.style.left,
              y: target.style.top,
              relation: ''
            }
          ]
        )
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
            let oldData = pointer.filter((item) => (
              item.persone !== target.getAttribute('data-id')
            ))
            setPointer(
              [
                ...oldData,
                {
                  persone: name,
                  x: target.style.left,
                  y: target.style.top,
                  relation: "Deep"
                }
              ]
            )


          }
          else {
            let oldData = pointer.filter((item) => (
              item.persone !== target.getAttribute('data-id')
            ))
            setPointer(
              [
                ...oldData,
                {
                  persone: name,
                  x: target.style.left,
                  y: target.style.top,
                  relation: "Hi/Hello"
                }
              ]
            )


          }

        }
        else {
          let oldData = pointer.filter((item) => (
            item.persone !== target.getAttribute('data-id')
          ))
          setPointer(
            [
              ...oldData,
              {
                persone: name,
                x: target.style.left,
                y: target.style.top,
                relation: "Not Friend"
              }
            ]
          )



        }

      }
      else {
        let oldData = pointer.filter((item) => (
          item.persone !== target.getAttribute('data-id')
        ))
        setPointer(
          [
            ...oldData,
            {
              persone: name,
              x: target.style.left,
              y: target.style.top,
              relation: "Enemy"
            }
          ]
        )


      }

      window.addEventListener('pointerup', () => {
        window.removeEventListener('pointermove', runFunction)
      })
    }



    window.addEventListener('pointermove', runFunction)


  }





  return (
    <>




      <div className="mainContainer" ref={container}>
        <div className="circle1" data-zone="Safe" ref={circle1}></div>
        <div className="circle2" data-zone="Medium" ref={circle2}></div>
        <div className="circle3" data-zone="Warning" ref={circle3}></div>
      </div>

      {data !== null ?
        data.map((item, index) => (
          <div key={index} data-id={item.persone} className="dragBox" onPointerDown={moveFunction} ></div>
        ))
        : null}


      <div className="formBox">
        <div>

        </div>
        <form onSubmit={handleSubmit} className="mb-2">
          <div className="mb-1"><input type="text" id="name" name="name" onChange={(e) => { setName(e.target.value) }} className="form-control" placeholder="Name" /></div>
          <button type="submit" className="btn btn-sm btn-success">Add</button>
        </form>
        <div className="dataList">
          <h4>Relation List</h4>
          {data !== null ?
            data.map((item, index) => (
              <div key={index} className="relationBlock">
                Name: {item.persone}<br />
                Relation: {item.relation}<br />
                X:({item.x}) ,
                Y:({item.y})
              </div>
            ))
            : null}
        </div>

      </div >



    </>
  );
}
