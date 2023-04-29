import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control type="text" placeholder="Enter publisher" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="date" placeholder="Enter year book was published" />
                    <Form.Text className="text-muted">
                        The year must be in YYYY format.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Book
                </Button>
            </Form>
        </div>
    );
}

export default AddBook;