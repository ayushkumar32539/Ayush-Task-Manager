CREATE DATABASE todo;

select * from todoDetails;

CREATE TABLE todoDetails(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(1000),
    description VARCHAR (2000),
    due_date DATE
);