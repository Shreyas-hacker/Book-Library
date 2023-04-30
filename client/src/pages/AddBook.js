import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AddBook(){
    return (
        <div style={{display:'block',width: 700,padding:30}}>
            <h4>Add Book</h4>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Book Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter book title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter author of book" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control type="text" placeholder="Enter publisher" />
                </Form.Group>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={'"year"'}
                        views={['year']}
                        disableFuture
                    />
                </LocalizationProvider>
                <div style={{marginTop: 20}}>
                    <Button variant="primary" type="submit">
                        Add book
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default AddBook;