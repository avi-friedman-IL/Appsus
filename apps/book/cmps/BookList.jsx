const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemove }) {
    return <section className="book-list">
        <ul>
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <button className="remove" onClick={() => onRemove(book.id)}>x</button>
                    <div>
                        <Link to={`/book/${book.id}`}><button className="fa fa-details details"></button></Link>
                        <Link to={`/book/edit/${book.id}`}><button className="fa fa-edit edit"></button></Link>
                    </div>
                </li>
            )}
        </ul>
    </section>
}