import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailCompose({ close }) {

    const [mail, setMail] = useState(mailService.getEmptyMail)

    useEffect(() => {

    }, [])

    function onSave(ev) {
        ev.preventDefault()
        mailService.save(mail)
        close()
    }

    function handleChange({ target }) {
        const { type, name } = target
        let value = target.value

        setMail(prevMail => ({ ...prevMail, [name]: value }))
    }

    return <form className="mail-compose" onSubmit={onSave}>
        <h2>Nev Message</h2>
        <input className="to" onChange={handleChange} name="to" type="email" />
        <input className="subject" onChange={handleChange} name="subject" type="text" />
        <input className="body" onChange={handleChange} name="body" type="text" />
        <article><button className="send">Send</button></article>
    </form>

}