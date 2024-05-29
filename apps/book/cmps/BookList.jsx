const { Link } = ReactRouterDOM;

import { BookPreview } from "../../../apps/book/cmps/BookPreview.jsx";

export function BookList({ books, onRemoveBook }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-card">
          <BookPreview book={book} />
          <button onClick={() => onRemoveBook(book.id)}>Remove</button>
          <Link to={`/book/${book.id}`}>
            <button> Details</button>
          </Link>
          <Link to={`/book/edit/${book.id}`}>
            <button> Edit</button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
