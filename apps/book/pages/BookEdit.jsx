const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter


import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { UserMsg } from "../cmps/UserMsg.jsx"
import { bookService } from "../services/book.service.js"

export function BookEdit() {

    const [book, setBook] = useState(bookService.getEmptyBook)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.bookId) return

        bookService.get(params.bookId)
            .then(setBook)
    }, [])

    function onSave(ev) {
        ev.preventDefault()

        bookService.save(book)
            .then(() => {
                navigate('/book')
                showSuccessMsg(params.bookId ? 'Done successfully!' : 'Added successfully!')
            })
            .catch(() => {
                navigate('/book')
                showErrorMsg('not success!')
            })

    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
        }

        setBook(prevBook => ({ ...prevBook, [prop]: value }))
    }

    function handleChangeListPrice({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
        }

        setBook(prevBook => ({ ...prevBook, listPrice: { ...prevBook.listPrice, [prop]: value } }))
    }

    return <div>
        
        <UserMsg />
        <section className="book-edit">
            <form onSubmit={onSave}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={book.title}
                    id="title" name="title" type="text" />

                <label htmlFor="categories">categories</label>
                <input onChange={handleChange} value={book.categories}
                    id="categories" name="categories" type="text" />

                <label htmlFor="listPrice">amount</label>
                <input onChange={handleChangeListPrice} value={book.listPrice.amount}
                    id="listPrice" name="amount" type="number" />

                <button>save</button>
            </form>
        </section>
        {/* <img src={goggleBooks.data.volumeInfo.imageLinks.small.smallThumbnail} alt="" /> */}
    </div>
}