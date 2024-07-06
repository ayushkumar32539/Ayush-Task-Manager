import React, { Fragment, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const InputTodo = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { title, description, due_date };
      // eslint-disable-next-line
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className='text-center mt-5'>TASK MANAGER</h1>

      <Button variant="info" onClick={handleShow}>
        Add Task
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter your task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmitForm}>

            <input type="text" className='form-control' value={title} placeholder="Enter Title" onChange={e => setTitle(e.target.value)} />
            <br />

            <input type="text" className='form-control' value={description} placeholder="Enter Description" onChange={e => setDescription(e.target.value)} />
            <br />

            <input type="date" className='form-control' value={due_date} placeholder="Enter Due Date" onChange={e => setDueDate(e.target.value)} />
            <br />

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <button className='btn btn-success'>Add</button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default InputTodo;