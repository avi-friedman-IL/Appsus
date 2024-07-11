const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { bookService } from "../services/book.service.js";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function BookIndex() {

    const [books, setBooks] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg(`Book (${bookId}) removed successfully!`)
            })
    }

    useEffect(() => {
        setSearchParams(filterBy)
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy({...newFilter})
    }

    return <section className="book-index">
        <BookFilter filterBy={filterBy} onFilter={onSetFilterBy} />
        <div>
            {/* <Link to="/book/add"><button className="add-book">Add a book from goggle</button></Link> */}
            <Link to="/book/edit"><button className="add-book">Add a book</button></Link>
        </div>
        <BookList books={books} onRemove={removeBook} />
    </section>
}