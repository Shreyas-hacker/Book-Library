import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from 'react-bootstrap/Alert';

function AddBook(){
    const [title,setTitle] = useState('');
    const [authorName,setAuthorName] = useState('');
    const [publisher,setPublisher] = useState('');
    const [year,setYear] = useState(0);
    const [authors,setAuthors]= useState([])
    const [isValid,setIsValid] = useState(true);
    const [addBook,setAddBook] = useState(false);

    function handleTitle(event){
        setTitle(event.target.value);
    }
    function handleAuthorName(event){
        setAuthorName(event.target.value);
    }
    function handlePublisher(event){
        setPublisher(event.target.value);
    }
    function handleYear(event){
        setYear(event.$y)
    }

    async function getAuthor(){
        await axios.get("http://localhost:3000/api/authors").then((res) => {
            setAuthors(res.data.filter((author) => {
                return author.name === authorName;
            }));
        }).catch((err) => {
            console.log(err);
        });
    }

    async function addAuthor(){
        const newAuthor = {
            name: authorName
        }
        await axios.post(`http://localhost:3000/api/authors`, newAuthor).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
    function addNewBook(){
        if(title === '' || authorName === '' || publisher === '' || year === 0){
            setIsValid(false);
            return;
        };
        getAuthor();
        if (authors.length === 0){
            console.log('went here')
            addAuthor();
            getAuthor();
            console.log(authors);
        }
        const newBook = {
            title: title,
            authorId: authors[0].id,
            publisher: publisher,
            year: year
        }
        
        axios.post(`http://localhost:3000/api/books`, newBook).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
        setAddBook(true);
    }

    return (
        <>
        {isValid ? null : <Alert variant="danger" onClose={() => setIsValid(true)} dismissible>Please fill in all the fields</Alert>}
        {addBook ? <Alert variant="success" onClose={() => setAddBook(false)} dismissible>Book added successfully</Alert> : null}
        <div style={{display:'block',width: 700,padding:30}}>
            <h4>Add Book</h4>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label >Book Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter book title" onChange={handleTitle} value={title} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter author of book" onChange={handleAuthorName} value={authorName}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control type="text" placeholder="Enter publisher" onChange={handlePublisher} value={publisher}/>
                </Form.Group>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={'"year"'}
                        views={['year']}
                        disableFuture
                        onChange={handleYear}
                    />
                </LocalizationProvider>
                <div style={{marginTop: 20}}>
                    <Button variant="primary" onClick={addNewBook}>
                        Add book
                    </Button>
                </div>
            </Form>
        </div>
        </>
    );
}

export default AddBook;