const { useState } = React

import { mailService } from "../services/mail.service.js"

export function MailStarred({ mail }) {

    const [isStarred, setIsStarred] = useState(false)

    function onToggleIsStarred(ev) {
        ev.preventDefault()
        mail.isStarred = !mail.isStarred
        mailService.save(mail)
        setIsStarred(isStarred => !isStarred)
    }

    return <p className={mail.isStarred ? 'starred on' : 'starred'}
        onClick={onToggleIsStarred}>&#9733;
    </p>

}