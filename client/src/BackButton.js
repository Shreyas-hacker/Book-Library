import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function BackButton(){
    return (
        <>
            <div style={{marginTop: 20,marginLeft:20}}>
                <Link to="/">
                    <Button variant="primary">
                        Back
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default BackButton;