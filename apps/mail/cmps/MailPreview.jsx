export function MailPreview({ mail }) {

    let className = mail.isRead ? 'read' : ''

    return (
        <section>
            <h2>{mail.from === 'momo@momo.com' ? 'My' : 'User'}</h2>
            <p><span>{mail.subject} </span>{mail.body.substring(0, 50)}</p>
        </section>
    )
}