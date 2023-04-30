import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import BackButton from '../BackButton';

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
        const res = await axios.get("http://localhost:3000/api/authors");
        return res.data.filter((author) => author.name === authorName);
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
    async function addNewBook(){
        if(title === '' || authorName === '' || publisher === '' || year === 0){
            setIsValid(false);
            return;
        };
        var author = await getAuthor()
        if (author.length === 0){
            console.log('went here')
            await addAuthor();
            author = await getAuthor();
        }
        setAuthors(author);

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
        <BackButton/>
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
                    <Link to='/'>
                        <Button variant="primary" onClick={addNewBook}>
                            Add book
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
        </>
    );
}

export default AddBook;