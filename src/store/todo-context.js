import React from "react";

const TodoContext = React.createContext({
  items: [],
  addTodo: (item) => {},
  removeTodo: (id) => {},
  markTodoAsDone: (id) => {},
});

export default TodoContext;
