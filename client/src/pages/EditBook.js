import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function EditBook(){
    const [book, setBook] = useState({});
    const location = useLocation();
    const searchParams = location.pathname.slice(10);

    useEffect(() => {
        getBook();
    }, []);

    async function getBook(){
        await axios.get(`http://localhost:3000/api/books/${searchParams}`).then((res) => {
            setBook({
                title: res.data.title,
                authorId: res.data.authorId,
                publisher: res.data.publisher,
                year: res.data.year
            })
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <div style={{display:'block',width: 700,padding:30}}>
            <h4>Edit Book</h4>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Book Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter book title" value={book.title}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter author of book" value={book.authorId}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control type="text" placeholder="Enter publisher" value={book.publisher}/>
                </Form.Group>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={'"year"'}
                        views={['year']}
                        defaultValue={dayjs().year(parseInt(book.year))}
                        disableFuture
                    />
                </LocalizationProvider>
                <div style={{marginTop: 20}}>
                    <Button variant="primary" type="submit">
                        Edit book
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default EditBook;