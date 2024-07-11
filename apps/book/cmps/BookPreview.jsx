export function BookPreview({ book }) {
    function getColor() {
        if (!book.listPrice) return 'black'
        if (book.listPrice.amount > 300) return 'red'
        if (book.listPrice.amount < 150) return 'green'
    }

    function getClassName() {
        const year = new Date().getFullYear()
        if (!book.publishedDate) return ''
        if (year - book.publishedDate <= 1) return 'new'
        if (year - book.publishedDate > 10) return 'vintage'
    }

    const { listPrice } = book

    return <article className="book-preview">
        <p className={getClassName()}>{getClassName()}</p>
        <h3>{book.title.substring(0, 10)}</h3>
        <img className="book-img" src={book.thumbnail} alt="" />
        <p style={{ color: getColor() }}>{listPrice && listPrice.amount}<span>{listPrice && listPrice.currencyCode}</span></p>
    </article>
}