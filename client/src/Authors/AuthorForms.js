import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation,Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import BackButton from '../BackButton';

function AuthorForm(){
    const [author, setAuthor] = useState({});
    const [authorName, setAuthorName] = useState('');
    const [authorBiography, setAuthorBiography] = useState('');
    const location = useLocation();
    const searchParams = location.pathname.slice(8);

    useEffect(() => {
        getAuthor();
    }, []);

    async function getAuthor(){
        await axios.get(`http://localhost:3000/api/authors/${searchParams}`).then((res) => {
            setAuthor({
                name: res.data.name,
                biography: res.data.biography
            })
            setAuthorName(res.data.name);
            setAuthorBiography(res.data.biography);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleAuthorNameChange(e){
        setAuthorName(e.target.value);
    }
    function handleAuthorBiographyChange(e){
        setAuthorBiography(e.target.value);
    }

    function editAuthor(){
        console.log('clicked');
        axios.put(`http://localhost:3000/api/authors/${searchParams}`,{
            name: authorName,
            biography: authorBiography
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
    return(
        <>
        <BackButton/>
        <div style={{display:'block',width: 700,padding:30}}>
            <h4>Author Details</h4>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label >Author Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter author name" onChange={handleAuthorNameChange} value={authorName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Biography</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter biography of author" value={authorBiography} onChange={handleAuthorBiographyChange}/>
                </Form.Group>
                <div style={{marginTop: 20}}>
                    <Link to='/'>
                        <Button variant="primary" onClick={editAuthor}>
                            Edit Author
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
        </>
    )
}

export default AuthorForm;