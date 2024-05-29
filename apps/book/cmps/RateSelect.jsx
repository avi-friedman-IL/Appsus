const { useState, useEffect } = React

import { StarRating } from "./StarRating.jsx";

function RateBySelect({ val, selected }){
    const [rating, setRating] = useState(val || '');
    
    function handleChange(event){
        const newRating = event.target.value;
        setRating(newRating);
        selected(newRating);
    };

    return (
        <select value={rating} onChange={handleChange}>
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    );
};

function RateByTextbox ({ val, selected }){
    const [rating, setRating] = useState(val || '');

    const handleChange = (event) => {
        const newRating = event.target.value;
        setRating(newRating);
        selected(newRating);
    };

    return (
        <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={handleChange}
        />
    );
};


// function RateByStars({ val, selected }){
//     const [rating, setRating] = useState(val || '');

//     const handleClick = (newRating) => {
//         setRating(newRating);
//         selected(newRating);
//     };

//     return (
//         <div>
//             {[1, 2, 3, 4, 5].map((star) => (
//                 <span
//                     key={star}
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => handleClick(star)}
//                 >
//                     {star <= rating ? '★' : '☆'}
//                 </span>
//             ))}
//         </div>
//     );
// };

export function RateSelect({initialRating}){
    const [selectedRatingType, setSelectedRatingType] = useState('select');
    const [rating, setRating] = useState(initialRating || '');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return (
        <section>
            <h3>Select your preferred rating method:</h3>
            <div>
                <input
                    type="radio"
                    id="select"
                    value="select"
                    checked={selectedRatingType === 'select'}
                    onChange={() => setSelectedRatingType('select')}
                />
                <label htmlFor="select">Select</label>

                <input
                    type="radio"
                    id="textbox"
                    value="textbox"
                    checked={selectedRatingType === 'textbox'}
                    onChange={() => setSelectedRatingType('textbox')}
                />
                <label htmlFor="textbox">Textbox</label>

                <input
                    type="radio"
                    id="stars"
                    value="stars"
                    checked={selectedRatingType === 'stars'}
                    onChange={() => setSelectedRatingType('stars')}
                />
                <label htmlFor="stars">Stars</label>
            </div>

            {selectedRatingType === 'select' && (
                <RateBySelect val={rating} selected={handleRatingChange} />
            )}
            {selectedRatingType === 'textbox' && (
                <RateByTextbox val={rating} selected={handleRatingChange} />
            )}
            {selectedRatingType === 'stars' && (
                <StarRating rating={rating} val={rating} selected={handleRatingChange} />
            )}
        </section>
    );
};
