import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BackButton from '../BackButton';

function EditBook(){
    const [book, setBook] = useState({});
    const location = useLocation();
    const searchParams = location.pathname.slice(10);
    const [title,setTitle] = useState('');
    const [authorId,setAuthorId] = useState('');
    const [authorName,setAuthorName] = useState('');
    const [publisher,setPublisher] = useState('');
    const [year,setYear] = useState(0);

    useEffect(() => {
        getBook();
    }, []);

    useEffect(() => {
        getAuthor();
    }, [book]);

    //get specific book
    async function getBook(){
        await axios.get(`http://localhost:3000/api/books/${searchParams}`).then((res) => {
            setBook({
                title: res.data.title,
                authorId: res.data.authorId,
                publisher: res.data.publisher,
                year: res.data.year
            })
            setTitle(res.data.title);
            setAuthorId(res.data.authorId);
            setPublisher(res.data.publisher);
            setYear(res.data.year);
        }).catch((err) => {
            console.log(err);
        });
    }

    //get author for book
    async function getAuthor(){
        const res = await axios.get(`http://localhost:3000/api/authors/${authorId}`);
        setAuthorName(res.data.name);
    }

    function handleTitleChange(e){
        setTitle(e.target.value);
    }
    function handleAuthorChange(e){
        setAuthorName(e.target.value);
    }
    function handlePublisherChange(e){
        setPublisher(e.target.value);
    }
    function handleYearChange(e){
        setYear(e.$y);
    }

    //handle book edit and author change
    async function handleEditBook(e){
        const newBook = {
            title: title,
            authorId: authorId,
            publisher: publisher,
            year: year
        }
        await axios.put(`http://localhost:3000/api/books/${searchParams}`, newBook).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <>
        <BackButton/>
        <div style={{display:'block',width: 700,padding:30}}>
            <h4>Edit Book</h4>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Book Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter book title" value={title} onChange={handleTitleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter author of book" value={authorName} onChange={handleAuthorChange} disabled readOnly/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control type="text" placeholder="Enter publisher" value={publisher} onChange={handlePublisherChange}/>
                </Form.Group>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={'"year"'}
                        views={['year']}
                        disableFuture
                        onChange={handleYearChange}
                    />
                </LocalizationProvider>
                <div style={{marginTop: 20}}>
                    <Link to='/'>
                        <Button variant="primary" onClick={handleEditBook}>
                            Edit book
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
        </>
    );
}

export default EditBook;