const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM


import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { MailCompose } from "./MailCompose.jsx"

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [isCompose, setIsCompose] = useState(false)


    function removeMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
            })
    }

    useEffect(() => {
        setSearchParams(filterBy)
        mailService.query(filterBy)
            .then(mails => setMails(mails))
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function onCompose() {
        setIsCompose(true)
    }

    return <section className="mail-index">
      <button className="compose-btn" onClick={onCompose}><span className="fa fa-compose-btn-mail"></span>Compose</button>
      {isCompose && <MailCompose />}
        {<MailFilter filterBy={filterBy} onFilter={onSetFilterBy} />}
        
        {/* <section className="mail-folder-list">
            <h2 className={folderSelect === 'Index' ? 'select' : ''} onClick={onSelectFolder}>Index</h2>
            <h2 className={folderSelect === 'Starred' ? 'select' : ''} onClick={onSelectFolder}>Starred</h2>
            <h2 className={folderSelect === 'Sent' ? 'select' : ''} onClick={onSelectFolder}>Sent</h2>
            <h2 className={folderSelect === 'Draft' ? 'select' : ''} onClick={onSelectFolder}>Draft</h2>
        </section> */}

        {<MailFolderList filterBy={filterBy} onFilter={onSetFilterBy} />}
        {<MailList mails={mails} onRemove={removeMail} />}

    </section>
}

