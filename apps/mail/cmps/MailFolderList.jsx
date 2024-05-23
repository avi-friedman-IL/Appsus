const { useState, useEffect } = React

export function MailFolderList({ filterBy, onFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [folderSelect, setFolderSelect] = useState(filterByToEdit.status)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleClick({ target }) {
        const { value } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, ['status']: value }))
        setFolderSelect(value)
    }

    return <section className="mail-folder-list">
        <article className={folderSelect === 'Index' ? 'select' : ''}>
            <p className="fa fa-index-mail"></p>
            <option onClick={handleClick} value="Index">index</option>
        </article>
        {/* <option className={folderSelect === 'Starred' ? 'select' : ''} onClick={handleClick} value="Starred">Starred</option> */}

        <article className={folderSelect === 'Sent' ? 'select' : ''}>
            <p className="fa fa-sent-mail"></p>
            <option onClick={handleClick} value="Sent">Sent</option>
        </article>
        {/* <option className={folderSelect === 'Draft' ? 'select' : ''} onClick={handleClick} value="Draft">Draft</option> */}
    </section>
}