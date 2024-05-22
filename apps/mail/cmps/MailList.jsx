import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemove }) {
    return <ul className="mail-list">
        {mails.map(mail =>
            <li key={mail.id}>
                {<MailPreview mail={mail} />}
                <button className="fa fa-remove-mail remove-mail" onClick={() => onRemove(mail.id)}></button>
            </li>
        )}
    </ul>
}
