const { useState } = React

export function LongText({ txt }) {
    const [isReadMore, setIsReadMore] = useState(false)

    function toggleIsReadMore() {
        setIsReadMore(readMore => !readMore)
    }

    return <p>{isReadMore ? txt : txt.substring(0, 100)}
        <span className="long-text" onClick={toggleIsReadMore}>{isReadMore ? 'Read less' : 'Read more'}</span>
    </p>
}