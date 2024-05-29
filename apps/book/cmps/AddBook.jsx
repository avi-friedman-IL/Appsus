const { useState, useEffect } = React;
const { useNavigate } = ReactRouterDOM;

import { utilService } from "../../../services/util.service.js";
import { UserMsg } from "../../../cmps/UserMsg.jsx";

export function AddBook() {
  const [bookAdd, setBookAdd] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const [book, setBook] = useState({
    id: "",
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
      setMsg("Book added successfully. click on 'go back' button");
      setTimeout(() => setBookAdd(false), 3000);
    }
  }, [bookAdd]);

  function handleChange(ev) {
    const { name, value } = ev.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));

    setBookAdd(true);
  }

  function handleImageUpload(ev) {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBook((prevBook) => ({
        ...prevBook,
        thumbnail: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const updatedBooks = [
      ...(utilService.loadFromStorage("bookDB") || []),
      book,
    ];
    utilService.saveToStorage("bookDB", updatedBooks);
  }

  function handleToggleBookAdd() {
    setBookAdd((prevBookAdd) => !prevBookAdd);
  }

  function goBack() {
    navigate("/book");
  }

  return (
    <section className="add-book-form">
      {bookAdd && <UserMsg />}

      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          onChange={(ev) => handleChange(ev)}
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
        <input onChange={handleImageUpload} name="thumbnail" type="file" />
        <br></br>

        <button type="submit" onClick={handleToggleBookAdd}>
          save
        </button>
        <button type="button" onClick={goBack}>
          Go Back
        </button>
      </form>
    </section>
  );
}
