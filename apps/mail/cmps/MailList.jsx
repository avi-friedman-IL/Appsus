const { Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js";
import { MailPreview } from "./MailPreview.jsx";
import { MailStarred } from "./MailStarred.jsx";

export function MailList({ mails, onRemove }) {
    return <ul className="mail-list">
        {mails.map(mail =>
            <li className={mail.isRead ? 'read' : ''} key={mail.id}>
                {<MailStarred mail={mail} />}
                
                <Link to={`/mail/${mail.id}`}>{<MailPreview mail={mail} />}</Link>
                
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
