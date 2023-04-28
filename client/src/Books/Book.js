import React from "react"
import './Book.css';

function Book({book}){
    return(
        <div className="Card">
            <div className="CardContent">
                <p className="CardTitle">{book.title}</p>
                <p className="CardTitle">{book.subtitle}</p>
                <p className="CardYear">Year: {book.published.slice(0,4)}</p>
                <p className="CardPublisher">Published by: {book.publisher}</p>
            </div>
        </div>
    )
}

export default Book;