const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM


import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))


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

    return <section className="mail-index">
        {<MailFilter filterBy={filterBy} onFilter={onSetFilterBy} />}
        <div className="folder-and-list">
            {<MailFolderList />}
            {<MailList mails={mails} onRemove={removeMail} />}
        </div>
    </section>
}

