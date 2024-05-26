const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const [mail, setMail] = useState([])

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        mailService.get(params.mailId)
            .then(mail => {
                mail.isRead = true
                setMail(mail)
                mailService.save(mail)
            })
    }, [params.mailId])

    return <section className="mail-details">
        <section className="actions">
            <Link to="/mail"><button className="fa fa-back action"></button></Link>
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
            <p className="date">{mail.sentAt}</p>
        </div>
        <p className="body">{mail.body}</p>
    </section>
}