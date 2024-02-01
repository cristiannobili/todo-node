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
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(todo)
      }).then((response) => response.json())
      .then((json) => {
         resolve(json);
      })
   })
}

const completeTodo = (todo) => {
   return new Promise((resolve, reject) => {
      fetch("/todo/complete", {
         method: 'PUT',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(todo)
      })
      .then((response) => response.json())
      .then((json) => {
         resolve(json);
      })
   })
}

const load = () => {
   return new Promise((resolve, reject) => {
      fetch("/todo")
      .then((response) => response.json())
      .then((json) => {
         resolve(json);
      })
   })
}

const deleteTodo = (id) => {
   return new Promise((resolve, reject) => {
      fetch("/todo/"+id, {
         method: 'DELETE',
         headers: {
            "Content-Type": "application/json"
         },
      })
      .then((response) => response.json())
      .then((json) => {
         resolve(json);
      })
   })
}

insertButton.onclick = () => {
   const todo = {          
      name: todoInput.value,
      completed: false
   }   
   todos.push(todo);
   render();   
   send({todo: todo})
   .then(() => load())
   .then((json) => {
      todos = json.todos;
      todoInput.value = "";
      render();
   });
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
               deleteTodo(id)
               .then(
                  () => load()
               ).then((json) => {
                  todos = json.todos;
                  render();
               });                                             
            } 
            if (button.id.indexOf("success_") != -1) {
               const id = button.id.replace("success_", "");
               const todo = todos.filter((element) => element.id === id)[0];
               completeTodo(todo)
               .then(
                  () => load()
               ).then((json) => {
                  todos = json.todos;
                  render();
               }); 
            }
            render();
         }
   })
}

const refresh = () => {
   load().then((json) => {
      todos = json.todos;
      render();
   });
}

refresh();
setInterval(refresh, 30000);




