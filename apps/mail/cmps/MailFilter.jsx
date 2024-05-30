const { useState, useEffect } = React

export function MailFilter({ filterBy, onFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        const { name, type } = target
        const value = target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return <div className="mail-filter-and-sorting">
        <section className="mail-filter">
            <span className="fa fa-search-mail"></span>
            <input onChange={handleChange} value={filterByToEdit.txt} name="txt" type="text" placeholder="Search in mail" />
            <select className="filter-by-read" onChange={handleChange} name="read" id="">
                <option value="all">all</option>
                <option value="unread">unread</option>
                <option value="read">read</option>
            </select>

        </section>
        <select className="sort-by" onChange={handleChange} name="sortBy" id="">
            <option value="date">sort by date</option>
            <option value="subject">sort by subject</option>
        </select>
        </div>
}