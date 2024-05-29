
export function StarRating({ handleChange, rating }) {

    function onSetRating(rate) {
        if (!isEditable) return
        const target = { name: 'rating', value: rate };
        handleChange({ target });
    }

    const isEditable = typeof handleChange === 'function'
    const editClass = isEditable ? 'edit' : ''

    return (
        <div className={`star-rating ${editClass}`} >
            {[...Array(5)].map((_, idx) => (
                <span
                    key={idx}
                    className={`star ${idx < rating ? 'on' : 'off'}`}
                    onClick={() => onSetRating(idx + 1)}
                >
                    &#9733;
                </span>
            ))}
        </div>
    )
}