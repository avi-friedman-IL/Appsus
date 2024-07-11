const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

import { LongText } from '../cmps/LongText.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { bookService } from '../services/book.service.js'

export function BookDetails() {
    const [book, setBook] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isShowReview, setIsShowReview] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        bookService
            .get(params.bookId)
            .then(book => {
                setBook(book)
            })
            .catch(() => {
                alert('The requested book was not found. You are returned to the previous page...')
                navigate('/book')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [params.bookId])

    function getReadingLevel() {
        let readingLevel
        if (book.pageCount > 500) readingLevel = 'Serious Reading'
        else if (book.pageCount < 100) readingLevel = 'Light Reading'
        else readingLevel = 'Descent Reading'
        return readingLevel
    }

    function getClassName() {
        const year = new Date().getFullYear()
        if (year - book.publishedDate <= 1) return 'new'
        if (year - book.publishedDate > 10) return 'vintage'
    }

    function onToggleShowReview() {
        bookService.get(params.bookId).then(book => {
            setBook(book)
        })
        setIsShowReview(show => !show)
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(reviewId, params.bookId).then(() => {
            const filteredReviews = book.reviews.filter(review => review.id !== reviewId)
            setBook({ ...book, reviews: filteredReviews })
        })
    }

    if (isLoading) return <h3>Loading...</h3>
    return (
        <div className="book-details full">
            <section className="actions">
                <Link to={`/book/${book.prevBookId}`}>
                    <button className="fa fa-prev action"></button>
                </Link>
                <Link to={`/book/${book.nextBookId}`}>
                    <button className="fa fa-next action"></button>
                </Link>
                <Link to="/book">
                    <button className="fa fa-close action"></button>
                </Link>
            </section>
            <article>
                <img src={book.thumbnail} alt="" />

                <div>
                    <p className={getClassName()}>{getClassName()}</p>
                    <h1>{book.title || ''}</h1>
                    <h5>{book.subtitle || ''}</h5>

                    <section className="review-buttons">
                        <Link to={`/book/${book.id}/review`}>
                            <button>Add review</button>
                        </Link>
                        <button onClick={onToggleShowReview}>{isShowReview ? 'Hide reviews' : 'Show reviews'}</button>
                    </section>

                    <p>
                        {getReadingLevel()},{`(${book.pageCount || ''} pages)`}
                    </p>
                    <p>
                        {book.listPrice.amount}
                        <span>{book.listPrice.currencyCode || ''}</span>
                    </p>
                    <p style={{ color: 'red' }}>{book.listPrice.isOnSale ? 'On Sale!' : ''}</p>
                    <p>{book.publishedDate || ''}</p>
                    {book.description && <LongText txt={book.description} />}
                </div>
            </article>

            {isShowReview && <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />}
        </div>
    )
}
