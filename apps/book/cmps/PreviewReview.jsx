export function PreviewReview({ review, onRemoveReview }) {
    return <React.Fragment>
        <button id={review.id} onClick={() => onRemoveReview(review.id)}>x</button>
        <h2>{review.fullName}</h2>
        <p>{'⭐'.repeat(review.rating)}</p>
        <p>{review.date}</p>
    </React.Fragment>
}