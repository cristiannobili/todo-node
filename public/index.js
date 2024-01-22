const template = `<li %ID" class="list-group-item">
   <span>%TODO</span>
   <button id="delete_ID" type="button" class="btn btn-danger float-end">X</button>
   <button id="success_ID" type="button" class="btn btn-success float-end">V</button>
   </li>`;

const todos = [];
const todoInput = document.getElementById("todoInput");
const insertButton = document.getElementById("insertButton");

