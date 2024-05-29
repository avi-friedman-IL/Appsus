const { useState, useEffect, useRef } = React

// import { StarRating } from '../cmps/StarRating.jsx'
import { RateSelect } from "./RateSelect.jsx"

export function ReviewAdd({ onSaveReview, onToggleReviewModal }) {
    const inputRef = useRef()

    const [review, setReview] = useState({
        fullName: 'Anonymous',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
    })

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function onAddReview(ev) {
        ev.preventDefault()
        onSaveReview(review)
        onToggleReviewModal()
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    const { fullName, date, txt, rating } = review

    return (
        <section className='review-add'>
            <div className='review-modal'>
                <h1>Add review</h1>
                <button className='btn-toggle-modal' onClick={onToggleReviewModal}>X</button>

                <form onSubmit={onAddReview} className='review-form'>
                    <label htmlFor='fullname'>Full name:</label>
                    <input
                        autoFocus
                        ref={inputRef}
                        placeholder='Enter full name'
                        name='fullName'
                        type='text'
                        id='fullname'
                        value={fullName}
                        onChange={handleChange}
                        autoComplete='off'
                    />

                    {/* <StarRating handleChange={handleChange} rating={rating} /> */}
                    <RateSelect rating={rating}/>
                    <label htmlFor='date'>Date:</label>
                    <input
                        type='date'
                        id='date'
                        name='date'
                        value={date}
                        onChange={handleChange}
                    />

                    <textarea
                        name='txt'
                        cols='30'
                        rows='10'
                        value={txt}
                        onChange={handleChange}
                    ></textarea>

                    <button>Upload review</button>
                </form>
            </div>
        </section>
    )
}















// const {useState} = React

// export function AddReview(){
//     const [review, setReview] = useState({
//         fullName:'',
//         rating:'',
//         readAt:'',
//         txt: '',
//     })

//     function handleChange(event){
//         const {name,value} = event.target
//         setReview(prevReview => ({
//             ...prevReview,
//             [name]: value,
//         }))
//         console.log(review)
//     }

//     function handleSubmit(event) {
//         event.preventDefault();
//         console.log('Review submitted:', review);
//     }

//     function goBack(){
//         navigate('/book')
//     }
   
//     return (
//         <section className="review-list">
//             <form onSubmit={handleSubmit}>
//             <div className="review-card">
//                 <label>Name: </label>
//                 <input value={review.fullName} type="text" name="fullName" placeholder="enter full name" onChange={handleChange}></input>
//                 <br></br>
//                 <label>Rating: </label>
//                 <select name="rating" value={review.rating} onChange={handleChange}>
//                     <option value="">Select</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                 </select>
//                 <br></br>
//                 <label>Readt At: </label>
//                 <input type="number" name="readAt" placeholder="enter year" value={review.readAt} onChange={handleChange}></input>
//                 <br></br>
//             </div>

//         <button>Upload Review</button>
//         <button onClick={goBack} className="close-btn">Go Back</button>
//         </form>
//         </section>
//     )
// }