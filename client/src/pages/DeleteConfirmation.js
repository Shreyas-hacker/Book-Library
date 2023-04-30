import React from "react";
import { Modal,Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function DeleteConfirmation({show,handleClose,handleDelete,id,authorId,authorName}){
    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Link to="/">
                    <Button variant="primary" onClick={()=>handleDelete(id,authorId,authorName)}>Delete</Button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmation;