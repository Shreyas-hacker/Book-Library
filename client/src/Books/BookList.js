import Book from "./Book";
import './BookList.css'


function BookList({Books}){
    return (
        <div class="grid">
            {Books.map((book) => (
                <Book key={book.isbn} book={book} />
            ))}
        </div>
    )
}

export default BookList;