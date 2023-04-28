import './App.css';
import { useState } from 'react';
import BookList from './Books/BookList';
import bookList from './bookList';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function App() {
  const [books, setBooks] = useState(bookList["books"]);
  const [searchedItem, setSearchedItem] = useState("");

  function searchBook(e) {
    setSearchedItem(e.target.value);
  }

  return (
    <div className="App">
      <div>
        <input type="text" value={searchedItem} placeholder="Search Book" onChange={searchBook}/>
      </div>
      <IconButton aria-label="add" onClick={() => {
        console.log("Add Book");
      }}>
        <AddCircleIcon />
      </IconButton>
      <BookList Books={books}/>      
    </div>
  );
}

export default App;
