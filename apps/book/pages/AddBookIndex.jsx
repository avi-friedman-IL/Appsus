const { useState, useEffect } = React

import { AddBookList } from "../cmps/AddBookList.jsx"
import { bookService } from "../services/book.service.js"

export function AddBook() {


    const [data, setData] = useState([])
    const [val, setVal] = useState('')
    const [ctg, setCtg] = useState(null)

    useEffect(() => {
        if (!val) return
        bookService.demoData()
            .then(data => {
                console.log(data)
                setData(data)
                setCtg(data.find(itm => itm.categories.includes(val)))
            })

    }, [val])

    function handleChange({ target }) {
        setVal(target.value)
        console.log(val)
    }

    return <div className="add-book">
        <input type="search" onChange={handleChange} value={val} placeholder="search book" />
        {ctg && <section>
            <AddBookList ctg={ctg} />
        </section>}
    </div>
}