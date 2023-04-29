import '../App.css';
import { useState } from 'react';
import bookList from '../bookList';
import Book from '../Books/Book';

function Home(){
    const [books, setBooks] = useState(bookList["books"]);
    const [searchedItem, setSearchedItem] = useState("");

    return (
        <>
          <div className="App">
            <div>
              <input type="text" placeholder="Search Book" onChange={event => setSearchedItem(event.target.value)}/>
            </div>
          </div>
          {/* <IconButton aria-label="add" onClick={() => {
            console.log("Add Book");
          }}>
            <AddCircleIcon />
          </IconButton>     */}
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
        </>
      );
}

export default Home;