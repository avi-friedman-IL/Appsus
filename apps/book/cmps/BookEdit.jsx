const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;
import { bookService } from "../../../apps/book/services/book.service.js";

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(null);
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookId) return;
    bookService
      .getBookById(bookId)
      .then((book) => {
        const bookToEdit = {
          id: book.id,
          title: book.title,
          subtitle: book.subtitle,
          authors: book.authors,
          publishedDate: book.publishedDate,
          description: book.description,
          pageCount: book.pageCount,
          categories: book.categories,
          thumbnail: book.thumbnail,
          language: book.language,
          listPrice: {
            amount: book.listPrice.amount,
            currencyCode: book.listPrice.currencyCode,
            isOnSale: book.listPrice.isOnSale,
          },
          reviews: [],
        };
        setBookToEdit(bookToEdit);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
      });
  }, [bookId]);

  function onSaveBook(ev) {
    ev.preventDefault();

    const bookToSave = {
      ...bookToEdit,
      listPrice: {
        ...bookToEdit.listPrice,
      },
    };

    bookService
      .saveBook(bookToSave)
      .then(() => {
        onGoBack();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    const fieldNames = name.split(".");
    if (fieldNames.length === 2 && fieldNames[0] === "listPrice") {
      const fieldName = fieldNames[1];
      setBookToEdit((prevBook) => ({
        ...prevBook,
        listPrice: {
          ...prevBook.listPrice,
          [fieldName]: value,
        },
      }));
      console.log(bookToEdit);
    } else {
      setBookToEdit((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
      console.log(bookToEdit);
    }
  }

  function onGoBack() {
    navigate("/book");
  }

  return (
    <section className="book-edit">
      <h2 className="edit-book-header">Edit Book</h2>

      <form onSubmit={onSaveBook}>
        <label>Title: </label>
        <input
          type="text"
          placeholder="Enter New Title"
          name="title"
          onChange={handleChange}
        />
        <br></br>

        <label>Price(Amount): </label>
        <input
          type="number"
          placeholder="Set Amount"
          name="listPrice.amount"
          onChange={handleChange}
        />

        <div className="book-edit-actions-container">
          <button className="save-edit-btn" type="submit">
            Save ✔
          </button>
          <button className="cancel-edit-btn" onClick={onGoBack}>
            Go Back ✖
          </button>
        </div>
      </form>
    </section>
  );
}
