const express = require("express");
const cors = require("cors");
const { poolcb } = require("./dbConfig.js");

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES

app.get('/', async (req, res) => {
    try {
        res.send("HOME PAGE");
    } catch (err) {
        console.log(err.message);
    }
});

// Database connection test route
app.get('/test-db', async (req, res) => {
    try {
        const result = await poolcb.query("SELECT NOW()");
        res.json(result.rows);
    } catch (err) {
        console.log("Database connection error:", err.message);
        res.status(500).send(err.message);
    }
});

// CREATE A TODO
app.post('/todos', async (req, res) => {
    try {
        console.log("POST /todos called");
        const { title, description, due_date } = req.body;
        console.log("Request body:", req.body);

        const newTodo = await poolcb.query(
            "INSERT INTO todoDetails (title, description, due_date) VALUES($1, $2, $3) RETURNING *",
            [title, description, due_date]
        );
        res.json(newTodo.rows[0]);
        console.log("New Todo:", newTodo.rows[0]);
    } catch (err) {
        console.log("Error in POST /todos:", err.message);
        res.status(500).send(err.message);
    }
});

// GET ALL TODO
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await poolcb.query("SELECT * FROM todoDetails");
        res.json(allTodos.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// GET SINGLE TODO
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await poolcb.query("SELECT * FROM todoDetails WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, due_date } = req.body;

        const updateTodo = await poolcb.query(
            "UPDATE todoDetails SET title = $1, description = $2, due_date = $3 WHERE todo_id = $4",
            [title, description, due_date, id]
        );

        res.json("Todo was Updated");
    } catch (err) {
        console.error(err.message);
    }
});

// DELETE A TODO
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await poolcb.query("DELETE FROM todoDetails WHERE todo_id = $1", [id]);
        res.json("Todo was Deleted");
    } catch (err) {
        console.log(err.message);
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
