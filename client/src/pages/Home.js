import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Home.css';
import Book from '../Books/Book';
import {IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Home(){
  var bookAuthor = []
  const [books, setBooks] = useState([]);
  const [searchedItem, setSearchedItem] = useState("");
  const [authorIds, setAuthorIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    getAuthor();
  }, [books]);

  function getBooks(){
    axios.get('http://localhost:3000/api/books').then((res) => {
      setBooks(res.data);
    }).catch((err) => {
        console.log(err);
    });
  }

  async function getAuthor(){
    const promises = books.map((book) => {
      return axios.get(`http://localhost:3000/api/authors/${book.authorId}`).then((res) => {
        return res.data.name;
      }).catch((err) => {
        console.log(err);
      });
    });
    const bookAuthor = await Promise.all(promises);
    setAuthorIds(bookAuthor);
    console.log(authorIds);
  }

  function deleteBook(id){
    setBooks(books.filter((val) => {
      return val.id !== id;
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
                      <Book key={key} book={val} authorId={authorIds[key]}deleteBook={deleteBook}/>
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