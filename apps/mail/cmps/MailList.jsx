const { Link } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemove }) {
    return <ul className="mail-list">
        {mails.map(mail =>
            <li className={mail.isRead ? 'read' : ''} key={mail.id}><Link to={`/mail/${mail.id}`}>
                {<MailPreview mail={mail} />}
            </Link>
                <button className="fa fa-remove-mail remove-mail" onClick={() => onRemove(mail.id)}></button>
            </li>
        )}
    </ul>
}
