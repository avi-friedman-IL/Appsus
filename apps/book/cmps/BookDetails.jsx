const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouterDOM;

import { bookService } from "../../../apps/book/services/book.service.js";
import { Loader } from "../../../apps/book/cmps/Loader.jsx";
import { ReviewAdd } from "../../../apps/book/cmps/ReviewAdd.jsx";
import { ReviewList } from "../../../apps/book/cmps/ReviewList.jsx";

export function BookDetails() {
  const [book, setBook] = useState(null);
  const [isShowReviewModal, setIsShowReviewModal] = useState(null);

  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadBook();
  }, [bookId]);

  function loadBook() {
    bookService.getBookById(bookId).then((book) => setBook(book));
  }

  if (!book) return <Loader />;

  const {
    thumbnail,
    title,
    subtitle,
    pageCount,
    publishedDate,
    description,
    authors,
    categories,
    language,
    reviews,
  } = book;

  const { currencyCode, amount, isOnSale } = book.listPrice;

  function pageCountTxt() {
    if (book) {
      if (pageCount > 500) return "Serious Reading";
      else if (pageCount > 200) return "Descent Reading";
      else return "Light Reading";
    }
  }

  function publishedDateTxt() {
    if (book) {
      const currYear = new Date().getFullYear();
      const yearsPast = currYear - publishedDate;
      if (yearsPast > 10) return "Vintage";
      else if (yearsPast === 1) return "New";
    }
  }

  function onSaleSign() {
    if (book) {
      if (isOnSale) return "ON SALE";
      else return "OnSale";
    }
  }

  function goBack() {
    navigate("/book");
  }

  function onSaveReview(reviewToAdd) {
    bookService
      .saveReview(book.id, reviewToAdd)
      .then((review) => {
        const reviews = [review, ...book.reviews];
        setBook({ ...book, reviews });
      })
      .catch(() => {
        showErrorMsg(`Review to ${book.title} Failed!`, bookId);
      });
  }

  function onRemoveReview(reviewId) {
    bookService.removeReview(book.id, reviewId).then(() => {
      const filteredReviews = book.reviews.filter(
        (review) => review.id !== reviewId
      );
      setBook({ ...book, reviews: filteredReviews });
    });
  }

  function onToggleReviewModal() {
    setIsShowReviewModal((prevIsShowReviewModal) => !prevIsShowReviewModal);
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <section className="book-details">
      <hr></hr>
      <button onClick={goBack} className="close-btn">
        x
      </button>
      <h2 className="sale">{onSaleSign()}</h2>

      <h3>{capitalize(title)}</h3>
      <h4>{capitalize(subtitle)}</h4>

      <img src={thumbnail} alt="" />

      <p>{categories}</p>
      <p>{authors}</p>

      <p
        className={`price ${amount > 150 ? "red" : ""} ${
          amount < 20 ? "green" : ""
        }`}
      >
        {`${amount} ${currencyCode}`}{" "}
      </p>
      <p>{`Language: ${language}`}</p>

      <span>{`Published: ${publishedDate}, `}</span>
      <span>{publishedDateTxt()}</span>

      <p>{description}</p>

      <span>{`Pages: ${pageCount}, `}</span>
      <span>{pageCountTxt()}</span>
      <br></br>

      <button onClick={onToggleReviewModal}>Add review</button>

      {isShowReviewModal && (
        <ReviewAdd
          onToggleReviewModal={onToggleReviewModal}
          onSaveReview={onSaveReview}
        />
      )}

      <div className="review-container">
        <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
      </div>

      <hr></hr>
    </section>
  );
}
