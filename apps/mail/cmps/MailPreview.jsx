const { useState } = React

export function MailPreview({ mail }) {

    const [isStarred, setIsStarred] = useState(false)

    function onToggleIsStarred() {
        setIsStarred(isStarred => !isStarred)
    }

    return (
        <section className="mail-preview">
            <p className={mail.isStarred ? 'starred on' : 'starred'} onClick={onToggleIsStarred}>&#9733;</p>
            <h2>{mail.from === 'momo@momo.com' ? 'Me' : 'User'}</h2>
            <p><span>{mail.subject} </span>{mail.body.length > 50 ? `${mail.body.substring(0, 50)}...` : mail.body}</p>
        </section>
    )
}
