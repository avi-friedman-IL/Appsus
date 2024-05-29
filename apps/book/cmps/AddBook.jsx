const { useState, useEffect } = React;
const { useNavigate } = ReactRouterDOM;

import { storageService } from "../services/async-storage.service.js";
import { utilService } from "../services/util.service.js";
import { UserMsg } from "../cmps/UserMsg.jsx";

export function AddBook() {
  const [bookAdd, setBookAdd] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const [book, setBook] = useState({
    id: utilService.makeId(11),
    title: "title",
    subtitle: utilService.makeLorem(10),
    authors: ["Martin Toy"],
    publishedDate: 1999,
    description: utilService.makeLorem(10),
    pageCount: 100,
    categories: ["all"],
    thumbnail: "",
    language: "en",
    listPrice: {
      amount: 100,
      currencyCode: "EUR",
      isOnSale: false,
    },
    reviews: [],
  });

  useEffect(() => {
    if (bookAdd) {
      setMsg("Book added successfully.");
      setTimeout(() => setBookAdd(false), 3000);
    }
  }, [bookAdd]);

  function handleChange(event) {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));

    setBookAdd(true);
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBook((prevBook) => ({
        ...prevBook,
        thumbnail: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updatedBooks = [
      ...(storageService.loadFromStorage("bookDB") || []),
      book,
    ];
    storageService.saveToStorage("bookDB", updatedBooks);
    setBookAdd(true);
  }

  function goBack() {
    navigate("/book");
  }

  return (
    <section className="add-book-form">
      {bookAdd && <UserMsg msg={msg} />}

      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          onChange={handleChange}
          value={book.title}
          name="title"
          type="text"
          required
        />
        <br></br>

        <label>Price: </label>
        <input
          onChange={handleChange}
          defaultValue={book.listPrice.amount}
          name="listPrice.amount"
          type="number"
          required
        />
        <br></br>

        <label>Image: </label>
        <input
          onChange={handleImageUpload}
          name="thumbnail"
          type="file"
          required
        />
        <br></br>

        <button type="submit">save</button>
        <button type="button" onClick={goBack}>
          Go Back
        </button>
      </form>
    </section>
  );
}
