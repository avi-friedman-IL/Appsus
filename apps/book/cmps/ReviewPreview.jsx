import { StarRating } from "./StarRating.jsx"

export function ReviewPreview({ review, onRemoveReview }) {

    return (
        <div className="review-details">
            <h4>{review.fullName}</h4>
            <button className="btn-remove-review" onClick={() => onRemoveReview(review.id)}>remove</button>
            <h5 className="gray">{review.date}</h5>
            <h4><StarRating rating={review.rating} /></h4>
            <p>{review.txt}</p>
        </div>
    )
}