Certainly! Here is a README file based on the provided information for your Task Manager project.

---

# Task Manager

## Description
This Task Manager Application is built with React.js for the front end and Node.js with Express.js for the backend. It allows users to manage tasks with title, description, and due date.

## Features
- **Create**: Add new tasks with title, description, and due date.
- **Read**: View a list of all tasks with their details.
- **Update**: Edit existing tasks including title, description, and due date.
- **Delete**: Remove tasks from the list.

## Technologies Used
- **Frontend**: React.js, Bootstrap for styling
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL 

## Installation

### Prerequisites
- Node.js (version 12 or higher)
- PostgreSQL
- Git

### Steps

1. **Clone the repository**

```sh
git clone <repository-url>
cd task-manager
```

2. **Backend Setup**

   - Navigate to the `backend` directory:

     ```sh
     cd backend
     ```

   - Install the dependencies:

     ```sh
     npm install
     ```

   - Create a `.env` file in the `backend` directory with the following content:

     ```env
     DB_USER=postgres
     DB_PASSWORD=admin
     DB_HOST=localhost
     DB_PORT=5432
     DB_DATABASE=todo
     ```

   - Start the PostgreSQL server and create the database:

     ```sql
     CREATE DATABASE todo;
     ```

   - Create the required table:

     ```sql
     CREATE TABLE todoDetails (
         todo_id SERIAL PRIMARY KEY,
         title VARCHAR(255) NOT NULL,
         description TEXT,
         due_date DATE
     );
     ```

   - Start the backend server:

     ```sh
     npm start
     ```

   The backend server will start on `http://localhost:5000`.

3. **Frontend Setup**

   - Navigate to the `frontend` directory:

     ```sh
     cd ../frontend
     ```

   - Install the dependencies:

     ```sh
     npm install
     ```

   - Start the frontend development server:

     ```sh
     npm start
     ```

   The frontend server will start on `http://localhost:3000`.

## Usage

1. **Add Task**: Click the "Add Task" button, fill in the title, description, and due date, then click "Add" to create a new task.
2. **View Tasks**: The list of all tasks will be displayed on the homepage.
3. **Edit Task**: Click on the edit button next to a task, update the details, and save.
4. **Delete Task**: Click the delete button next to a task to remove it.

## Directory Structure

```
task-manager/
├── backend/
│   ├── dbConfig.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputTodo.js
│   │   │   ├── TodoList.js
│   │   │   └── TodoItem.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── package.json
├── .gitignore
├── README.md
└── package.json
```


---

