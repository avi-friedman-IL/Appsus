import { MailCompose } from "../views/MailCompose.jsx"

const { useState } = React
const { Link } = ReactRouterDOM

export function MailPreview({ mail, close }) {

    
    return (
        <div className="starred-and-li">
            <section className="mail-preview">
                <h2>{mail.from === 'momo@momo.com' ? 'Me' : 'User'}</h2>
                <p><span>{mail.subject} </span>{mail.body.length > 30 ? `${mail.body.substring(0, 30)}...` : mail.body}</p>
            </section>
             
        </div>
    )
}
