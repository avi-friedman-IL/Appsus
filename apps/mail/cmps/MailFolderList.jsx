import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter


export function MailFolderList({ filterBy, onFilter, isOpen, close }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [folderSelect, setFolderSelect] = useState(filterByToEdit.status)
    const [mails, setMails] = useState([])
    const [isHovered,setIsHovered]= useState()

    const navigate = useNavigate()

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    useEffect(() => {
        mailService.query().then(mails => {
            const mailsNotRead = mails.filter(mail => !mail.isRead && !mail.isDraft)
            setMails(mailsNotRead)
        })
    }, [mails])

    function handleClick({ target }) {
        const { value } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, ['status']: value }))
        setFolderSelect(value)
        console.log(window.innerWidth)
        if (window.innerWidth < 750) close()
        if (value === 'Index') navigate('/mail')
    }

    return <section className={isOpen ? 'mail-folder-list open' : 'mail-folder-list'}>
        <article className={folderSelect === 'Index' ? 'select' : ''}>
            <p className="fa fa-index-mail"></p>
            <option onClick={handleClick} value="Index">index</option>
            <span>{mails.length}</span>
        </article>

        <article className={folderSelect === 'Starred' ? 'select' : ''}>
            <p>&#9733;</p>
            <option onClick={handleClick} value="Starred">Starred</option>
        </article>

        <article className={folderSelect === 'Sent' ? 'select' : ''}>
            <p className="fa fa-sent-mail"></p>
            <option onClick={handleClick} value="Sent">Sent</option>
        </article>

        <article className={folderSelect === 'Draft' ? 'select' : ''}>
            <p className="fa fa-draft-mail"></p>
            <option onClick={handleClick} value="Draft">Draft</option>
        </article>
    </section>
}