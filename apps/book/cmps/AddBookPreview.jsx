const { useParams, useNavigate } = ReactRouter

import { bookService } from "../services/book.service.js"

export function AddBookPreview({ book }) {

    const navigate = useNavigate()

    function save() {
        bookService.save(book)
            .then(() => navigate('/book'))

    }
    return <button onClick={save}>+</button>
}