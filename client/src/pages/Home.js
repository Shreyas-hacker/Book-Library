import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';
import bookList from '../bookList';
import Book from '../Books/Book';
import {IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Home(){
    const [books, setBooks] = useState(bookList["books"]);
    const [searchedItem, setSearchedItem] = useState("");
    const navigate = useNavigate();

    function deleteBook(isbn){
      setBooks(books.filter((val) => {
        return val.isbn !== isbn;
      }));
    }
    return (
        <>
        <div className='content'>
          <h1>Book List</h1>
          <div className="App">
            <div>
              <input type="text" placeholder="Search Book" onChange={event => setSearchedItem(event.target.value)}/>
            </div>
          </div>
          {
            books.length===0 ? (
              <h1>No Books! Please add one</h1>
            ):(
              <div className='grid'>
                {
                  books.filter((val) => {
                    if(searchedItem === "") {
                      return val;
                    } else if (val.title.toLowerCase().includes(searchedItem.toLowerCase())) {
                      return val;
                    }
                  }).map((val, key) => {
                    return (
                        <Book key={key} book={val} deleteBook={deleteBook}/>
                    );
                  })
                }
              </div>
            )}
          <div className='add-button'>
            <IconButton size='large' variant='contained' onClick={() => {
              navigate("/addBook");
            }} style={{
              position: 'fixed',
              bottom: "20px",
              right: "20px",
              zIndex: 9999
              }}>
                <AddCircleIcon style={{fontSize: "50px"}}/> 
              </IconButton>
          </div>
        </div>
        </>
      );
}

export default Home;