const { Link } = ReactRouterDOM
const { useNavigate, useParams } = ReactRouterDOM

import { storageService } from '../services/async-storage.service.js'
import { utilService } from '../services/util.service.js'
import { bookService } from '../services/book.service.js'
import { BookPreview } from "./BookPreview.jsx"


export function BookList({ books, onRemoveBook }) {
    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id} className="book-card">
                <BookPreview book={book} />
                <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                <Link to={`/book/${book.id}`}><button> Details</button></Link>
                <Link to={`/book/edit/${book.id}`}><button> Edit</button></Link>
            </li>
            )}
        </ul>
    )
}