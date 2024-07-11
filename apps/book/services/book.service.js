import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
const GOGGLE_KEY = 'goggleDB'
let keth = utilService.loadFromStorage(GOGGLE_KEY) || {}
_createBooks()


export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getPriceStats,
    saveReview,
    removeReview,
    demoData,
    getFilterFromSearchParams,
    goggleData
}
window.bs = bookService

function goggleData(search) {
    let books //= utilService.loadFromStorage(`${search}DBG`)
    let url = `../lib/api-goggle-books.customization`

    return books = axios.get(url)
        .then(res => {
            utilService.saveToStorage(`${search}DBG`, res.data.items)
            res.data.items.map(book => {
                const { data } = book
                const { volumeInfo } = data
                const { imageLinks } = volumeInfo
                const { smallThumbnail } = imageLinks
              
            })
        })
}

function demoData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { categories: 'dogs', books: [{ title: 'dogi' }, { title: 'dogili' }] },
                { categories: 'mans', books: [{ title: 'first man' }, { title: 'lest man' }] }
            ])
        }, 500)
    })
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', categories = '', listPrice = { amount: '' }, reviews = [], thumbnail = `BooksImages/${utilService.getRandomIntInclusive(0, 20)}.jpg`) {
    return { title, categories, listPrice, reviews, thumbnail }
}

function getDefaultFilter(filterBy = { txt: '', minPrice: 0 }) {
    return { txt: filterBy.txt, minPrice: filterBy.minPrice }
}

function getFilterFromSearchParams(searchParams) {
    return {
        txt: searchParams.get('txt') || '',
        minPrice: +searchParams.get('minPrice') || '',
    }
}

function getPriceStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByPriceMap = _getBookCountByPriceMap(books)
            const data = Object.keys(bookCountByPriceMap).map(priceName => ({ ctg: priceName, value: bookCountByPriceMap[priceName] }))
            return data
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        const currencyCodes = ['USD', 'EUR', 'GBP', 'JPY', 'ILS', 'AUD', 'CAD', 'CNY']
        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(100),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `BooksImages/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(20, 500),
                    currencyCode: utilService.getCurrencySymbol(currencyCodes[utilService.getRandomIntInclusive(0, currencyCodes.length - 1)]),
                    isOnSale: Math.random() > 0.7
                },
                reviews: []
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
    console.log(books)

    return books
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function _getBookCountByPriceMap(books) {
    const bookCountByPriceMap = books.reduce((map, book) => {
        if (book.maxPrice < 120) map.cheap++
        else if (car.maxPrice < 200) map.normal++
        else map.expensive++
        return map
    }, { cheap: 0, normal: 0, expensive: 0 })

    return bookCountByPriceMap
}

function saveReview(bookId, review) {
    get(bookId).then(book => {
        book.reviews.push(review)
        save(book)
    })
}

function removeReview(reviewId, bookId) {
    get(bookId).then(book => {
        let newReview = book.reviews.filter(review => review.id !== reviewId)
        book.reviews = newReview
        save(book)
    })
    return Promise.resolve()
}
