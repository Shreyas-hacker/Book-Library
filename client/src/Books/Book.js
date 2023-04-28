import React from "react"
import './Book.css';

function Book(){
    return(
        <div className="Card">
            <div className="CardContent">
                <p className="CardBook">Book1</p>
                <p className="CardTitle">title</p>
                <p className="CardYear">year</p>
                <p className="CardPublisher">publisher</p>
            </div>
        </div>
    )
}

export default Book;