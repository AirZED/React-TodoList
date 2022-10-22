import React from "react";

const TodoContext = React.createContext({
  items: [],
  addTodo: (item) => {},
  removeTodo: (id) => {},
  markTodoAsDone: (id) => {},
  replaceTodo: (todos) => {},
  markTodoAsDeleted: (id) => {},
  restoreTodo: (id) => {},
  clearAllTodos: () => {},
});

export default TodoContext;
