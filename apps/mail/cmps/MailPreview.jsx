export function MailPreview({ mail }) {
    return (
        <section className="mail-preview">
            <h2>{mail.from === 'momo@momo.com' ? 'Me' : 'User'}</h2>
            <p><span>{mail.subject} </span>{mail.body.length > 50 ? `${mail.body.substring(0, 50)}...` : mail.body}</p>            
        </section>
    )
}
