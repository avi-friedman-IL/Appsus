import { eventBusService } from "../services/event-bus.service.js"

const { NavLink } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('user-msg', (msg) => {
            setMsg(msg)
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(onCloseMsg, 1000)
        })
        return unsubscribe
    }, [])

    function onCloseMsg() {
        setMsg(null)
        clearTimeout(timeoutIdRef.current)
    }

    if (!msg) return <React.Fragment></React.Fragment>
    return (
        <section className={`user-msg ${msg.type || ""}`}>
            <button onClick={onCloseMsg}>X</button>
            <h1>{msg.type.toUpperCase()}</h1>
            <p>{msg.txt}</p>
            <NavLink to={`/book`}>Check it out now!</NavLink>
        </section>
    )
}