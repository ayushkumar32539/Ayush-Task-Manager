// TABULAR REPRESENTATION
// import React, { Fragment, useEffect, useState } from 'react';
// import EditTodo from './EditTodo';

// const ListTodos = () => {
//   const [todos, setTodos] = useState([]);

//   // DELETE FUNCTION
//   const deleteTodo = async (id) => {
//     try {
//       await fetch(`http://localhost:5000/todos/${id}`, {
//         method: "DELETE"
//       });
//       setTodos(todos.filter(todo => todo.todo_id !== id));
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const getTodos = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/todos");
//       const jsonData = await response.json();
//       setTodos(jsonData);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     getTodos();
//   }, []);

//   // Function to format date to yyyy-MM-dd
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   return (
//     <Fragment>
//       <table className="table mt-4 text-center">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Due Date</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {todos.map(todo => (
//             <tr key={todo.todo_id}>
//               <td>{todo.title}</td>
//               <td>{todo.description}</td>
//               <td>{formatDate(todo.due_date)}</td>
//               <td><EditTodo todo={todo} /></td>
//               <td>
//                 <button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>
//                   DELETE
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </Fragment>
//   );
// };

// export default ListTodos;

import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';
import './ListTodos.css'; // Import the CSS file

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // DELETE FUNCTION
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // Function to format date to yyyy-MM-dd
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Fragment>
      <div className="container mt-4">
        <div className="row">
          {todos.map(todo => (
            <div key={todo.todo_id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{todo.title}</h5>
                  <p className="card-text">{todo.description}</p>
                  <p className="card-text"><small className="text-muted">Due Date: {formatDate(todo.due_date)}</small></p>
                  <div className="btn-group">
                    <EditTodo todo={todo} />
                    <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ListTodos;