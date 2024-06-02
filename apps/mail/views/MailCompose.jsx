import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter


export function MailCompose({ close, mailId }) {

    const [mail, setMail] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (mailId) {
            mailService.get(mailId)
                .then(mail => setMail(mail))
        } else {
            setMail(mailService.getEmptyMail)
        }
    }, [])

    function onSave(ev) {
        ev.preventDefault()
        mail.isDraft = false
        console.dir(ev.target);
        if (ev.target.innerText === 'x') mail.isDraft = true
        mailService.save(mail)
        showSuccessMsg('Message sent')
        close()
        navigate('/mail')
    }

    function removeMail() {
        close()
    }

    function handleChange({ target }) {
        const { type, name } = target
        let value = target.value 

        setMail(prevMail => ({ ...prevMail, [name]: value }))
    }

    if(!mail) return
    return <form className="mail-compose" onSubmit={onSave}>
        <h2>New Messages <span onClick={onSave}>x</span></h2>
        <input className="to" onChange={handleChange} name="to" type="email" value={mail.to} placeholder="To" />
        <input className="subject" onChange={handleChange} name="subject" type="text" placeholder="Subject" />
        <textarea id="mail-compose-body" row="3" cols="3" className="mail-body" onChange={handleChange} name="body" type="text" value={mail.body} />
        <article>
            <button className="send">Send</button>
            <button className="fa fa-remove-mail remove-mail" onClick={removeMail}></button>
        </article>
    </form>

}