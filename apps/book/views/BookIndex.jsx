const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;

import { bookService } from "../../../apps/book/services/book.service.js";

import { BookFilter } from "../../../apps/book/cmps/BookFilter.jsx";
import { BookList } from "../../../apps/book/cmps/BookList.jsx";
import { UserMsg } from "../../../cmps/UserMsg.jsx";

export function BookIndex() {
  const [books, setBooks] = useState([]);
  const [filterBy, setFilterBy] = useState(bookService.getFilterBy());
  const [bookRemoved, setBookRemoved] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  useEffect(() => {
    if (bookRemoved) {
      setMsg("Book removed successfully.");
      setTimeout(() => setBookRemoved(false), 3000);
    }
  }, [bookRemoved]);

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => {
        console.error("Error loading books:", err);
      });
  }

  function setFilter(filterBy) {
    setFilterBy(filterBy);
  }

  function removeBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        setBookRemoved(true);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }

  if (!books) return <div>Loading...</div>;

  return (
    <section>
      {bookRemoved && <UserMsg />}
      <BookFilter filterBy={filterBy} onSetFilter={setFilter} />
      <Link to="/book/add">
        <button>Add Book</button>
      </Link>
      <h2>Books List</h2>
      {books.length && <BookList books={books} onRemoveBook={removeBook} />}
      {!books.length && <div> No Books found...</div>}
    </section>
  );
}
