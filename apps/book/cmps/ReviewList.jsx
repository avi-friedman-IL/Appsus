import { ReviewPreview } from "../../../apps/book/cmps/ReviewPreview.jsx";

export function ReviewList({ reviews, onRemoveReview }) {
  return (
    <div>
      {reviews.map((review) => (
        <ReviewPreview
          key={review.id}
          review={review}
          onRemoveReview={onRemoveReview}
        />
      ))}
    </div>
  );
}
