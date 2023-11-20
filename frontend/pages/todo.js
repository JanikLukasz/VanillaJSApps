function renderPage() {
  const pageContainer = document.createElement("div");
  pageContainer.className = "todo-app";

  // content top
  const pageContentTop = document.createElement("div");
  pageContentTop.className = "content-top";
  pageContentTop.innerHTML = `  
     <h2>Todo list</h2>
   `;
  searchTodoForm = document.createElement("form");
  searchTodoForm.setAttribute("id", "search-todos");
  const searchTodoInput = document.createElement("input");
  searchTodoInput.setAttribute("type", "text");
  searchTodoInput.setAttribute("placeholder", "Search todos...");
  searchTodoForm.appendChild(searchTodoInput);
  pageContentTop.appendChild(searchTodoForm);

  // content middle
  const pageContentMiddle = document.createElement("div");
  pageContentMiddle.className = "content-middle";
  pageContentMiddle.innerHTML = `  
      <div>
      <p>Todo</p>
      <p>Priority</p>
      <p></p>
      </div>
    `;
  const todoList = document.createElement("ul");
  todoList.setAttribute("id", "todo-list");
  pageContentMiddle.appendChild(todoList);

  // content bottom
  const pageContentBottom = document.createElement("div");
  pageContentBottom.className = "content-bottom";
  const addTodoForm = document.createElement("form");
  addTodoForm.setAttribute("id", "add-todo");
  addTodoForm.innerHTML = `
       <form id="add-todo" name="add-todo">
       <input type="text" placeholder="Add a todo..." />
       <select id="todo-priority">
       <option value="High">High priority</option>
       <option value="Middle" selected>Middle priority</option>
       <option value="Low">Low priority</option>
       </select>
       <button class="add-todo">Add todo</button>
       </form>
    `;
  pageContentBottom.appendChild(addTodoForm);

  pageContainer.appendChild(pageContentTop);
  pageContainer.appendChild(pageContentMiddle);
  pageContainer.appendChild(pageContentBottom);

  // Load todos from local storage
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  if (storedTodos.length > 0) {
    storedTodos.forEach((todoElement) => {
      const todoContent = document.createElement("p");
      todoContent.textContent = todoElement.content;
      todoContent.className = "todo-content";

      const priorityTodo = document.createElement("p");
      priorityTodo.textContent = todoElement.priority;
      priorityTodo.className = "todo-priority";

      const deleteTodo = document.createElement("p");
      deleteTodo.textContent = todoElement.delete;
      deleteTodo.className = "todo-delete";

      const todo = document.createElement("li");
      todo.appendChild(todoContent);
      todo.appendChild(priorityTodo);
      todo.appendChild(deleteTodo);
      todoList.appendChild(todo);
    });
  }

  // add todos
  addTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newTodo = addTodoForm.querySelector("input[type='text']").value;
    const newTodoPriority = addTodoForm.querySelector(
      "#todo-priority option:checked"
    ).value;

    const todoContent = document.createElement("p");
    todoContent.textContent = newTodo;
    todoContent.className = "todo-content";

    const priorityTodo = document.createElement("p");
    priorityTodo.textContent = newTodoPriority.toLowerCase();
    priorityTodo.className = "todo-priority";

    const deleteTodo = document.createElement("p");
    deleteTodo.textContent = "Delete";
    deleteTodo.className = "todo-delete";

    // create todo Object to be saved in local storage
    const todoObject = {
      content: todoContent.textContent,
      priority: priorityTodo.textContent,
      delete: deleteTodo.textContent,
    };

    // save todos in local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todoObject);
    localStorage.setItem("todos", JSON.stringify(todos));

    const todo = document.createElement("li");

    todo.appendChild(todoContent);
    todo.appendChild(priorityTodo);
    todo.appendChild(deleteTodo);
    todoList.appendChild(todo);

    addTodoForm.querySelector("input[type='text']").value = "";
  });

  // delete todo 
  todoList.addEventListener("click", (e) => {
    if (e.target.className == "todo-delete") {
      const todo = e.target.parentElement;
      todoList.removeChild(todo);

      // update local storage
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const deletedTodo = todos.find(
        (item) =>
          item.content === todo.querySelector(".todo-content").textContent
      );
      if (deletedTodo) {
        const index = todos.indexOf(deletedTodo);
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    }
  });

  // search todo - filter todos
  searchTodoForm.addEventListener("keyup", (e) => {
    const searchTodoInput = e.target.value.toLowerCase();
    const todos = todoList.getElementsByTagName("li");
    Array.from(todos).forEach((todo) => {
      const contentTodo = todo.firstElementChild.textContent;
      if (contentTodo.toLowerCase().indexOf(searchTodoInput) != -1) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    });
  });

  return pageContainer;
}
