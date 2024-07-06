const express = require("express");
const cors = require("cors");
const { poolcb } = require("./dbConfig.js");

const app = express();
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES

app.get('/', async (req, res) => {
    try {
        res.send("HOME PAGE");
    }
    catch (err) {
        console.log(err.message);
    }
})

// CREATE A TODO

app.post('/todos', async (req, res) => {
    try {
        const { title, description, due_date } = req.body; //f
        const newTodo = await poolcb.query("INSERT INTO todoDetails (title, description, due_date) VALUES($1, $2, $3) RETURNING *", [title, description, due_date]
        );
        res.json(newTodo.rows[0]);
        console.log(req.body);
    }
    catch (err) {
        console.log(err.message);
    }
}
);

// GET ALL TODO

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await poolcb.query("SELECT * FROM todoDetails");
        res.json(allTodos.rows);
        // console.log(req.body);
    }
    catch (err) {
        console.log(err.message);
    }
}
);


// GET SINGLE TODO
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await poolcb.query("SELECT * FROM todoDetails WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    }
    catch (err) {
        console.log(err.message);
    }
}
);


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
        res.json("Todo was Deleted")
    }
    catch (err) {
        console.log(err.message);
    }
});


// Server start krne ke liye 
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));