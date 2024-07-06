import React, { Fragment, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const EditTodo = ({ todo }) => {

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [due_date, setDueDate] = useState(todo.due_date);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // EDIT TODO FUNCTION

    const updateTodo = async (e) => {
        e.preventDefault();
        try {
            const body = { title, description, due_date };
            // eslint-disable-next-line
            const response = await fetch(`https://ayush-task-manager.onrender.com/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        setTitle(todo.title);
        setDescription(todo.description);
        setDueDate(todo.due_date);
    }, [todo]);

    return (
        <Fragment>

            <Button variant="warning" onClick={handleShow} data-bs-target={`#id${todo.todo_id}`}>
                Edit
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className='form-control'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter Title"
                    />
                    <br />
                    <input
                        type="text"
                        className='form-control'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Enter Description"
                    />
                    <br />
                    <input
                        type="date"
                        className='form-control'
                        value={due_date}
                        onChange={e => setDueDate(e.target.value)}
                        placeholder="Enter Due Date"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                    <button
                        type="button"
                        className="btn btn-warning"
                        data-bs-dismiss="modal"
                        onClick={e => updateTodo(e)}
                    >
                        Edit
                    </button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default EditTodo;