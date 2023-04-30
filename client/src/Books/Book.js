import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './Book.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";

function Book({book,authorId,deleteBook}){
    return(
        <div className="Card">
            <div className="CardContent">
                <p className="CardTitle">{book.title}</p>
                <p className="CardTitle">{authorId}</p>
                <p className="CardYear">{book.year}</p>
                <p className="CardPublisher">Published by: {book.publisher}</p>
                <div className="buttonContainer">
                    <Button>
                        <Link to={`/editBook/${book.id}`}><EditIcon/></Link>
                    </Button>
                    <Button onClick={()=>{deleteBook(book.id,book.authorId,authorId)}}>
                        <DeleteIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Book;