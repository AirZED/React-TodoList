import React, { useReducer } from "react";
import TodoContext from "./todo-context";

const DUMMY_TODOS = [
  {
    todo: "I Want to Sweep",
    id: "m1",
    active: true,
    deleted: false,
  },
  {
    todo: "I want to Leave the house for my Brother",
    id: "m2",
    active: true,
    deleted: false,
  },
  {
    todo: "I want to Leave the house for my Brother",
    id: "m2",
    active: false,
    deleted: true,
  },
];

const initialState = {
  items: DUMMY_TODOS,
};

const TodoReducer = (state, action) => {
  if (action.type === "ADD-TODO") {
    return {
      items: [...state.items, action.val],
    };
  }
  return initialState;
};

const TodosContextProvider = (props) => {
  const [todoState, todoDispatchFn] = useReducer(TodoReducer, initialState);

  const addTodoHandler = (todo) => {
    todoDispatchFn({ type: "ADD-TODO", val: todo });
  };

  const todoContextValues = {
    items: todoState.items,
    addTodo: addTodoHandler,
    removeTodo: (id) => {},
    markTodoAsDone: (id) => {},
  };

  return (
    <TodoContext.Provider value={todoContextValues}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodosContextProvider;
