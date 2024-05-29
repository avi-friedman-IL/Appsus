import { LongTxt } from "./LongTxt.jsx"

export function BookPreview({book}){
   return ( 
        <article key={book.id}>
            <h3>{book.title}</h3>
            <h4>{book.subtitle}</h4>
            <img src={book.thumbnail} alt=""></img>
            <LongTxt txt={book.description} />
            <br></br>
            <span>{`${book.listPrice.amount} ${book.listPrice.currencyCode}`}</span>
        </article>
)}
