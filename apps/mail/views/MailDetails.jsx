const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

import {mailService} from '../services/mail.service.js'

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
    },[params.mailId])
    
    return <section className="mail-details">
        <section className="actions">
            <Link to={`/mail/${mail.nextMailId}`}><button className="fa fa-next action">prev</button></Link>
            <Link to={`/mail/${mail.prevMailId}`}><button className="fa fa-prev action">next</button></Link>
            <Link to="/mail"><button className="fa fa-close action">back</button></Link>
        </section>
        
        <h1>{mail.subject}</h1>
        <h2>from: {mail.from}</h2>
        <h2>to: {mail.to}</h2>
        <p>{mail.body}</p>
    </section>
}