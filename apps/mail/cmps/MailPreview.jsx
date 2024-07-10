export function MailPreview({ mail }) {
    return (
        <section className="mail-preview" onClick={() => mail.isRead = true}>
            <h2>{mail.from === 'momo@momo.com' ? 'Me' : 'User'}</h2>
            <p>
                <span>{mail.subject ? mail.subject : '(No Subject)'} - </span>
                {mail.body}
            </p>
        </section>
    )
}
