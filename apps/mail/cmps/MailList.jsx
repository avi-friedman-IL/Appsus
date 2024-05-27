const { useState } = React
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js";
import { utilService } from "../../../services/util.service.js";
import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemove }) {


    const [isStarred, setIsStarred] = useState(false)

    function onToggleIsStarred(mailId) {
        const mail = mails.find(mail => mail.id === mailId)
        mail.isStarred = !mail.isStarred
        mailService.save(mail)
        setIsStarred(isStarred => !isStarred)
    }

    return <ul className="mail-list">
        {mails.map(mail =>
            <li className={mail.isRead ? 'read' : ''} key={mail.id}>
                <p className={mail.isStarred ? 'starred on' : 'starred'} onClick={() => onToggleIsStarred(mail.id)}>&#9733;</p>

                <Link to={`/mail/${mail.id}`}>
                    {<MailPreview mail={mail} />}
                </Link>
                <div className="mail-list-actions">
                    <button className="fa fa-remove-mail remove-mail" onClick={() => onRemove(mail.id)}></button>
                </div>

                <p className="sent-at">
                    {`${utilService.getMonthName(new Date(mail.sentAt)).substring(0, 3)} 
                    ${new Date(mail.sentAt).getDate()} ${new Date(mail.sentAt).getFullYear()}`}
                </p>

            </li>
        )}
    </ul>

}
