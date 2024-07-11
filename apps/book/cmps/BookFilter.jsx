const { useState, useEffect } = React

export function BookFilter({ filterBy, onFilter }) {
    
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return <section className="book-filter">
        <h3>Filter</h3>
        <input onChange={handleChange} value={filterByToEdit.txt} name="txt" type="text" placeholder="title" />
        <input onChange={handleChange} value={filterByToEdit.minPrice} name="minPrice" type="number" placeholder="price" />
    </section>
}