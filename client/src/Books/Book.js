import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './Book.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";

function Book({book,authorId,handleShow}){
    return(
        <div className="Card">
            <div className="CardContent">
                <p className="CardTitle">Title: {book.title}</p>
                <Link to={`/author/${book.authorId}`}>
                    <p className="CardTitle">Author: {authorId}</p>
                </Link>
                <p className="CardYear">Year published:{book.year}</p>
                <p className="CardPublisher">Published by: {book.publisher}</p>
                <div className="buttonContainer">
                    <Link to={`/editBook/${book.id}`}>
                        <Button>
                            <EditIcon/>
                        </Button>
                    </Link>
                    <Button onClick={()=>handleShow(book.id,book.authorId,authorId)}>
                        <DeleteIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Book;