const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

import { notesService } from '../../note/services/note.service.js'
import { mailService } from '../services/mail.service.js'
import { MailCompose } from './MailCompose.jsx'

export function MailDetails({ close }) {
    const [mail, setMail] = useState([])
    const [isDraft, setIsDraft] = useState()

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        mailService.get(params.mailId)
            .then(mail => {
                if (mail.isDraft) setIsDraft(true)
                mail.isRead = true
                mailService.save(mail)
                setMail(mail)
            })
    }, [params.mailId])

    function onSaveMailToNotes() {
        const newNote = {

            createAt: Date.now(),
            type: 'NoteTxt',
            isPinned: false,
            style: { backgroundColor: "#F1948A", font: '' },
            info: {
                title: mail.subject, todos: [], txt: mail.body, url: { image: null, video: null }
            }
        }
        notesService.saveNote(newNote)
        navigate('/note')
    }

    if (isDraft) return <MailCompose close={close} mailId={params.mailId} />

    if (!isDraft) return <section className="mail-details">
        <section className="actions">
            <Link to="/mail"><button className="fa fa-back action"></button></Link>
            <button onClick={onSaveMailToNotes} className="save-mail-to-note action">save to keep</button>
            <div>
                <Link to={`/mail/${mail.prevMailId}`}><button className="fa fa-prev action"></button></Link>
                <Link to={`/mail/${mail.nextMailId}`}><button className="fa fa-next action"></button></Link>
            </div>
        </section>

        <h1 className="subject">{mail.subject}</h1>
        <div className="sub-title">
            <div className="">
                <p className="from">{mail.from}</p>
                <p className="to">to {mail.to}</p>
            </div>
            <p className="date">{
                new Date(mail.sentAt).toString().split(' ').slice(0, 5).join(' ')
            }</p>
        </div>
        <p className="body">{mail.body}</p>
    </section>
}