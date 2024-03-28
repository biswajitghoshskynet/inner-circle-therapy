
'use client'
import { useState, useEffect, useRef } from "react"






export default function UpdateContact
    ({
        old_name, old_email, old_phone, old_relation, old_positionX, old_positionY, old_id, setReload, reload,
        container, circle1, circle2, circle3
    }) {
    const [relation, setRelation] = useState(old_relation)
    const [positionX, setPositionX] = useState(old_positionX)
    const [positionY, setPositionY] = useState(old_positionY)
    const [hover, setHover] = useState(false)

    useEffect(() => {
        formHandle()
    }, [relation, positionX, positionY])

    const formHandle = async (e) => {
        await fetch(`${process.env.HOST}api/contact/${old_id}`, {
            cache: 'no-store',
            method: "PUT",
            body: JSON.stringify({ relation, positionX, positionY })
        }).then(() => {
            setReload(reload + 1)
        })
    }



    const moveFunction = (e) => {
        let target = e.target;
        const runFunction = (e) => {
            let mousePos = {
                x: (e.clientX - (container.current.offsetLeft - (container.current.clientWidth / 2))),
                y: (e.clientY - (container.current.offsetTop - (container.current.clientHeight / 2)))
            };
            if (
                mousePos.x > 0 &
                mousePos.x < (container.current.clientWidth - target.clientWidth) &
                mousePos.y > 0 &
                mousePos.y < (container.current.clientHeight - target.clientHeight)
            ) {
                target.style.left = `${mousePos.x}px`
                target.style.top = `${mousePos.y}px`
                setPositionX(target.style.left)
                setPositionY(target.style.top)
            }


            if (
                mousePos.x > (circle3.current.offsetLeft - (circle3.current.clientWidth / 2)) &
                mousePos.x < (circle3.current.offsetLeft + (circle3.current.clientWidth / 2)) &
                mousePos.y > (circle3.current.offsetTop - (circle3.current.clientHeight / 2)) &
                mousePos.y < (circle3.current.offsetTop + (circle3.current.clientHeight / 2))
            ) {
                if (
                    mousePos.x < (circle2.current.offsetLeft + (circle2.current.clientWidth / 2)) &
                    mousePos.x > (circle2.current.offsetLeft - (circle2.current.clientWidth / 2)) &
                    mousePos.y > (circle2.current.offsetTop - (circle2.current.clientHeight / 2)) &
                    mousePos.y < (circle2.current.offsetTop + (circle2.current.clientHeight / 2))
                ) {
                    if (
                        mousePos.x < (circle1.current.offsetLeft + (circle1.current.clientWidth / 2)) &
                        mousePos.x > (circle1.current.offsetLeft - (circle1.current.clientWidth / 2)) &
                        mousePos.y > (circle1.current.offsetTop - (circle1.current.clientHeight / 2)) &
                        mousePos.y < (circle1.current.offsetTop + (circle1.current.clientHeight / 2))
                    ) {

                        setPositionX(target.style.left)
                        setPositionY(target.style.top)
                        setRelation('Friend')
                        setReload(mousePos.x + mousePos.y)
                    }
                    else {
                        setPositionX(target.style.left)
                        setPositionY(target.style.top)
                        setRelation('Hi/Hello')
                        setReload(mousePos.x)
                    }
                }

                else {
                    setPositionX(target.style.left)
                    setPositionY(target.style.top)
                    setRelation('Not Friend')
                    setReload(mousePos.x + mousePos.y)
                }
            }

            else {
                setPositionX(target.style.left)
                setPositionY(target.style.top)
                setRelation('Enemy')
                setReload(mousePos.x + mousePos.y)
            }

            container.current.addEventListener('pointerup', () => {
                container.current.removeEventListener('pointermove', runFunction)
            })
        }
        container.current.addEventListener('pointermove', runFunction)
    }

    return (
        <>

            <div data-id={old_id} className="dragBox" style={{ left: positionX, top: positionY }} title={old_name} onPointerDown={moveFunction}></div>

        </>
    )
}
