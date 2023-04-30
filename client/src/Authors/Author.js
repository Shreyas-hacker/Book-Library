import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Author(){
    return(
        <div style={{display:'block',width: 700,padding:30}}>
            <h4>Author Details</h4>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label >Author Name</Form.Label>
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
    )
}

export default Author;