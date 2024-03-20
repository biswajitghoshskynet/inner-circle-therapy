
'use client'

import { useState, useEffect } from "react"


export default function Home() {

  const [pointer, setPointer] = useState(null)

  const [name, setName] = useState(null)

  const [data, setData] = useState(null)



  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(name);
    setPointer(
      [
        {
          persone: name,
          x: '',
          y: '',
          relation: ''
        }
      ]
    )


  }
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(pointer));
    setData(JSON.parse(localStorage.getItem('users')))

  }, [pointer]);






    const container = document.querySelector('.mainContainer')
    const circle1 = document.querySelector('.circle1')
    const circle2 = document.querySelector('.circle2')
    const circle3 = document.querySelector('.circle3')




    const moveFunction = (e) => {
      let target = e.target;
      
  
      
      // target.addEventListener('pointerup', () => {
      //   window.removeEventListener('pointermove', runFunction)
      // })
      const runFunction = () => {
        let mousePos = { x: e.clientX, y: e.clientY };
        if (
          // left
          mousePos.x > (container.offsetLeft - (container.clientWidth / 2)) &
          // right
          mousePos.x < (container.offsetLeft + ((container.clientWidth / 2) - target.clientHeight)) &
          // top
          mousePos.y > (container.offsetTop - (container.clientHeight / 2)) &
          // bottom
          mousePos.y < (container.offsetTop + ((container.clientWidth / 2) - target.clientHeight))
        ) {
          target.style.left = `${mousePos.x}px`
          target.style.top = `${mousePos.y}px`
          setPointer({
            ...pointer,
            x: target.style.left,
            y: target.style.top
          })
        };

        // track circle 1

        if (
          mousePos.x < (container.offsetLeft + (circle3.clientWidth / 2)) &
          mousePos.x > (container.offsetLeft - (circle3.clientWidth / 2)) &
          mousePos.y > (container.offsetTop - (circle3.clientHeight / 2)) &
          mousePos.y < (container.offsetTop + (circle3.clientHeight / 2))
        ) {
          if (
            mousePos.x < (container.offsetLeft + (circle2.clientWidth / 2)) &
            mousePos.x > (container.offsetLeft - (circle2.clientWidth / 2)) &
            mousePos.y > (container.offsetTop - (circle2.clientHeight / 2)) &
            mousePos.y < (container.offsetTop + (circle2.clientHeight / 2))
          ) {
            if (
              mousePos.x < (container.offsetLeft + (circle1.clientWidth / 2)) &
              mousePos.x > (container.offsetLeft - (circle1.clientWidth / 2)) &
              mousePos.y > (container.offsetTop - (circle1.clientHeight / 2)) &
              mousePos.y < (container.offsetTop + (circle1.clientHeight / 2))
            ) {
              setPointer({
                ...pointer,
                x: target.style.left,
                y: target.style.top,
                relation: "Deep"
              })

            }
            else {
              setPointer({
                ...pointer,
                x: target.style.left,
                y: target.style.top,
                relation: "Hi/Hello"
              })

            }

          }
          else {
            setPointer({
              ...pointer,
              x: target.style.left,
              y: target.style.top,
              relation: "Not Friend"
            })

          }

        }
        else {
          setPointer({
            ...pointer,
            x: target.style.left,
            y: target.style.top,
            relation: "Enemy"
          })
        }
      }

      window.addEventListener('pointermove', runFunction)
    



  }


  return (
    <>
      <div className="mainContainer">
        <div className="circle1" data-zone="Safe"></div>
        <div className="circle2" data-zone="Medium"></div>
        <div className="circle3" data-zone="Warning"></div>
      </div>

      {data !== null ?
        data.map((item, index) => (
          <div key={index} data-id={item.persone} className="dragBox" onPointerDown={moveFunction}></div>
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
