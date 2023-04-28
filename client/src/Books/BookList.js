import Book from "./Book";
import './BookList.css'


function BookList(){
    return (
        <div class="grid">
            <Book/>
            <Book/>
            <Book/>
            <Book/>
            <Book/>
        </div>
    )
}

export default BookList;