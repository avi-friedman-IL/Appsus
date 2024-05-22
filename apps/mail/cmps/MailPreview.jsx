export function MailPreview({ mail }) {

    let className = mail.isRead ? 'read' : ''

    return (
        <section className={`mail-preview ${className}`}>
            <h2>{mail.from}</h2>
            <p><span>{mail.subject} - </span>{mail.body.substring(0, 40)}</p>
        </section>
    )
}