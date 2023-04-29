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

    return (
        <>
        <div className='content'>
          <div className="App">
            <div>
              <input type="text" placeholder="Search Book" onChange={event => setSearchedItem(event.target.value)}/>
            </div>
          </div>
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
                    <Book key={key} book={val}/>
                );
              })
            }
          </div>
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