export function NumInputRating({ rating, handleChange }) {

    function onSetRating(rate) {
        const target = { name: 'rating', value: +rate }
        handleChange({ target })
    }

    return (
        <input name="rating"
            onChange={(ev) => onSetRating(ev.target.value)}
            type="number"
            value={rating}
        />
    )
}