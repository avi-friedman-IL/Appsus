const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams } = ReactRouter

import { UserMsg } from '../../../cmps/UserMsg.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'
import { MailCompose } from './MailCompose.jsx'
import { MailDetails } from './MailDetails.jsx'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [isCompose, setIsCompose] = useState(false)
    const [unreadMails, setUnreadMails] = useState([])
    const [toggleIsRead, setToggleIsRead] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const params = useParams()

    function removeMail(mailId) {
        mailService.remove(mailId).then(() => {
            setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
        })
    }

    useEffect(() => {
        mailService.query().then(mails => {
            setToggleIsRead(false)
            setMails(mails)
        })
    }, [toggleIsRead])

    useEffect(() => {
        mailService.query().then(mails => {
            const mailsNotRead = mails.filter(mail => !mail.isRead && !mail.isDraft)
            setUnreadMails(mailsNotRead)
        })
    }, [unreadMails])

    useEffect(() => {
        setSearchParams(filterBy)
        mailService.query(filterBy).then(mails => setMails(mails))
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function toggleRead(mailId) {
        mailService.query().then(mails => {
            const mail = mails.find(mail => mail.id === mailId)
            mail.isRead = !mail.isRead
            mailService.save(mail)
            setMails(mails => [...mails])
            setToggleIsRead(read => !read)
        })
    }

    function onCompose() {
        setIsCompose(compose => !compose)
    }

    function onToggleMenuOpen() {
        setIsMenuOpen(open => !open)
    }
    return (
        <section className={isMenuOpen ? 'mail-index open' : 'mail-index'}>
            <section className="mail-menu-btns">
                <button className="menu-btn" onClick={onToggleMenuOpen}>
                    ☰
                </button>
                <button className="fa fa-mail-menu-btn" onMouseEnter={() => setIsMenuOpen(true)}>
                    <span className="mail-unread">{unreadMails.length}</span>
                </button>
            </section>
            <div className="gmail-img-and-txt">
                <img className="gmail-img" src="https://www.svgrepo.com/show/349378/gmail.svg" alt="mail" title="mail" />
                Gmail
            </div>
            
            <button className={isMenuOpen ? 'compose-btn open' : 'compose-btn'} onClick={onCompose}>
                <span className="fa fa-compose-btn-mail"></span>
                Compose
            </button>

            {isCompose && <MailCompose close={onCompose} mailId={false} />}

            {<MailFilter filterBy={filterBy} onFilter={onSetFilterBy} />}

            {<MailFolderList filterBy={filterBy} onFilter={onSetFilterBy} isOpen={isMenuOpen} close={onToggleMenuOpen} />}

            {!params.mailId && <MailList mails={mails} onRemove={removeMail} onToggleRead={toggleRead} close={onCompose} />}

            {params.mailId && <MailDetails close={onCompose} />}

            {<UserMsg />}
        </section>
    )
}
