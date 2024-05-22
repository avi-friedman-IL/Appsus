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

    return <section className="mail-filter">
        <input onChange={handleChange} value={filterByToEdit.txt} name="txt" type="text" placeholder="Search in mail" />
    </section>
}