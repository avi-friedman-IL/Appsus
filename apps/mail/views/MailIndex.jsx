const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams } = ReactRouter



import { UserMsg } from "../../../cmps/UserMsg.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { MailCompose } from "./MailCompose.jsx"
import { MailDetails } from "./MailDetails.jsx"

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [isCompose, setIsCompose] = useState(false)
    const [isUnread, setIsUnread] = useState()
    const [toggleIsRead, setToggleIsRead] = useState(false)

    const params = useParams()

    function removeMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
            })
    }
    
    useEffect(() => {
        mailService.query()
            .then(mails => setMails(mails))
    }, [params.mailId])

    useEffect(() => {
        mailService.query()
            .then(mails => {
                setToggleIsRead(false)
                setMails(mails)
            })
    }, [toggleIsRead])

    useEffect(() => {
        mailService.query()
            .then(mails => {
                const isUnread = mails.filter(mail => !mail.isRead)
                const countIsUnread = isUnread.length
                setIsUnread(countIsUnread)
            })
    }, [isUnread])

    useEffect(() => {
        setSearchParams(filterBy)
        mailService.query(filterBy)
            .then(mails => setMails(mails))
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function onCompose() {
        setIsCompose(isCompose => !isCompose)
    }

    function toggleRead(mailId) {
        mailService.query()
            .then(mails => {
                const mail = mails.find(mail => mail.id === mailId)
                mail.isRead = !mail.isRead
                mailService.save(mail)
                setMails(mails => [...mails])
                setToggleIsRead(read => !read)
            })
    }

    return <section className="mail-index">
        <button className="compose-btn" onClick={onCompose}><span className="fa fa-compose-btn-mail"></span>Compose</button>
        {isCompose && <MailCompose close={onCompose} />}
        {<MailFilter filterBy={filterBy} onFilter={onSetFilterBy} />}
        {<MailFolderList filterBy={filterBy} onFilter={onSetFilterBy} unread={isUnread} />}
        {!params.mailId && <MailList mails={mails} onRemove={removeMail} onToggleRead={toggleRead} />}
        {params.mailId && <MailDetails />}
        {<UserMsg />}

    </section>
}

