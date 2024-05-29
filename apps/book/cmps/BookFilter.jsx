const { useState, useEffect } = React

export function BookFilter({ onSetFilter, filterBy }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)
    
    useEffect(() => {
        onSetFilter({...filterByToEdit})
    }, [filterByToEdit])
    
    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return <section className="book-filter">
        <hr></hr>
        <h3>Filter</h3>

        <label htmlFor="by-title">By Title: </label>
        <input onChange={handleChange} value={filterByToEdit.title} name="title" type="text" placeholder="title"/>
        <br></br>

        <label htmlFor="by-price"> By Minimum Price: </label>
        <input onChange={handleChange} value={filterByToEdit.minPrice} name="minPrice" type="number" placeholder="amount"/>
        <br></br>
       
        <label htmlFor="by-price"> By Maximum Price: </label>
        <input onChange={handleChange} value={filterByToEdit.maxPrice} name="maxPrice" type="number" placeholder="amount"/>
        <hr></hr>

    </section>
}