export function MailPreview({ mail }) {

    let className = mail.isRead ? 'read' : ''

    return (
        <section>


            <h2>{mail.from}</h2>
            <p><span>{mail.subject} - </span>{mail.body.substring(0, 80)}</p>
        </section>
    )
}