import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter


export function MailCompose({ close, mailId }) {

    const [mail, setMail] = useState()
    const [isComposeOpen, setIsComposeOpen] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        var intervalId = null
        if (mailId) {
            mailService.get(mailId)
                .then(mail => {
                    setMail(mail)
                })
            } else {
                setMail(mailService.getEmptyMail)
                console.log(mail);
        }
        return () => clearInterval(intervalId)

    }, [])

    function onSave(ev) {
        ev.preventDefault()
        mail.isDraft = false
        mailService.save(mail)
        setIsComposeOpen(false)
        close()
        showSuccessMsg('Message sent')
    }

    function removeMail() {
        if (mailId) mailService.remove(mailId)
        setIsComposeOpen(false)
        if (!mailId) close()
    }

    function onSaveToDraft() {
        mail.isDraft = true
        mailService.save(mail)
        setIsComposeOpen(false)
        close()
        showSuccessMsg('Saved as a draft')
    }

    function onSaveAuto() {
        mail.isDraft = true
        mailService.save(mail)
    }

    function handleChange({ target }) {
        const { name } = target
        let value = target.value

        setMail(prevMail => ({ ...prevMail, [name]: value }))
    }

    if (!mail) return
    if (isComposeOpen) return <form className="mail-compose" onSubmit={onSave}>
        <h2>New Messages <span></span> <span onClick={onSaveToDraft}>x</span></h2>
        <input className="to" onChange={handleChange} name="to" type="email" value={mail.to} placeholder="To" />
        <input className="subject" onChange={handleChange} name="subject" type="text" placeholder="Subject" />
        <textarea id="mail-compose-body" row="3" cols="3" className="mail-body" onChange={handleChange} name="body" type="text" value={mail.body} />
        <article>
            <button className="send">Send</button>
            <button className="fa fa-remove-mail remove-mail" onClick={removeMail}></button>
        </article>
    </form>

}