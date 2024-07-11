import { PreviewReview } from "./PreviewReview.jsx";

export function ReviewList({ reviews, onRemoveReview }) {
    return <ul className="reviews">
        {reviews.map(review =>
            <li key={review.id}>
                <PreviewReview review={review} onRemoveReview={onRemoveReview} />
            </li>
        )}
    </ul>
}