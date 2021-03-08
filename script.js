class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }
  clearLS () {
    localStorage.clear();
  }
  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false,
    };
    this.todos.push(todo);
    this.onTodoListChanged(this.todos);
    this._commit(this.todos);
    // console.log(todos)
    // debugger;
  }
  editTodo(id, updatedText) {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? { id: todo.id, text: updatedText, complete: todo.complete }
        : todo
    );
    this.onTodoListChanged(this.todos);
    this._commit(this.todos);
  }
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.onTodoListChanged(this.todos);
    this._commit(this.todos);
  }
  toggleTodo(id) {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? { id: todo.id, text: todo.text, complete: !todo.complete }
        : todo
    );
    this.onTodoListChanged(this.todos);
    this._commit(this.todos);
  }
  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }
  _commit(todos) {
    this.onTodoListChanged(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

class View {
  constructor() {
    // The Root Element
    this.app = this.getElement("#root");

    // The Title of the app
    this.title = this.createElement("h1");
    this.title.textContent = "Todo List - Using the MVC Design Pattern";

    // The form, with a [type="text"] input, and a submit button
    this.form = this.createElement("form");

    this.input = this.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Add ToDo";
    this.input.name = "todo";

    this.submitButton = this.createElement("button");
    this.submitButton.textContent = "Submit";

    // The Visual representation of the to do list app
    this.todoList = this.createElement("ul", "todo-list");

    // Append the input and submit button to the form
    this.form.append(this.input, this.submitButton);

    // Append the title, form, and todo list to the app
    this.app.append(this.title, this.form, this.todoList);
    
  }
  get _todoText() {
    return this.input.value;
  }
  _resetInput() {
    this.input.value = "";
  }
  createElement(tag, className) {
    // Create the HTML Element for the app based on what is passed in in the view code below
    const element = document.createElement(tag);

    // If the createElement params, include a className, then add that to the element
    if (className) element.classList.add(className);

    return element;
  }
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }
  displayTodos(todos) {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }
    if (todos.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do! Why not add a new task?";
      this.todoList.append(p);
    } else {
      todos.forEach((todo) => {
        const li = this.createElement("li");
        li.id = todo.id;
        const checkbox = this.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;

        const span = this.createElement("span");
        span.contentEditable = true;
        span.classList.add("editable");

        // If the TODO is complete, it will have a strikethrough
        if (todo.complete) {
          const strike = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);
          
          // Added this in, but it does not offer much forgiveness the apps UI:
          // checkbox.style.display = 'none';
        } else {
          // Otherwise just display the text
          span.textContent = todo.text;
        }
        const deleteButton = this.createElement("button", "delete");
        deleteButton.textContent = "Remove";
        li.append(checkbox, span, deleteButton);
        // Append Nodes to the to do list
        this.todoList.append(li);
      });
    }
    console.log(todos);
  };
  bindAddTodo(handler) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      if (this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }
  bindDeleteTodo(handler) {
    this.todoList.addEventListener("click", (event) => {
      if (event.target.className === "delete") {
        const id = parseInt(event.target.parentElement.id);

        handler(id);
      }
    });
  }
  bindToggleTodo(handler) {
    this.todoList.addEventListener("change", (event) => {
      if (event.target.type === "checkbox") {
        const id = parseInt(event.target.parentElement.id);

        handler(id);
      }
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    
    // Start the Application Functions
    this.model.bindTodoListChanged(this.onTodoListChanged);
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);
    this.model.bindTodoListChanged(this.onTodoListChanged);
    
    // Update Todos
    this.onTodoListChanged(this.model.todos);

    // Clear LocalStorage - For Testing Purposes
    // this.model.clearLS();
  }
  onTodoListChanged = (todos) => {
    this.view.displayTodos(todos);
  };
  handleAddTodo = (todoText) => {
    this.model.addTodo(todoText);
    console.log(todoText)
    // debugger;
  };
  handleEditToDo = (id, todoText) => {
    this.model.editTodo(id, todoText);
  };
  handleDeleteTodo = (id) => {
    this.model.deleteTodo(id);
  };
  handleToggleTodo = (id) => {
    this.model.toggleTodo(id);
  };
}



const app = new Controller(new Model(), new View());
