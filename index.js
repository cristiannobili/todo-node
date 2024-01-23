const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

const todos = [];

app.use("/", express.static(path.join(__dirname, "public")));

app.post("/todo/add", (req, res) => {
   const data = req.body;
   console.log(data);
   const todo = req.body.todo;
   todo.id = "" + new Date().getTime();;
   todos.push(todo);
   res.json({result: "Ok"});
});

app.get("/todo", (req, res) => {
   res.json({todos: todos});
});

const server = http.createServer(app);
server.listen(80, () => {
  console.log("- server running");
});

