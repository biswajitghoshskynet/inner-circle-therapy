
'use client'

import { useState } from "react"


export default function Home() {

  const [pointer, setPointer] = useState({
    persone: 'Sumanta',
    x: '',
    y: '',
    relation: ''
  })


  if (typeof document !== 'undefined') {

    const dragElement = document.querySelector('.dragBox')
    const container = document.querySelector('.mainContainer')



    const circle1 = document.querySelector('.circle1')
    const circle2 = document.querySelector('.circle2')
    const circle3 = document.querySelector('.circle3')


    const moveFunction = (e) => {
      let mousePos = { x: e.clientX, y: e.clientY };
      if (
        // left
        mousePos.x > (container.offsetLeft - (container.clientWidth / 2)) &
        // right
        mousePos.x < (container.offsetLeft + ((container.clientWidth / 2) - dragElement.clientHeight)) &
        // top
        mousePos.y > (container.offsetTop - (container.clientHeight / 2)) &
        // bottom
        mousePos.y < (container.offsetTop + ((container.clientWidth / 2) - dragElement.clientHeight))
      ) {
        dragElement.style.left = `${mousePos.x}px`
        dragElement.style.top = `${mousePos.y}px`
        setPointer({
          ...pointer,
          x: dragElement.style.left,
          y: dragElement.style.top
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
              x: dragElement.style.left,
              y: dragElement.style.top,
              relation: "Deep"
            })

          }
          else {
            setPointer({
              ...pointer,
              x: dragElement.style.left,
              y: dragElement.style.top,
              relation: "Hi/Hello"
            })

          }

        }
        else {
          setPointer({
            ...pointer,
            x: dragElement.style.left,
            y: dragElement.style.top,
            relation: "Not Friend"
          })

        }

      }
      else {
        setPointer({
          ...pointer,
          x: dragElement.style.left,
          y: dragElement.style.top,
          relation: "Enemy"
        })
      }
    }

    dragElement.addEventListener('pointerdown', () => {
      window.addEventListener('pointermove', moveFunction)
      console.log('down');
    })
    dragElement.addEventListener('pointerup', () => {
      window.removeEventListener('pointermove', moveFunction)
      console.log('up');
    })




  }


  return (
    <>
      <div className="mainContainer">
        <div className="circle1" data-zone="Safe"></div>
        <div className="circle2" data-zone="Medium"></div>
        <div className="circle3" data-zone="Warning"></div>
      </div>
      <div className="dragBox"></div>


      <div className="pinterLocation">
        {pointer != null ?
          <>
            <div>
              Name: {pointer.persone}<br />
              Relation: {pointer.relation}<br />
              X: {pointer.x}<br />
              Y: {pointer.y}
            </div>
          </>
          : null}
      </div>
    </>
  );
}
