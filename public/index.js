const template = `<li class="list-group-item %BG">
   <span>%TODO</span>
   <button id="delete_ID" type="button" class="todo btn btn-danger float-end">X</button>
   <button id="success_ID" type="button" class="todo btn btn-success float-end">V</button>
   </li>`;

let todos = [];
const todoInput = document.getElementById("todoInput");
const insertButton = document.getElementById("insertButton");
const listUL = document.getElementById("listUL");

const send = (todo) => {
   return new Promise((resolve, reject) => {
      fetch("/todo/add", {
         method: 'POST',
         header: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(todo)
      }).then((response) => response.json)
      .then((json) => {
         resolve(json);
      })
   })
}

insertButton.onclick = () => {
   const todo = {      
      id: "" + new Date().getTime(),
      name: todoInput.value,
      completed: false
   }
   todos.push(todo);
   render();
   //send({todo: todo});
}

const render = () => {
   listUL.innerHTML  = todos.map((todo) => {
      let row = template.replace("delete_ID", "delete_"+todo.id);
      row = row.replace("success_ID", "success_"+todo.id);
      row = row.replace("%TODO", todo.name);      
      row = row.replace("%BG", todo.completed ? "bg-success" : "");

      return row;
   }).join("\n");   
   const buttonList = document.querySelectorAll(".todo");
   buttonList.forEach((button) => {
         button.onclick = () => {
            if (button.id.indexOf("delete_") != -1) {
               const id = button.id.replace("delete_", "");
               todos = todos.filter((todo) => todo.id !== id);
            } 
            if (button.id.indexOf("success_") != -1) {
               const id = button.id.replace("success_", "");
               todos = todos.map((todo) => {
                  if (todo.id === id) {
                     todo.completed = !todo.completed;
                  }
                  return todo;
               })
            }
            render();
         }
   })
}

render();



