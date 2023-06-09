import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Home.css';
import Book from '../Books/Book';
import DeleteConfirmation from './DeleteConfirmation';
import {IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Home(){
  const [id, setId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [books, setBooks] = useState([]);
  const [searchedItem, setSearchedItem] = useState("");
  const [authorIds, setAuthorIds] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id,authorId,authorName) => {
    setShow(true)
    setId(id)
    setAuthorId(authorId)
    setAuthorName(authorName)
  };
  const navigate = useNavigate();

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    getAuthor();
  }, [books]);

  //get all books
  function getBooks(){
    axios.get('http://localhost:3000/api/books').then((res) => {
      setBooks(res.data);
    }).catch((err) => {
        console.log(err);
    });
  }

  //get author name
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
  }

  //delete book
  function deleteBook(id,authorId,authorName){
    console.log(id,authorId,authorName);
    let count = 0;
    for(const author of authorIds){
      if(author === authorName){
        count++;
      }
    }
    console.log(count);
    if(count === 1){
      axios.delete(`http://localhost:3000/api/authors/${authorId}`).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    }

    axios.delete(`http://localhost:3000/api/books/${id}`).then((res) => {
      const del = books.filter(book => id !== book.id);
      setBooks(del);
    }).catch((err) => {
      console.log(err);
    });
    setAuthorIds(authorIds.filter((author) => author !== authorName));
    handleClose();
  }

  
  return (
      <>
      {show && <DeleteConfirmation show={show} handleClose={handleClose} handleDelete={deleteBook} id={id} authorId={authorId} authorName={authorName}/>}
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
                      <Book key={key} book={val} deleteBook={deleteBook} authorId={authorIds[key]} handleShow={handleShow}/>
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