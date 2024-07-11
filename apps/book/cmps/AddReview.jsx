const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

import { StarRating } from './dynamic-inputs/starRating.jsx'
import { SelectRating } from './dynamic-inputs/SelectRating.jsx'
import { NumInputRating } from './dynamic-inputs/NumInputRating.jsx'

export function AddReview() {

    const params = useParams()
    const navigate = useNavigate()

    const [cmpType, setCmpType] = useState('stars')
    const [id, setId] = useState(params.bookId)
    const [review, setReview] = useState({
        id: utilService.makeId(),
        fullName: 'name',
        rating: 1,
        date: new Date().toISOString().slice(0, 10)
    })

    function onChangeCmpType(selectedType) {
        setCmpType(selectedType)
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
        }

        setReview(prevReview => ({ ...prevReview, [prop]: value }))
    }

    function save(ev) {
        ev.preventDefault()
        bookService.saveReview(id, review)
        navigate(`/book/${id}`)
        showSuccessMsg('The review has been successfully added!')
    }

    return <section className="add-review">
        <form onSubmit={save}>
            <label htmlFor="fullName"></label>
            <input name="fullName"
                onChange={handleChange}
                id="fullName"
                type="text"
                value={review.fullName}
            />
            <label htmlFor="rating"></label>
            <input name="rating"
                onChange={handleChange}
                id="rating"
                type="range" min="0" max="5"
                value={review.rating}
            />

            <label htmlFor="date">date</label>
            <input name="date"
                onChange={handleChange}
                id="date"
                type="date"
                value={review.date}
            />

            <label htmlFor="stars">stars</label>
            <input name="rating"
                onChange={(ev) => onChangeCmpType(ev.target.value)}
                id="stars"
                type="radio"
                value="stars"
            />
            
            <label htmlFor="select">select</label>
            <input name="rating"
                onChange={(ev) => onChangeCmpType(ev.target.value)}
                id="stars"
                type="radio"
                value="select"
            />
            
            <label htmlFor="numInput">num input</label>
            <input name="rating"
                onChange={(ev) => onChangeCmpType(ev.target.value)}
                id="numInput"
                type="radio"
                value="numInput"
            />
            <DynamicCmp type={cmpType} handleChange={handleChange} rating={review.rating} />
            <button className="save-review">save</button>
        </form>
    </section>
}

function DynamicCmp(props) {
    // console.log('props:', props)
    switch (props.type) {
        case 'select':
            return <SelectRating {...props} />
        case 'numInput':
            return <NumInputRating {...props} />
        case 'stars':
            return <StarRating {...props} />

    }
}