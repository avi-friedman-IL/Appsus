const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { AddBookPreview } from "./AddBookPreview.jsx";
import { utilService } from "../services/util.service.js";
import { bookService } from "../services/book.service.js";

export function AddBookList({ ctg }) {

    function onSave() {
        bookService.get
        // bookService.save(book)
    }

    return <ul className="add-book-list">
        {ctg.books.map(book =>
            <li key={utilService.makeId()}>
                {book.title}
                <AddBookPreview book={book} />
                {/* <Link to={'/book'}><button >+</button></Link> */}
            </li>
        )}
    </ul>
}